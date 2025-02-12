// /src/controllers/teacher.controller.ts
import { Request, Response, NextFunction } from "express";
import teacherService from "../services/teacher.service";

class TeacherController {
  async createTeacher(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const teacher = await teacherService.createTeacher(req.body);
      res.status(201).json({ teacher });
    } catch (error) {
      next(error);
    }
  }

  async getTeacher(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const teacherId = parseInt(req.params.id, 10);
      const teacher = await teacherService.getTeacherById(teacherId);
      if (!teacher) {
        res.status(404).json({ message: "Teacher not found" });
        return;
      }
      res.json({ teacher });
    } catch (error) {
      next(error);
    }
  }

  async updateTeacher(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const teacherId = parseInt(req.params.id, 10);
      await teacherService.updateTeacher(teacherId, req.body);
      res.json({ message: "Teacher updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  async deleteTeacher(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const teacherId = parseInt(req.params.id, 10);
      await teacherService.deleteTeacher(teacherId);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default new TeacherController();
