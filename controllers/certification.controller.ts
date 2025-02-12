// /src/controllers/certification.controller.ts
import { Request, Response, NextFunction } from "express";
import certificationService from "../services/certification.service";

class CertificationController {
  async createCertification(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const certification = await certificationService.createCertification(
        req.body
      );
      res.status(201).json({ certification });
    } catch (error) {
      next(error);
    }
  }

  async getCertifications(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const teacherId = parseInt(req.params.teacherId, 10);
      const certifications =
        await certificationService.getCertificationsByTeacherId(teacherId);
      res.json({ certifications });
    } catch (error) {
      next(error);
    }
  }

  async updateCertification(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const certificationId = parseInt(req.params.id, 10);
      await certificationService.updateCertification(certificationId, req.body);
      res.json({ message: "Certification updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  async deleteCertification(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const certificationId = parseInt(req.params.id, 10);
      await certificationService.deleteCertification(certificationId);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default new CertificationController();
