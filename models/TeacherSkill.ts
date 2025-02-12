// /models/TeacherSkill.ts
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

export interface TeacherSkillAttributes {
  teacher_id: number;
  skill_id: number;
  level: "Experto" | "Profesional" | "Usuario";
}

class TeacherSkill
  extends Model<TeacherSkillAttributes>
  implements TeacherSkillAttributes
{
  public teacher_id!: number;
  public skill_id!: number;
  public level!: "Experto" | "Profesional" | "Usuario";
}

TeacherSkill.init(
  {
    teacher_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    skill_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    level: {
      type: DataTypes.ENUM("Experto", "Profesional", "Usuario"),
      allowNull: false,
      defaultValue: "Usuario",
    },
  },
  {
    sequelize,
    tableName: "teacher_skills",
    timestamps: false,
  }
);

export default TeacherSkill;
