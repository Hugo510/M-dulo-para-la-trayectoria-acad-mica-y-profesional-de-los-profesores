import { Request, Response } from "express";
import {
  Teacher,
  Education,
  Experience,
  Certification,
  Skill,
} from "../models/index";
import logger from "../config/logger";

/**
 * Obtiene el perfil completo de un maestro incluyendo todas sus entidades relacionadas.
 *
 * @param {Request} req - Objeto de solicitud Express
 * @param {Response} res - Objeto de respuesta Express
 */
export const getTeacherProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Se requiere un ID de maestro" });
    }

    const teacher = await Teacher.findByPk(id, {
      attributes: { exclude: ["password"] }, // Excluimos la contraseña por seguridad
      include: [
        {
          model: Education,
          as: "educations",
          attributes: [
            "education_id",
            "degree",
            "institution",
            "start_date",
            "end_date",
            "additional_info",
          ],
        },
        {
          model: Experience,
          as: "experiences",
          attributes: [
            "experience_id",
            "position",
            "institution",
            "start_date",
            "end_date",
            "description",
          ],
        },
        {
          model: Certification,
          as: "certifications",
          attributes: [
            "certification_id",
            "certification_name",
            "issuing_institution",
            "issue_date",
            "expiration_date",
          ],
        },
        {
          model: Skill,
          as: "skills",
          attributes: ["skill_id", "skill_name"],
          through: {
            attributes: ["level"], // Incluimos el nivel de cada habilidad
          },
        },
        // Podríamos incluir también CVArchive si necesitamos la información del CV
      ],
    });

    if (!teacher) {
      return res.status(404).json({ error: "Maestro no encontrado" });
    }

    return res.status(200).json({
      success: true,
      data: teacher,
    });
  } catch (error: any) {
    // Tipamos el error como 'any' para acceder a sus propiedades
    logger.error("Error al obtener perfil completo del maestro:", error);
    return res.status(500).json({
      error: "Error al procesar la solicitud",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
