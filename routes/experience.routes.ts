// /src/routes/experience.routes.ts
import { Router } from "express";
import experienceController from "../controllers/experience.controller";
import authMiddleware from "../middlewares/auth";

const router = Router();

/**
 * @swagger
 * /api/experience:
 *   post:
 *     summary: Crear un registro de experiencia
 *     description: Crea un nuevo registro de experiencia para un teacher.
 *     responses:
 *       201:
 *         description: Registro de experiencia creado exitosamente.
 */
router.post("/", authMiddleware, experienceController.createExperience);

/**
 * @swagger
 * /api/experience/teacher/{teacherId}:
 *   get:
 *     summary: Obtener registros de experiencia por Teacher ID
 *     description: Retorna todos los registros de experiencia asociados a un teacher.
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         required: true
 *         description: ID del teacher.
 *     responses:
 *       200:
 *         description: Lista de registros de experiencia.
 */
router.get("/teacher/:teacherId", experienceController.getExperiences);

/**
 * @swagger
 * /api/experience/{id}:
 *   put:
 *     summary: Actualizar un registro de experiencia
 *     description: Actualiza un registro de experiencia por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de experiencia.
 *     responses:
 *       200:
 *         description: Registro de experiencia actualizado exitosamente.
 */
router.put("/:id", authMiddleware, experienceController.updateExperience);

/**
 * @swagger
 * /api/experience/{id}:
 *   delete:
 *     summary: Eliminar un registro de experiencia
 *     description: Elimina un registro de experiencia por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de experiencia.
 *     responses:
 *       204:
 *         description: Registro de experiencia eliminado exitosamente.
 */
router.delete("/:id", authMiddleware, experienceController.deleteExperience);

export default router;
