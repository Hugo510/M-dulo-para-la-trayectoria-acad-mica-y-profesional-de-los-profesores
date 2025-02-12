// /src/routes/skill.routes.ts
import { Router } from "express";
import skillController from "../controllers/skill.controller";
import authMiddleware from "../middlewares/auth";

const router = Router();

/**
 * @swagger
 * /api/skills:
 *   post:
 *     summary: Crear una skill
 *     description: Crea una nueva skill.
 *     responses:
 *       201:
 *         description: Skill creada exitosamente.
 */
router.post("/", authMiddleware, skillController.createSkill);

/**
 * @swagger
 * /api/skills:
 *   get:
 *     summary: Obtener todas las skills
 *     description: Retorna todas las skills disponibles.
 *     responses:
 *       200:
 *         description: Lista de skills.
 */
router.get("/", skillController.getSkills);

/**
 * @swagger
 * /api/skills/{id}:
 *   put:
 *     summary: Actualizar una skill
 *     description: Actualiza una skill por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la skill.
 *     responses:
 *       200:
 *         description: Skill actualizada exitosamente.
 */
router.put("/:id", authMiddleware, skillController.updateSkill);

/**
 * @swagger
 * /api/skills/{id}:
 *   delete:
 *     summary: Eliminar una skill
 *     description: Elimina una skill por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la skill.
 *     responses:
 *       204:
 *         description: Skill eliminada exitosamente.
 */
router.delete("/:id", authMiddleware, skillController.deleteSkill);

export default router;
