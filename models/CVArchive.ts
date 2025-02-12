// /models/CVArchive.ts
import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/db";

export interface CVArchiveAttributes {
  cv_id: number;
  teacher_id: number;
  file_path: string;
  file_type?: string;
  uploaded_at?: Date;
}

export interface CVArchiveCreationAttributes
  extends Optional<
    CVArchiveAttributes,
    "cv_id" | "file_type" | "uploaded_at"
  > {}

class CVArchive
  extends Model<CVArchiveAttributes, CVArchiveCreationAttributes>
  implements CVArchiveAttributes
{
  public cv_id!: number;
  public teacher_id!: number;
  public file_path!: string;
  public file_type?: string;
  public uploaded_at?: Date;
}

CVArchive.init(
  {
    cv_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    file_path: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    file_type: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    uploaded_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "cv_archive",
    timestamps: false,
  }
);

export default CVArchive;
