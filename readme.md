# CV API Backend

## Tabla de Contenidos

- [Descripción](#descripción)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Base de Datos](#base-de-datos)
  - [Migraciones](#migraciones)
  - [Datos de Prueba (Seeds)](#datos-de-prueba-seeds)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Modelos](#modelos)
- [API Endpoints](#api-endpoints)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Descripción

Este proyecto implementa una API robusta y escalable para la gestión de currículums (CV) de maestros, focalizada en la seguridad, eficiencia y modularidad mediante el uso de tecnologías modernas y estándares profesionales. El backend permite administrar perfiles de maestros incluyendo sus datos personales, educación, experiencia laboral, certificaciones, habilidades y archivos CV.

## Requisitos

- Node.js (v16 o superior)
- MySQL (v8 o superior)
- npm o yarn

## Instalación

1. Clona el repositorio:

   ```bash
   git clone <url-del-repositorio>
   cd backend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto.

4. Configura las variables de entorno (ver sección [Configuración](#configuración)).

## Configuración

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

```env
# Puerto del servidor
PORT=3000

# Entorno de ejecución
NODE_ENV=development

# Configuración de la base de datos
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASS=tu_contraseña
DB_NAME=cv_maestros_db

# Secreto para JWT (generar un valor único y seguro)
JWT_SECRET=tu_secreto_seguro

# Variables opcionales para configuraciones adicionales
# UPLOAD_PATH=./uploads
```

## Base de Datos

### Migraciones

El proyecto incluye un sistema de migraciones para crear la estructura de tablas en la base de datos de manera ordenada. Para ejecutar las migraciones:

```bash
npm run migrate
```

Este comando ejecutará el archivo `migrate.ts` que creará las siguientes tablas en orden:

1. `teachers` - Información de los maestros
2. `education` - Historial educativo de los maestros
3. `experience` - Experiencia laboral
4. `certifications` - Certificaciones obtenidas
5. `cv_archive` - Archivos CV almacenados
6. `skills` - Catálogo de habilidades disponibles
7. `teacher_skills` - Relación entre maestros y habilidades

### Datos de Prueba (Seeds)

Para poblar la base de datos con datos de prueba, usa:

```bash
npm run seed
```

Este comando ejecutará el archivo `seed.ts` que crea:

- Usuarios maestros con datos personales
- Registros de educación asociados
- Experiencia laboral para cada maestro
- Certificaciones
- Habilidades y asignación de niveles
- Archivos CV ficticios

## Uso

Inicia el servidor en modo desarrollo con:

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000` (o el puerto configurado en las variables de entorno).

La documentación de la API estará disponible en `http://localhost:3000/api-docs`.

## Estructura del Proyecto

```
/backend
  /config           # Configuraciones (DB, logger, env)
  /controllers      # Controladores de la API
  /middlewares      # Middlewares personalizados (autenticación, validación)
  /models           # Modelos de Sequelize
  /routes           # Definición de rutas
  /utils            # Utilidades y helpers
  app.ts            # Punto de entrada de la aplicación
  migrate.ts        # Script de migraciones
  seed.ts           # Script de datos de prueba
```

## Modelos

El sistema utiliza los siguientes modelos:

- **Teacher**: Datos personales y de contacto de los maestros
- **Education**: Historial académico y formativo
- **Experience**: Experiencia laboral previa y actual
- **Certification**: Certificaciones y títulos obtenidos
- **Skill**: Catálogo de habilidades disponibles
- **TeacherSkill**: Relación entre maestros y sus habilidades con nivel
- **CVArchive**: Documentos CV almacenados en el sistema

## API Endpoints

### Autenticación

- `POST /api/auth/register` - Registro de un nuevo maestro
- `POST /api/auth/login` - Inicio de sesión y generación de token

### Maestros

- `GET /api/teachers` - Listar todos los maestros
- `GET /api/teachers/:id` - Obtener detalles de un maestro
- `PUT /api/teachers/:id` - Actualizar información de un maestro
- `DELETE /api/teachers/:id` - Eliminar un maestro

### Educación

- `GET /api/education/:teacherId` - Obtener educación de un maestro
- `POST /api/education` - Añadir registro de educación
- `PUT /api/education/:id` - Actualizar registro de educación
- `DELETE /api/education/:id` - Eliminar registro de educación

### Experiencia

- `GET /api/experience/:teacherId` - Obtener experiencia de un maestro
- `POST /api/experience` - Añadir registro de experiencia
- `PUT /api/experience/:id` - Actualizar registro de experiencia
- `DELETE /api/experience/:id` - Eliminar registro de experiencia

### Certificaciones

- `GET /api/certifications/:teacherId` - Obtener certificaciones de un maestro
- `POST /api/certifications` - Añadir certificación
- `PUT /api/certifications/:id` - Actualizar certificación
- `DELETE /api/certifications/:id` - Eliminar certificación

### Habilidades

- `GET /api/skills` - Listar todas las habilidades
- `POST /api/skills` - Crear nueva habilidad
- `PUT /api/skills/:id` - Actualizar habilidad
- `DELETE /api/skills/:id` - Eliminar habilidad

### Habilidades del Maestro

- `GET /api/teacher-skills/:teacherId` - Obtener habilidades de un maestro
- `POST /api/teacher-skills` - Asignar habilidad a maestro
- `PUT /api/teacher-skills/:teacherId/:skillId` - Actualizar nivel de habilidad
- `DELETE /api/teacher-skills/:teacherId/:skillId` - Eliminar asignación de habilidad

### CV Archivos

- `GET /api/cvArchive/:teacherId` - Obtener CV de un maestro
- `POST /api/cvArchive/upload` - Subir nuevo CV
- `DELETE /api/cvArchive/:id` - Eliminar archivo CV

## Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue los siguientes pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Asegúrate de que las pruebas pasen.
5. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
6. Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
