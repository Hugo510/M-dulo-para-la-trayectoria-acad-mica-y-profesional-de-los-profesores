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

import authRoutes from "./routes/auth";

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
      write: (message) => logger.info(message.trim()),
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

// Ejemplo de integración de rutas
app.use("/api/auth", authRoutes);

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
