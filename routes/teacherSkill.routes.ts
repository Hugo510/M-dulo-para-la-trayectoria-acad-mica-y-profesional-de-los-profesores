// /src/routes/teacherSkill.routes.ts
import { Router } from "express";
import teacherSkillController from "../controllers/teacherSkill.controller";
import authMiddleware from "../middlewares/auth";

const router = Router();

/**
 * @swagger
 * /api/teacher-skills:
 *   post:
 *     summary: Agregar una skill a un teacher
 *     description: Asocia una skill a un teacher con un nivel específico.
 *     responses:
 *       201:
 *         description: TeacherSkill creada exitosamente.
 */
router.post("/", authMiddleware, teacherSkillController.addTeacherSkill);

/**
 * @swagger
 * /api/teacher-skills/teacher/{teacherId}/skill/{skillId}:
 *   put:
 *     summary: Actualizar el nivel de una skill para un teacher
 *     description: Actualiza el nivel de la asociación TeacherSkill.
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         required: true
 *         description: ID del teacher.
 *       - in: path
 *         name: skillId
 *         required: true
 *         description: ID de la skill.
 *     responses:
 *       200:
 *         description: Nivel actualizado exitosamente.
 */
router.put(
  "/teacher/:teacherId/skill/:skillId",
  authMiddleware,
  teacherSkillController.updateTeacherSkill
);

/**
 * @swagger
 * /api/teacher-skills/teacher/{teacherId}/skill/{skillId}:
 *   delete:
 *     summary: Eliminar una skill de un teacher
 *     description: Elimina la asociación TeacherSkill.
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         required: true
 *         description: ID del teacher.
 *       - in: path
 *         name: skillId
 *         required: true
 *         description: ID de la skill.
 *     responses:
 *       204:
 *         description: TeacherSkill eliminada exitosamente.
 */
router.delete(
  "/teacher/:teacherId/skill/:skillId",
  authMiddleware,
  teacherSkillController.removeTeacherSkill
);

export default router;
