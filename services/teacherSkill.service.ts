// /src/services/teacherSkill.service.ts
import TeacherSkill, { TeacherSkillAttributes } from "../models/TeacherSkill";

class TeacherSkillService {
  async addTeacherSkill(data: TeacherSkillAttributes): Promise<TeacherSkill> {
    return TeacherSkill.create(data);
  }

  async updateTeacherSkill(
    teacherId: number,
    skillId: number,
    level: "Experto" | "Profesional" | "Usuario"
  ): Promise<number> {
    const [affectedCount] = await TeacherSkill.update(
      { level },
      { where: { teacher_id: teacherId, skill_id: skillId } }
    );
    return affectedCount;
  }

  async removeTeacherSkill(
    teacherId: number,
    skillId: number
  ): Promise<number> {
    return TeacherSkill.destroy({
      where: { teacher_id: teacherId, skill_id: skillId },
    });
  }
}

export default new TeacherSkillService();
