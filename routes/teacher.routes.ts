// /src/routes/teacher.routes.ts
import { Router } from "express";
import teacherController from "../controllers/teacher.controller";
import authMiddleware from "../middlewares/auth";

const router = Router();

/**
 * @swagger
 * /api/teachers:
 *   post:
 *     summary: Crear un nuevo teacher
 *     description: Crea un teacher y retorna el objeto creado.
 *     responses:
 *       201:
 *         description: Teacher creado exitosamente.
 */
router.post("/", teacherController.createTeacher);

/**
 * @swagger
 * /api/teachers/{id}:
 *   get:
 *     summary: Obtener un teacher por ID
 *     description: Retorna la información de un teacher, incluyendo sus asociaciones.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del teacher.
 *     responses:
 *       200:
 *         description: Información del teacher.
 *       404:
 *         description: Teacher no encontrado.
 */
router.get("/:id", teacherController.getTeacher);

/**
 * @swagger
 * /api/teachers/{id}:
 *   put:
 *     summary: Actualizar un teacher
 *     description: Actualiza la información de un teacher por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del teacher.
 *     responses:
 *       200:
 *         description: Teacher actualizado exitosamente.
 */
router.put("/:id", authMiddleware, teacherController.updateTeacher);

/**
 * @swagger
 * /api/teachers/{id}:
 *   delete:
 *     summary: Eliminar un teacher
 *     description: Elimina el teacher por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del teacher.
 *     responses:
 *       204:
 *         description: Teacher eliminado exitosamente.
 */
router.delete("/:id", authMiddleware, teacherController.deleteTeacher);

export default router;
