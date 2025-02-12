// /src/services/education.service.ts
import Education, {
  EducationCreationAttributes,
  EducationAttributes,
} from "../models/Education";

class EducationService {
  async createEducation(data: EducationCreationAttributes): Promise<Education> {
    return Education.create(data);
  }

  async getEducationsByTeacherId(teacherId: number): Promise<Education[]> {
    return Education.findAll({ where: { teacher_id: teacherId } });
  }

  async updateEducation(
    educationId: number,
    data: Partial<EducationAttributes>
  ): Promise<number> {
    const [affectedCount] = await Education.update(data, {
      where: { education_id: educationId },
    });
    return affectedCount;
  }

  async deleteEducation(educationId: number): Promise<number> {
    return Education.destroy({ where: { education_id: educationId } });
  }
}

export default new EducationService();
