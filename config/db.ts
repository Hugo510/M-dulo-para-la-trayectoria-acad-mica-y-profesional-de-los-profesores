// /config/db.ts

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Carga las variables de entorno definidas en .env

/**
 * Configuración de la conexión a la base de datos utilizando Sequelize.
 * Se extraen los parámetros de conexión desde las variables de entorno.
 */
const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false, // Cambia a console.log para ver las consultas SQL durante el desarrollo
  }
);

export default sequelize;
