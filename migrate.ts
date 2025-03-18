import sequelize from "./config/db";
import {
  Teacher,
  Education,
  Experience,
  Certification,
  CVArchive,
  Skill,
  TeacherSkill,
} from "./models/index";

async function runMigrations() {
  try {
    // Sincronizar el modelo Teacher primero, ya que es la base para las relaciones
    await Teacher.sync();
    // Sincronizar los modelos asociados en orden
    await Education.sync();
    await Experience.sync();
    await Certification.sync();
    await CVArchive.sync();
    await Skill.sync();
    await TeacherSkill.sync();

    console.log("Migraciones completadas exitosamente.");
    process.exit(0);
  } catch (error) {
    console.error("Error durante las migraciones:", error);
    process.exit(1);
  }
}

runMigrations();
