import { Router } from "express";
import { getTeacherProfile } from "../controllers/teacherProfile.controller";

// Crear una instancia del router
const router = Router();

/**
 * @swagger
 * /api/teacher-profile/{id}:
 *   get:
 *     summary: Obtiene el perfil completo de un maestro
 *     description: Devuelve toda la información de un maestro incluyendo datos personales, formación académica, experiencia profesional, certificaciones y habilidades.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del maestro
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Perfil completo del maestro
 *       404:
 *         description: Maestro no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/:id", getTeacherProfile);

export default router;
