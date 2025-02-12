// /models/Experience.ts
import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/db";

export interface ExperienceAttributes {
  experience_id: number;
  teacher_id: number;
  position: string;
  institution: string;
  start_date?: Date;
  end_date?: Date;
  description?: string;
}

export interface ExperienceCreationAttributes
  extends Optional<
    ExperienceAttributes,
    "experience_id" | "start_date" | "end_date" | "description"
  > {}

class Experience
  extends Model<ExperienceAttributes, ExperienceCreationAttributes>
  implements ExperienceAttributes
{
  public experience_id!: number;
  public teacher_id!: number;
  public position!: string;
  public institution!: string;
  public start_date?: Date;
  public end_date?: Date;
  public description?: string;
}

Experience.init(
  {
    experience_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    institution: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "experience",
    timestamps: false,
  }
);

export default Experience;
