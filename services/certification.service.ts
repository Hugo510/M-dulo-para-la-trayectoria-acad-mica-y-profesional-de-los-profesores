// /src/services/certification.service.ts
import Certification, {
  CertificationCreationAttributes,
  CertificationAttributes,
} from "../models/Certification";

class CertificationService {
  async createCertification(
    data: CertificationCreationAttributes
  ): Promise<Certification> {
    return Certification.create(data);
  }

  async getCertificationsByTeacherId(
    teacherId: number
  ): Promise<Certification[]> {
    return Certification.findAll({ where: { teacher_id: teacherId } });
  }

  async updateCertification(
    id: number,
    data: Partial<CertificationAttributes>
  ): Promise<number> {
    const [affectedCount] = await Certification.update(data, {
      where: { certification_id: id },
    });
    return affectedCount;
  }

  async deleteCertification(id: number): Promise<number> {
    return Certification.destroy({ where: { certification_id: id } });
  }
}

export default new CertificationService();
