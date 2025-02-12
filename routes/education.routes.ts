// /src/routes/education.routes.ts
import { Router } from "express";
import educationController from "../controllers/education.controller";
import authMiddleware from "../middlewares/auth";

const router = Router();

/**
 * @swagger
 * /api/education:
 *   post:
 *     summary: Crear un registro de educación
 *     description: Crea un nuevo registro de educación para un teacher.
 *     responses:
 *       201:
 *         description: Registro de educación creado exitosamente.
 */
router.post("/", authMiddleware, educationController.createEducation);

/**
 * @swagger
 * /api/education/teacher/{teacherId}:
 *   get:
 *     summary: Obtener registros de educación por Teacher ID
 *     description: Retorna todos los registros de educación asociados a un teacher.
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         required: true
 *         description: ID del teacher.
 *     responses:
 *       200:
 *         description: Lista de registros de educación.
 */
router.get("/teacher/:teacherId", educationController.getEducations);

/**
 * @swagger
 * /api/education/{id}:
 *   put:
 *     summary: Actualizar un registro de educación
 *     description: Actualiza un registro de educación por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de educación.
 *     responses:
 *       200:
 *         description: Registro de educación actualizado exitosamente.
 */
router.put("/:id", authMiddleware, educationController.updateEducation);

/**
 * @swagger
 * /api/education/{id}:
 *   delete:
 *     summary: Eliminar un registro de educación
 *     description: Elimina un registro de educación por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de educación.
 *     responses:
 *       204:
 *         description: Registro de educación eliminado exitosamente.
 */
router.delete("/:id", authMiddleware, educationController.deleteEducation);

export default router;
