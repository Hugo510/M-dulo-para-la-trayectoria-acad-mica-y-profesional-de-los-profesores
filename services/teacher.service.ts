// /src/services/teacher.service.ts
import Teacher, {
  TeacherCreationAttributes,
  TeacherAttributes,
} from "../models/Teacher";
import bcrypt from "bcrypt";

class TeacherService {
  /**
   * Crea un nuevo teacher, aplicando hash a la contraseña.
   */
  async createTeacher(data: TeacherCreationAttributes): Promise<Teacher> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    return Teacher.create(data);
  }

  /**
   * Obtiene un teacher por ID, incluyendo asociaciones definidas.
   */
  async getTeacherById(id: number): Promise<Teacher | null> {
    return Teacher.findByPk(id, {
      include: [
        { association: "educations" },
        { association: "experiences" },
        { association: "certifications" },
        { association: "cvArchives" },
        { association: "skills" },
      ],
    });
  }

  /**
   * Actualiza los datos de un teacher.
   */
  // /src/services/teacher.service.ts
  async updateTeacher(
    id: number,
    data: Partial<TeacherAttributes>
  ): Promise<number> {
    // Se desestructura el primer elemento del array devuelto por update
    const [affectedCount] = await Teacher.update(data, {
      where: { teacher_id: id },
    });
    return affectedCount;
  }

  /**
   * Elimina un teacher de la base de datos.
   */
  async deleteTeacher(id: number): Promise<number> {
    return Teacher.destroy({ where: { teacher_id: id } });
  }
}

export default new TeacherService();
