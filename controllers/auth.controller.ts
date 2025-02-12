// /src/controllers/auth.controller.ts
import { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service";

class AuthController {
  /**
   * Endpoint para registrar un teacher.
   */
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const teacher = await authService.registerTeacher(req.body);
      res.status(201).json({ teacher });
    } catch (error: any) {
      next(error);
    }
  }

  /**
   * Endpoint para autenticar (login) a un teacher.
   */
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const { token, teacher } = await authService.loginTeacher(
        email,
        password
      );
      res.json({ token, teacher });
    } catch (error: any) {
      next(error);
    }
  }
}

export default new AuthController();
