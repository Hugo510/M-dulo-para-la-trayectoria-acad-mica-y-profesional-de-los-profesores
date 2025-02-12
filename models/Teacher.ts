// /models/Teacher.ts
import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/db";

export interface TeacherAttributes {
  teacher_id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  date_of_birth?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export interface TeacherCreationAttributes
  extends Optional<
    TeacherAttributes,
    | "teacher_id"
    | "phone"
    | "address"
    | "date_of_birth"
    | "created_at"
    | "updated_at"
  > {}

class Teacher
  extends Model<TeacherAttributes, TeacherCreationAttributes>
  implements TeacherAttributes
{
  public teacher_id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public password!: string;
  public phone?: string;
  public address?: string;
  public date_of_birth?: Date;
  public created_at?: Date;
  public updated_at?: Date;
}

Teacher.init(
  {
    teacher_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "teachers",
    timestamps: false, // Se manejan manualmente los campos created_at y updated_at.
  }
);

export default Teacher;
