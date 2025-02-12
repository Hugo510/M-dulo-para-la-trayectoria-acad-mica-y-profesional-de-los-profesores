// /src/services/experience.service.ts
import Experience, {
  ExperienceCreationAttributes,
  ExperienceAttributes,
} from "../models/Experience";

class ExperienceService {
  async createExperience(
    data: ExperienceCreationAttributes
  ): Promise<Experience> {
    return Experience.create(data);
  }

  async getExperiencesByTeacherId(teacherId: number): Promise<Experience[]> {
    return Experience.findAll({ where: { teacher_id: teacherId } });
  }

  async updateExperience(
    id: number,
    data: Partial<ExperienceAttributes>
  ): Promise<number> {
    const [affectedCount] = await Experience.update(data, {
      where: { experience_id: id },
    });
    return affectedCount;
  }

  async deleteExperience(id: number): Promise<number> {
    return Experience.destroy({ where: { experience_id: id } });
  }
}

export default new ExperienceService();
