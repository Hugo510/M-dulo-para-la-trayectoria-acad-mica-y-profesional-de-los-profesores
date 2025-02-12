// /src/controllers/teacherSkill.controller.ts
import { Request, Response, NextFunction } from "express";
import teacherSkillService from "../services/teacherSkill.service";

class TeacherSkillController {
  async addTeacherSkill(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Se asume que req.body contiene teacher_id, skill_id y level.
      const teacherSkill = await teacherSkillService.addTeacherSkill(req.body);
      res.status(201).json({ teacherSkill });
    } catch (error) {
      next(error);
    }
  }

  async updateTeacherSkill(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const teacherId = parseInt(req.params.teacherId, 10);
      const skillId = parseInt(req.params.skillId, 10);
      const { level } = req.body;
      await teacherSkillService.updateTeacherSkill(teacherId, skillId, level);
      res.json({ message: "TeacherSkill updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  async removeTeacherSkill(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const teacherId = parseInt(req.params.teacherId, 10);
      const skillId = parseInt(req.params.skillId, 10);
      await teacherSkillService.removeTeacherSkill(teacherId, skillId);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default new TeacherSkillController();
