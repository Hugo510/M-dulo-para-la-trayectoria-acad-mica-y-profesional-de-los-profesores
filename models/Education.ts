// /models/Education.ts
import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/db";

export interface EducationAttributes {
  education_id: number;
  teacher_id: number;
  degree: string;
  institution: string;
  start_date?: Date;
  end_date?: Date;
  additional_info?: string;
}

export interface EducationCreationAttributes
  extends Optional<
    EducationAttributes,
    "education_id" | "start_date" | "end_date" | "additional_info"
  > {}

class Education
  extends Model<EducationAttributes, EducationCreationAttributes>
  implements EducationAttributes
{
  public education_id!: number;
  public teacher_id!: number;
  public degree!: string;
  public institution!: string;
  public start_date?: Date;
  public end_date?: Date;
  public additional_info?: string;
}

Education.init(
  {
    education_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    degree: {
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
    additional_info: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "education",
    timestamps: false,
  }
);

export default Education;
