// /src/services/cvArchive.service.ts
import CVArchive, { CVArchiveCreationAttributes } from "../models/CVArchive";

class CVArchiveService {
  async createCVArchive(data: CVArchiveCreationAttributes): Promise<CVArchive> {
    return CVArchive.create(data);
  }

  async getCVArchivesByTeacherId(teacherId: number): Promise<CVArchive[]> {
    return CVArchive.findAll({ where: { teacher_id: teacherId } });
  }

  async deleteCVArchive(cvId: number): Promise<number> {
    return CVArchive.destroy({ where: { cv_id: cvId } });
  }
}

export default new CVArchiveService();
