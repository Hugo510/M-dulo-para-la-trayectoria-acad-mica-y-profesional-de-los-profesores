// /src/services/skill.service.ts
import Skill, {
  SkillCreationAttributes,
  SkillAttributes,
} from "../models/Skill";

class SkillService {
  async createSkill(data: SkillCreationAttributes): Promise<Skill> {
    return Skill.create(data);
  }

  async getAllSkills(): Promise<Skill[]> {
    return Skill.findAll();
  }

  async updateSkill(
    skillId: number,
    data: Partial<SkillAttributes>
  ): Promise<number> {
    const [affectedCount] = await Skill.update(data, {
      where: { skill_id: skillId },
    });
    return affectedCount;
  }

  async deleteSkill(skillId: number): Promise<number> {
    return Skill.destroy({ where: { skill_id: skillId } });
  }
}

export default new SkillService();
