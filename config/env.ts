// /config/env.ts
import { z } from "zod";
import dotenv from "dotenv";
import logger from "./logger";

dotenv.config(); // Carga el archivo .env

const envSchema = z.object({
  PORT: z.string().default("3000"),
  NODE_ENV: z.string().default("development"),
  DB_HOST: z.string({
    required_error: "La variable DB_HOST es obligatoria",
  }),
  DB_USER: z.string({
    required_error: "La variable DB_USER es obligatoria",
  }),
  DB_PASS: z.string({
    required_error: "La variable DB_PASS es obligatoria",
  }),
  DB_NAME: z.string({
    required_error: "La variable DB_NAME es obligatoria",
  }),
  JWT_SECRET: z.string({
    required_error: "La variable JWT_SECRET es obligatoria",
  }),
  // Si en el futuro utilizas S3, puedes incluir:
  // AWS_ACCESS_KEY_ID: z.string().optional(),
  // AWS_SECRET_ACCESS_KEY: z.string().optional(),
  // AWS_REGION: z.string().optional(),
  // AWS_S3_BUCKET: z.string().optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  // Se registra el error y se detiene la aplicación
  logger.error("Variables de entorno inválidas: %s", parsedEnv.error.flatten());
  process.exit(1);
}

export default parsedEnv.data;
