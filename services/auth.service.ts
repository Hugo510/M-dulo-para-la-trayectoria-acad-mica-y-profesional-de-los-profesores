// /src/services/auth.service.ts
import Teacher, { TeacherCreationAttributes } from "../models/Teacher";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../config/env";

class AuthService {
  /**
   * Registra un nuevo teacher.
   * @param data Datos de registro (first_name, last_name, email, password, etc.).
   * @returns El objeto Teacher creado.
   */
  async registerTeacher(data: TeacherCreationAttributes) {
    // Verificar si ya existe un teacher con el mismo email
    const existingTeacher = await Teacher.findOne({
      where: { email: data.email },
    });
    if (existingTeacher) {
      throw new Error("Teacher already exists");
    }
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    // Crear el teacher
    const teacher = await Teacher.create(data);
    return teacher;
  }

  /**
   * Autentica a un teacher comparando el email y la contraseña.
   * @param email Email del teacher.
   * @param password Contraseña en texto plano.
   * @returns Objeto que contiene el token JWT y el teacher.
   */
  async loginTeacher(email: string, password: string) {
    const teacher = await Teacher.findOne({ where: { email } });
    if (!teacher) {
      throw new Error("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    // Payload del token
    const payload = { teacherId: teacher.teacher_id, email: teacher.email };
    const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: "1h" });
    return { token, teacher };
  }
}

export default new AuthService();
