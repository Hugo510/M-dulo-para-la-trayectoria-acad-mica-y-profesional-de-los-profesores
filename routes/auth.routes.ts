// /src/routes/auth.routes.ts
import { Router } from "express";
import authController from "../controllers/auth.controller";

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo teacher
 *     description: Crea un nuevo teacher y retorna el objeto creado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Teacher registrado exitosamente.
 *       400:
 *         description: Error en la validación o teacher ya existente.
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Autenticar a un teacher
 *     description: Permite a un teacher autenticarse y obtener un token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Autenticación exitosa, retorna token y datos del teacher.
 *       401:
 *         description: Credenciales inválidas.
 */
router.post("/login", authController.login);

export default router;
