// /config/logger.ts
import { createLogger, format, transports } from "winston";
import path from "path";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "cv-api-service" },
  transports: [
    // Registra los errores en un archivo
    new transports.File({
      filename: path.join("logs", "error.log"),
      level: "error",
    }),
    // Registra todos los logs en un archivo combinado
    new transports.File({ filename: path.join("logs", "combined.log") }),
  ],
});

// En desarrollo se agrega la consola con un formato simple y coloreado
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

export default logger;
