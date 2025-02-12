// /src/routes/certification.routes.ts
import { Router } from "express";
import certificationController from "../controllers/certification.controller";
import authMiddleware from "../middlewares/auth";

const router = Router();

/**
 * @swagger
 * /api/certifications:
 *   post:
 *     summary: Crear un registro de certificación
 *     description: Crea un nuevo registro de certificación para un teacher.
 *     responses:
 *       201:
 *         description: Registro de certificación creado exitosamente.
 */
router.post("/", authMiddleware, certificationController.createCertification);

/**
 * @swagger
 * /api/certifications/teacher/{teacherId}:
 *   get:
 *     summary: Obtener registros de certificación por Teacher ID
 *     description: Retorna todos los registros de certificación asociados a un teacher.
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         required: true
 *         description: ID del teacher.
 *     responses:
 *       200:
 *         description: Lista de registros de certificación.
 */
router.get("/teacher/:teacherId", certificationController.getCertifications);

/**
 * @swagger
 * /api/certifications/{id}:
 *   put:
 *     summary: Actualizar un registro de certificación
 *     description: Actualiza un registro de certificación por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de certificación.
 *     responses:
 *       200:
 *         description: Registro de certificación actualizado exitosamente.
 */
router.put("/:id", authMiddleware, certificationController.updateCertification);

/**
 * @swagger
 * /api/certifications/{id}:
 *   delete:
 *     summary: Eliminar un registro de certificación
 *     description: Elimina un registro de certificación por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de certificación.
 *     responses:
 *       204:
 *         description: Registro de certificación eliminado exitosamente.
 */
router.delete(
  "/:id",
  authMiddleware,
  certificationController.deleteCertification
);

export default router;
