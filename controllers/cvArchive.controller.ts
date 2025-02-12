// /src/controllers/cvArchive.controller.ts
import { Request, Response, NextFunction } from "express";
import cvArchiveService from "../services/cvArchive.service";

class CVArchiveController {
  async createCVArchive(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Se asume que la lógica para el manejo de archivos (por ejemplo, mediante multer)
      // procesa el archivo y coloca la información necesaria en req.body.
      const cvArchive = await cvArchiveService.createCVArchive(req.body);
      res.status(201).json({ cvArchive });
    } catch (error) {
      next(error);
    }
  }

  async getCVArchives(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const teacherId = parseInt(req.params.teacherId, 10);
      const archives = await cvArchiveService.getCVArchivesByTeacherId(
        teacherId
      );
      res.json({ archives });
    } catch (error) {
      next(error);
    }
  }

  async deleteCVArchive(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const cvId = parseInt(req.params.id, 10);
      await cvArchiveService.deleteCVArchive(cvId);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default new CVArchiveController();
