// /models/index.ts

import Teacher from "./Teacher";
import Education from "./Education";
import Experience from "./Experience";
import Certification from "./Certification";
import CVArchive from "./CVArchive";
import Skill from "./Skill";
import TeacherSkill from "./TeacherSkill";

/**
 * Asociación: Un Teacher tiene muchas Education.
 * Cada registro de Education pertenece a un Teacher.
 */
Teacher.hasMany(Education, { foreignKey: "teacher_id", as: "educations" });
Education.belongsTo(Teacher, { foreignKey: "teacher_id", as: "teacher" });

/**
 * Asociación: Un Teacher tiene muchas Experience.
 * Cada registro de Experience pertenece a un Teacher.
 */
Teacher.hasMany(Experience, { foreignKey: "teacher_id", as: "experiences" });
Experience.belongsTo(Teacher, { foreignKey: "teacher_id", as: "teacher" });

/**
 * Asociación: Un Teacher tiene muchas Certification.
 * Cada Certification pertenece a un Teacher.
 */
Teacher.hasMany(Certification, {
  foreignKey: "teacher_id",
  as: "certifications",
});
Certification.belongsTo(Teacher, { foreignKey: "teacher_id", as: "teacher" });

/**
 * Asociación: Un Teacher tiene muchos CVArchive.
 * Cada registro de CVArchive pertenece a un Teacher.
 */
Teacher.hasMany(CVArchive, { foreignKey: "teacher_id", as: "cvArchives" });
CVArchive.belongsTo(Teacher, { foreignKey: "teacher_id", as: "teacher" });

/**
 * Asociación: Relación muchos a muchos entre Teacher y Skill a través de TeacherSkill.
 * Esto permite asociar múltiples habilidades a un teacher y viceversa.
 */
Teacher.belongsToMany(Skill, {
  through: TeacherSkill,
  foreignKey: "teacher_id",
  as: "skills",
});
Skill.belongsToMany(Teacher, {
  through: TeacherSkill,
  foreignKey: "skill_id",
  as: "teachers",
});

export {
  Teacher,
  Education,
  Experience,
  Certification,
  CVArchive,
  Skill,
  TeacherSkill,
};
