// /src/controllers/skill.controller.ts
import { Request, Response, NextFunction } from "express";
import skillService from "../services/skill.service";

class SkillController {
  async createSkill(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const skill = await skillService.createSkill(req.body);
      res.status(201).json({ skill });
    } catch (error) {
      next(error);
    }
  }

  async getSkills(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const skills = await skillService.getAllSkills();
      res.json({ skills });
    } catch (error) {
      next(error);
    }
  }

  async updateSkill(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const skillId = parseInt(req.params.id, 10);
      await skillService.updateSkill(skillId, req.body);
      res.json({ message: "Skill updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  async deleteSkill(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const skillId = parseInt(req.params.id, 10);
      await skillService.deleteSkill(skillId);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default new SkillController();
