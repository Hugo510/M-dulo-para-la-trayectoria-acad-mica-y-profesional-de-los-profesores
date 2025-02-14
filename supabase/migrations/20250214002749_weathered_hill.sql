/*
  # Esquema inicial para sistema de gestión de CVs

  1. Nuevas Tablas
    - `teachers`: Datos personales y credenciales de los profesores
    - `cv_archive`: Almacenamiento de CVs con rutas y metadatos
    - `education`: Información sobre formación académica
    - `experience`: Datos de experiencia laboral
    - `certifications`: Certificaciones y cursos
    - `skills`: Catálogo único de habilidades
    - `teacher_skills`: Relación muchos-a-muchos entre maestros y habilidades

  2. Seguridad
    - RLS habilitado en todas las tablas
    - Políticas para que los profesores solo puedan ver y editar sus propios datos
    - Políticas específicas para búsqueda y reportes

  3. Tipos y Enums
    - Enum para niveles de habilidad
*/

-- Crear enum para niveles de habilidad
CREATE TYPE skill_level AS ENUM ('Experto', 'Profesional', 'Usuario');

-- Tabla de profesores
CREATE TABLE teachers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_id uuid REFERENCES auth.users(id),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    address TEXT,
    date_of_birth DATE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla de archivos CV
CREATE TABLE cv_archive (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id uuid REFERENCES teachers(id) ON DELETE CASCADE,
    file_path TEXT NOT NULL,
    file_type TEXT,
    uploaded_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla de formación académica
CREATE TABLE education (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id uuid REFERENCES teachers(id) ON DELETE CASCADE,
    degree TEXT NOT NULL,
    institution TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    additional_info TEXT
);

-- Tabla de experiencia laboral
CREATE TABLE experience (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id uuid REFERENCES teachers(id) ON DELETE CASCADE,
    position TEXT NOT NULL,
    institution TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    description TEXT
);

-- Tabla de certificaciones
CREATE TABLE certifications (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id uuid REFERENCES teachers(id) ON DELETE CASCADE,
    certification_name TEXT NOT NULL,
    issuing_institution TEXT,
    issue_date DATE,
    expiration_date DATE
);

-- Tabla de habilidades
CREATE TABLE skills (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    skill_name TEXT NOT NULL UNIQUE
);

-- Tabla de relación profesor-habilidades
CREATE TABLE teacher_skills (
    teacher_id uuid REFERENCES teachers(id) ON DELETE CASCADE,
    skill_id uuid REFERENCES skills(id) ON DELETE CASCADE,
    level skill_level DEFAULT 'Usuario',
    PRIMARY KEY (teacher_id, skill_id)
);

-- Habilitar RLS en todas las tablas
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_archive ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_skills ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad para teachers
CREATE POLICY "Users can view own profile"
    ON teachers FOR SELECT
    USING (auth.uid() = auth_id);

CREATE POLICY "Users can update own profile"
    ON teachers FOR UPDATE
    USING (auth.uid() = auth_id);

-- Políticas para cv_archive
CREATE POLICY "Users can view own CVs"
    ON cv_archive FOR SELECT
    USING (teacher_id IN (
        SELECT id FROM teachers WHERE auth_id = auth.uid()
    ));

CREATE POLICY "Users can manage own CVs"
    ON cv_archive FOR ALL
    USING (teacher_id IN (
        SELECT id FROM teachers WHERE auth_id = auth.uid()
    ));

-- Políticas para education
CREATE POLICY "Users can view own education"
    ON education FOR SELECT
    USING (teacher_id IN (
        SELECT id FROM teachers WHERE auth_id = auth.uid()
    ));

CREATE POLICY "Users can manage own education"
    ON education FOR ALL
    USING (teacher_id IN (
        SELECT id FROM teachers WHERE auth_id = auth.uid()
    ));

-- Políticas para experience
CREATE POLICY "Users can view own experience"
    ON experience FOR SELECT
    USING (teacher_id IN (
        SELECT id FROM teachers WHERE auth_id = auth.uid()
    ));

CREATE POLICY "Users can manage own experience"
    ON experience FOR ALL
    USING (teacher_id IN (
        SELECT id FROM teachers WHERE auth_id = auth.uid()
    ));

-- Políticas para certifications
CREATE POLICY "Users can view own certifications"
    ON certifications FOR SELECT
    USING (teacher_id IN (
        SELECT id FROM teachers WHERE auth_id = auth.uid()
    ));

CREATE POLICY "Users can manage own certifications"
    ON certifications FOR ALL
    USING (teacher_id IN (
        SELECT id FROM teachers WHERE auth_id = auth.uid()
    ));

-- Políticas para skills
CREATE POLICY "Everyone can view skills"
    ON skills FOR SELECT
    TO authenticated
    USING (true);

-- Políticas para teacher_skills
CREATE POLICY "Users can view own skills"
    ON teacher_skills FOR SELECT
    USING (teacher_id IN (
        SELECT id FROM teachers WHERE auth_id = auth.uid()
    ));

CREATE POLICY "Users can manage own skills"
    ON teacher_skills FOR ALL
    USING (teacher_id IN (
        SELECT id FROM teachers WHERE auth_id = auth.uid()
    ));

-- Funciones de búsqueda
CREATE OR REPLACE FUNCTION search_teachers(
    search_term TEXT,
    area_filter TEXT DEFAULT NULL,
    academic_level_filter TEXT DEFAULT NULL,
    experience_years_filter TEXT DEFAULT NULL
) RETURNS TABLE (
    teacher_id uuid,
    full_name TEXT,
    email TEXT,
    skills TEXT[],
    certifications_count INTEGER,
    experience_years INTEGER
) LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    RETURN QUERY
    SELECT 
        t.id,
        t.first_name || ' ' || t.last_name as full_name,
        t.email,
        array_agg(DISTINCT s.skill_name) as skills,
        COUNT(DISTINCT c.id) as certifications_count,
        EXTRACT(YEAR FROM age(now(), min(e.start_date)))::INTEGER as experience_years
    FROM teachers t
    LEFT JOIN teacher_skills ts ON t.id = ts.teacher_id
    LEFT JOIN skills s ON ts.skill_id = s.id
    LEFT JOIN certifications c ON t.id = c.teacher_id
    LEFT JOIN education ed ON t.id = ed.teacher_id
    LEFT JOIN experience e ON t.id = e.teacher_id
    WHERE 
        (search_term IS NULL OR 
         t.first_name ILIKE '%' || search_term || '%' OR
         t.last_name ILIKE '%' || search_term || '%' OR
         s.skill_name ILIKE '%' || search_term || '%')
        AND (area_filter IS NULL OR s.skill_name = area_filter)
        AND (academic_level_filter IS NULL OR ed.degree = academic_level_filter)
        AND (experience_years_filter IS NULL OR 
             EXTRACT(YEAR FROM age(now(), e.start_date))::TEXT = experience_years_filter)
    GROUP BY t.id, t.first_name, t.last_name, t.email;
END;
$$;