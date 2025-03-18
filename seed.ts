import sequelize from "./config/db";
import bcrypt from "bcrypt";
import {
  Teacher,
  Education,
  Experience,
  Certification,
  CVArchive,
  Skill,
  TeacherSkill,
} from "./models/index";

async function seedDatabase() {
  try {
    // Esperar a que la conexión esté lista
    await sequelize.authenticate();
    console.log("Conexión establecida correctamente, comenzando seed...");

    // Limpiar datos existentes (opcional - comentar si no se desea limpiar la base)
    await TeacherSkill.destroy({ where: {} });
    await Skill.destroy({ where: {} });
    await CVArchive.destroy({ where: {} });
    await Certification.destroy({ where: {} });
    await Experience.destroy({ where: {} });
    await Education.destroy({ where: {} });
    await Teacher.destroy({ where: {} });

    console.log("Bases limpias, creando nuevos datos...");

    // 1. Crear profesores (Teachers)
    const hashedPassword = await bcrypt.hash("password123", 10);

    const teachers = await Teacher.bulkCreate([
      {
        first_name: "Juan",
        last_name: "Pérez",
        email: "juan.perez@universidad.edu",
        password: hashedPassword,
        phone: "+52 55 1234 5678",
        address: "Av. Universidad 3000, CDMX",
        date_of_birth: new Date("1980-05-15"),
      },
      {
        first_name: "María",
        last_name: "González",
        email: "maria.gonzalez@universidad.edu",
        password: hashedPassword,
        phone: "+52 55 8765 4321",
        address: "Av. Reforma 222, CDMX",
        date_of_birth: new Date("1985-11-22"),
      },
      {
        first_name: "Carlos",
        last_name: "Ramírez",
        email: "carlos.ramirez@universidad.edu",
        password: hashedPassword,
        phone: "+52 33 9876 5432",
        date_of_birth: new Date("1975-03-10"),
      },
    ]);

    console.log(`Creados ${teachers.length} profesores`);

    // 2. Crear habilidades (Skills)
    const skills = await Skill.bulkCreate([
      { skill_name: "JavaScript" },
      { skill_name: "Python" },
      { skill_name: "Java" },
      { skill_name: "React" },
      { skill_name: "Node.js" },
      { skill_name: "SQL" },
      { skill_name: "MongoDB" },
      { skill_name: "AWS" },
      { skill_name: "Docker" },
    ]);

    console.log(`Creadas ${skills.length} habilidades`);

    // 3. Asignar habilidades a profesores (TeacherSkill)
    const teacherSkills = await TeacherSkill.bulkCreate([
      {
        teacher_id: teachers[0].teacher_id,
        skill_id: skills[0].skill_id,
        level: "Experto",
      },
      {
        teacher_id: teachers[0].teacher_id,
        skill_id: skills[3].skill_id,
        level: "Profesional",
      },
      {
        teacher_id: teachers[0].teacher_id,
        skill_id: skills[4].skill_id,
        level: "Profesional",
      },
      {
        teacher_id: teachers[1].teacher_id,
        skill_id: skills[1].skill_id,
        level: "Experto",
      },
      {
        teacher_id: teachers[1].teacher_id,
        skill_id: skills[5].skill_id,
        level: "Profesional",
      },
      {
        teacher_id: teachers[2].teacher_id,
        skill_id: skills[2].skill_id,
        level: "Experto",
      },
      {
        teacher_id: teachers[2].teacher_id,
        skill_id: skills[6].skill_id,
        level: "Usuario",
      },
      {
        teacher_id: teachers[2].teacher_id,
        skill_id: skills[7].skill_id,
        level: "Profesional",
      },
    ]);

    console.log(`Creadas ${teacherSkills.length} relaciones de habilidades`);

    // 4. Crear educación (Education)
    const education = await Education.bulkCreate([
      {
        teacher_id: teachers[0].teacher_id,
        degree: "Doctorado en Ciencias de la Computación",
        institution: "Universidad Nacional Autónoma de México",
        start_date: new Date("2010-09-01"),
        end_date: new Date("2014-06-30"),
        additional_info:
          "Tesis: Algoritmos de aprendizaje profundo para procesamiento de lenguaje natural",
      },
      {
        teacher_id: teachers[0].teacher_id,
        degree: "Maestría en Ingeniería de Software",
        institution: "Instituto Tecnológico Autónomo de México",
        start_date: new Date("2008-01-15"),
        end_date: new Date("2010-05-30"),
      },
      {
        teacher_id: teachers[1].teacher_id,
        degree: "Doctorado en Inteligencia Artificial",
        institution: "Universidad de Stanford",
        start_date: new Date("2012-08-15"),
        end_date: new Date("2016-05-20"),
      },
      {
        teacher_id: teachers[2].teacher_id,
        degree: "Maestría en Ciencia de Datos",
        institution: "Instituto Tecnológico de Massachusetts",
        start_date: new Date("2005-09-01"),
        end_date: new Date("2007-06-15"),
      },
    ]);

    console.log(`Creados ${education.length} registros de educación`);

    // 5. Crear experiencia laboral (Experience)
    const experiences = await Experience.bulkCreate([
      {
        teacher_id: teachers[0].teacher_id,
        position: "Investigador Senior",
        institution: "Google Research",
        start_date: new Date("2014-08-01"),
        end_date: new Date("2019-12-31"),
        description:
          "Investigación en algoritmos de machine learning y desarrollo de aplicaciones de IA",
      },
      {
        teacher_id: teachers[0].teacher_id,
        position: "Profesor Adjunto",
        institution: "Universidad Autónoma Metropolitana",
        start_date: new Date("2019-01-15"),
        description:
          "Docencia en cursos de programación avanzada y aprendizaje automático",
      },
      {
        teacher_id: teachers[1].teacher_id,
        position: "Científica de Datos",
        institution: "Microsoft",
        start_date: new Date("2016-07-01"),
        end_date: new Date("2020-03-15"),
        description:
          "Análisis de datos y desarrollo de modelos predictivos para productos empresariales",
      },
      {
        teacher_id: teachers[2].teacher_id,
        position: "Arquitecto de Software",
        institution: "Amazon Web Services",
        start_date: new Date("2007-08-15"),
        end_date: new Date("2018-10-30"),
        description: "Diseño e implementación de soluciones de nube escalables",
      },
    ]);

    console.log(`Creados ${experiences.length} registros de experiencia`);

    // 6. Crear certificaciones (Certification)
    const certifications = await Certification.bulkCreate([
      {
        teacher_id: teachers[0].teacher_id,
        certification_name: "AWS Certified Solutions Architect",
        issuing_institution: "Amazon Web Services",
        issue_date: new Date("2018-05-20"),
        expiration_date: new Date("2024-05-20"),
      },
      {
        teacher_id: teachers[0].teacher_id,
        certification_name: "Google Cloud Professional Data Engineer",
        issuing_institution: "Google Cloud",
        issue_date: new Date("2019-08-10"),
        expiration_date: new Date("2025-08-10"),
      },
      {
        teacher_id: teachers[1].teacher_id,
        certification_name:
          "Microsoft Certified: Azure Data Scientist Associate",
        issuing_institution: "Microsoft",
        issue_date: new Date("2020-03-15"),
        expiration_date: new Date("2024-03-15"),
      },
      {
        teacher_id: teachers[2].teacher_id,
        certification_name:
          "Oracle Certified Professional, Java SE 11 Developer",
        issuing_institution: "Oracle",
        issue_date: new Date("2019-11-05"),
      },
    ]);

    console.log(
      `Creados ${certifications.length} registros de certificaciones`
    );

    // 7. Crear archivos CV (CVArchive)
    const cvArchives = await CVArchive.bulkCreate([
      {
        teacher_id: teachers[0].teacher_id,
        file_path: "/uploads/cv/juan_perez_cv.pdf",
        file_type: "application/pdf",
        uploaded_at: new Date("2023-01-15"),
      },
      {
        teacher_id: teachers[1].teacher_id,
        file_path: "/uploads/cv/maria_gonzalez_cv.docx",
        file_type:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        uploaded_at: new Date("2023-02-20"),
      },
      {
        teacher_id: teachers[2].teacher_id,
        file_path: "/uploads/cv/carlos_ramirez_cv.pdf",
        file_type: "application/pdf",
        uploaded_at: new Date("2023-03-10"),
      },
    ]);

    console.log(`Creados ${cvArchives.length} archivos CV`);

    console.log("Seed completado exitosamente.");
    process.exit(0);
  } catch (error) {
    console.error("Error al ejecutar seed:", error);
    process.exit(1);
  }
}

seedDatabase();
