// /models/Certification.ts
import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/db";

export interface CertificationAttributes {
  certification_id: number;
  teacher_id: number;
  certification_name: string;
  issuing_institution?: string;
  issue_date?: Date;
  expiration_date?: Date;
}

export interface CertificationCreationAttributes
  extends Optional<
    CertificationAttributes,
    | "certification_id"
    | "issuing_institution"
    | "issue_date"
    | "expiration_date"
  > {}

class Certification
  extends Model<CertificationAttributes, CertificationCreationAttributes>
  implements CertificationAttributes
{
  public certification_id!: number;
  public teacher_id!: number;
  public certification_name!: string;
  public issuing_institution?: string;
  public issue_date?: Date;
  public expiration_date?: Date;
}

Certification.init(
  {
    certification_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    certification_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    issuing_institution: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    issue_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    expiration_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "certifications",
    timestamps: false,
  }
);

export default Certification;
