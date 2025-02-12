// /src/controllers/experience.controller.ts
import { Request, Response, NextFunction } from "express";
import experienceService from "../services/experience.service";

class ExperienceController {
  async createExperience(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const experience = await experienceService.createExperience(req.body);
      res.status(201).json({ experience });
    } catch (error) {
      next(error);
    }
  }

  async getExperiences(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const teacherId = parseInt(req.params.teacherId, 10);
      const experiences = await experienceService.getExperiencesByTeacherId(
        teacherId
      );
      res.json({ experiences });
    } catch (error) {
      next(error);
    }
  }

  async updateExperience(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const experienceId = parseInt(req.params.id, 10);
      await experienceService.updateExperience(experienceId, req.body);
      res.json({ message: "Experience updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  async deleteExperience(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const experienceId = parseInt(req.params.id, 10);
      await experienceService.deleteExperience(experienceId);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default new ExperienceController();
