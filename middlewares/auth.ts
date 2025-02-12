// /src/middlewares/auth.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env";
import logger from "../config/logger";

/**
 * Interfaz que representa el payload del token JWT.
 */
export interface TokenPayload {
  teacherId: number;
  email: string;
  // Puedes agregar más propiedades según lo requieras.
}

/**
 * Extiende la interfaz Request de Express para incluir la propiedad 'user'
 * que contendrá el payload decodificado del token JWT.
 */
export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

/**
 * Middleware de autenticación.
 * - Extrae el token del encabezado 'Authorization' en el formato "Bearer <token>".
 * - Valida y decodifica el token utilizando el secreto configurado.
 * - Si el token es válido, añade la información decodificada a req.user y continúa.
 * - En caso de error, responde con un código 401 (No Autorizado).
 */
const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "Acceso denegado: Token no proporcionado" });
    return;
  }

  // Se espera el formato: "Bearer <token>"
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    res
      .status(401)
      .json({ error: "Acceso denegado: Formato de token inválido" });
    return;
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
    req.user = decoded;
    next();
  } catch (error) {
    logger.error("Error en autenticación: %s", error);
    res.status(401).json({ error: "Acceso denegado: Token inválido" });
    return;
  }
};

export default authMiddleware;
