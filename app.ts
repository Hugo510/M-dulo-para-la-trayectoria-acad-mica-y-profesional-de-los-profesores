// app.ts
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import env from "./config/env";
import logger from "./config/logger";
import sequelize from "./config/db";

// Inicializar la aplicación Express
const app = express();

// Middlewares de seguridad y manejo de solicitudes
app.use(helmet());
app.use(cors());
app.use(express.json());

// Logging HTTP con morgan, integrado con Winston
app.use(
  morgan("combined", {
    stream: {
      write: (message: string) => logger.info(message.trim()),
    },
  })
);

// Configuración de Swagger para la documentación de la API
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API de CV para Maestros",
      version: "1.0.0",
      description: "Documentación de la API para la gestión de CVs de maestros",
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: "Servidor de desarrollo",
      },
    ],
  },
  // Ajusta la ruta según donde almacenes tus archivos de rutas
  apis: ["./src/routes/*.ts"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

import authRoutes from "./routes/auth.routes";
import teacherRoutes from "./routes/teacher.routes";
import educationRoutes from "./routes/education.routes";
import experienceRoutes from "./routes/experience.routes";
import certificationRoutes from "./routes/certification.routes";
import cvArchiveRoutes from "./routes/cvArchive.routes";
import skillRoutes from "./routes/skill.routes";
import teacherSkillRoutes from "./routes/teacherSkill.routes";
import teacherProfileRoutes from "./routes/teacherProfile.routes";

app.use("/api/auth", authRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/certifications", certificationRoutes);
app.use("/api/cvArchive", cvArchiveRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/teacher-skills", teacherSkillRoutes);
app.use("/api/teacher-profile", teacherProfileRoutes);

// Middleware global para manejo de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error("Error global: %s", err.stack);
  res.status(500).json({ error: "Ha ocurrido un error interno" });
});

// Inicializar el servidor una vez que la base de datos se ha sincronizado
app.listen(env.PORT, () => {
  logger.info(`Servidor corriendo en el puerto ${env.PORT}`);
});

export default app;
