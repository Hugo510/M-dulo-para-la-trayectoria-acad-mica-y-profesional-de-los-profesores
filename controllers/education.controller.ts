// /src/controllers/education.controller.ts
import { Request, Response, NextFunction } from "express";
import educationService from "../services/education.service";

class EducationController {
  async createEducation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const education = await educationService.createEducation(req.body);
      res.status(201).json({ education });
    } catch (error) {
      next(error);
    }
  }

  async getEducations(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const teacherId = parseInt(req.params.teacherId, 10);
      const educations = await educationService.getEducationsByTeacherId(
        teacherId
      );
      res.json({ educations });
    } catch (error) {
      next(error);
    }
  }

  async updateEducation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const educationId = parseInt(req.params.id, 10);
      await educationService.updateEducation(educationId, req.body);
      res.json({ message: "Education updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  async deleteEducation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const educationId = parseInt(req.params.id, 10);
      await educationService.deleteEducation(educationId);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default new EducationController();
