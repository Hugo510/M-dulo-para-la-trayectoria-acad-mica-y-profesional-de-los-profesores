// /models/Skill.ts
import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/db";

export interface SkillAttributes {
  skill_id: number;
  skill_name: string;
}

export interface SkillCreationAttributes
  extends Optional<SkillAttributes, "skill_id"> {}

class Skill
  extends Model<SkillAttributes, SkillCreationAttributes>
  implements SkillAttributes
{
  public skill_id!: number;
  public skill_name!: string;
}

Skill.init(
  {
    skill_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    skill_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "skills",
    timestamps: false,
  }
);

export default Skill;
