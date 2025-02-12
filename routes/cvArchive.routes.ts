// /src/routes/cvArchive.routes.ts
import { Router } from "express";
import cvArchiveController from "../controllers/cvArchive.controller";
import authMiddleware from "../middlewares/auth";
import multer from "multer";

const router = Router();

// Configuración de Multer para almacenamiento local en el directorio "uploads"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

/**
 * @swagger
 * /api/cvArchive/upload:
 *   post:
 *     summary: Subir un archivo de CV
 *     description: Permite a un teacher subir su archivo de CV.
 *     consumes:
 *       - multipart/form-data
 *     responses:
 *       201:
 *         description: Archivo de CV subido correctamente.
 */
router.post(
  "/upload",
  authMiddleware,
  upload.single("cv"),
  cvArchiveController.createCVArchive
);

/**
 * @swagger
 * /api/cvArchive/teacher/{teacherId}:
 *   get:
 *     summary: Obtener archivos de CV por Teacher ID
 *     description: Retorna todos los archivos de CV asociados a un teacher.
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         required: true
 *         description: ID del teacher.
 *     responses:
 *       200:
 *         description: Lista de archivos de CV.
 */
router.get("/teacher/:teacherId", cvArchiveController.getCVArchives);

/**
 * @swagger
 * /api/cvArchive/{id}:
 *   delete:
 *     summary: Eliminar un archivo de CV
 *     description: Elimina un archivo de CV por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del archivo de CV.
 *     responses:
 *       204:
 *         description: Archivo de CV eliminado exitosamente.
 */
router.delete("/:id", authMiddleware, cvArchiveController.deleteCVArchive);

export default router;
