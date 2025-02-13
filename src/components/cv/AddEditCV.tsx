import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

interface Education {
  degree: string;
  institution: string;
  startYear: string;
  endYear: string;
}

interface Experience {
  institution: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Certification {
  name: string;
  institution: string;
  date: string;
}

interface Skill {
  name: string;
  level: 'Básico' | 'Intermedio' | 'Avanzado';
}

export interface CV {
  id?: number;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    birthDate: string;
  };
  education: Education[];
  experience: Experience[];
  certifications: Certification[];
  skills: Skill[];
}

interface AddEditCVProps {
  initialData?: CV;
  onClose: () => void;
  onSave: (cv: CV) => void;
}

export default function AddEditCV({ initialData, onClose, onSave }: AddEditCVProps) {
  const [cv, setCV] = useState<CV>(
    initialData || {
      personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        address: '',
        birthDate: '',
      },
      education: [],
      experience: [],
      certifications: [],
      skills: [],
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(cv);
  };

  const addEducation = () => {
    setCV({
      ...cv,
      education: [
        ...cv.education,
        { degree: '', institution: '', startYear: '', endYear: '' },
      ],
    });
  };

  const addExperience = () => {
    setCV({
      ...cv,
      experience: [
        ...cv.experience,
        {
          institution: '',
          position: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    });
  };

  const addCertification = () => {
    setCV({
      ...cv,
      certifications: [
        ...cv.certifications,
        { name: '', institution: '', date: '' },
      ],
    });
  };

  const addSkill = () => {
    setCV({
      ...cv,
      skills: [...cv.skills, { name: '', level: 'Básico' }],
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {initialData ? 'Editar CV' : 'Nuevo CV'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Información Personal */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Información Personal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre Completo
                </label>
                <Input
                  value={cv.personalInfo.fullName}
                  onChange={(e) =>
                    setCV({
                      ...cv,
                      personalInfo: { ...cv.personalInfo, fullName: e.target.value },
                    })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Correo Electrónico
                </label>
                <Input
                  type="email"
                  value={cv.personalInfo.email}
                  onChange={(e) =>
                    setCV({
                      ...cv,
                      personalInfo: { ...cv.personalInfo, email: e.target.value },
                    })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Teléfono
                </label>
                <Input
                  type="tel"
                  value={cv.personalInfo.phone}
                  onChange={(e) =>
                    setCV({
                      ...cv,
                      personalInfo: { ...cv.personalInfo, phone: e.target.value },
                    })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Dirección
                </label>
                <Input
                  value={cv.personalInfo.address}
                  onChange={(e) =>
                    setCV({
                      ...cv,
                      personalInfo: { ...cv.personalInfo, address: e.target.value },
                    })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fecha de Nacimiento
                </label>
                <Input
                  type="date"
                  value={cv.personalInfo.birthDate}
                  onChange={(e) =>
                    setCV({
                      ...cv,
                      personalInfo: { ...cv.personalInfo, birthDate: e.target.value },
                    })
                  }
                  required
                />
              </div>
            </div>
          </section>

          {/* Educación */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Formación Académica</h3>
              <Button type="button" onClick={addEducation} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Educación
              </Button>
            </div>
            {cv.education.map((edu, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border rounded">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Grado Académico
                  </label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => {
                      const newEducation = [...cv.education];
                      newEducation[index].degree = e.target.value;
                      setCV({ ...cv, education: newEducation });
                    }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Institución
                  </label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => {
                      const newEducation = [...cv.education];
                      newEducation[index].institution = e.target.value;
                      setCV({ ...cv, education: newEducation });
                    }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Año de Inicio
                  </label>
                  <Input
                    type="number"
                    value={edu.startYear}
                    onChange={(e) => {
                      const newEducation = [...cv.education];
                      newEducation[index].startYear = e.target.value;
                      setCV({ ...cv, education: newEducation });
                    }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Año de Finalización
                  </label>
                  <Input
                    type="number"
                    value={edu.endYear}
                    onChange={(e) => {
                      const newEducation = [...cv.education];
                      newEducation[index].endYear = e.target.value;
                      setCV({ ...cv, education: newEducation });
                    }}
                    required
                  />
                </div>
              </div>
            ))}
          </section>

          {/* Experiencia Laboral */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Experiencia Laboral</h3>
              <Button type="button" onClick={addExperience} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Experiencia
              </Button>
            </div>
            {cv.experience.map((exp, index) => (
              <div key={index} className="grid grid-cols-1 gap-4 mb-4 p-4 border rounded">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Institución
                  </label>
                  <Input
                    value={exp.institution}
                    onChange={(e) => {
                      const newExperience = [...cv.experience];
                      newExperience[index].institution = e.target.value;
                      setCV({ ...cv, experience: newExperience });
                    }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Cargo
                  </label>
                  <Input
                    value={exp.position}
                    onChange={(e) => {
                      const newExperience = [...cv.experience];
                      newExperience[index].position = e.target.value;
                      setCV({ ...cv, experience: newExperience });
                    }}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Fecha de Inicio
                    </label>
                    <Input
                      type="date"
                      value={exp.startDate}
                      onChange={(e) => {
                        const newExperience = [...cv.experience];
                        newExperience[index].startDate = e.target.value;
                        setCV({ ...cv, experience: newExperience });
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Fecha de Fin
                    </label>
                    <Input
                      type="date"
                      value={exp.endDate}
                      onChange={(e) => {
                        const newExperience = [...cv.experience];
                        newExperience[index].endDate = e.target.value;
                        setCV({ ...cv, experience: newExperience });
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Descripción
                  </label>
                  <textarea
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={3}
                    value={exp.description}
                    onChange={(e) => {
                      const newExperience = [...cv.experience];
                      newExperience[index].description = e.target.value;
                      setCV({ ...cv, experience: newExperience });
                    }}
                    required
                  />
                </div>
              </div>
            ))}
          </section>

          {/* Certificaciones */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Certificaciones</h3>
              <Button type="button" onClick={addCertification} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Certificación
              </Button>
            </div>
            {cv.certifications.map((cert, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 border rounded">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre
                  </label>
                  <Input
                    value={cert.name}
                    onChange={(e) => {
                      const newCertifications = [...cv.certifications];
                      newCertifications[index].name = e.target.value;
                      setCV({ ...cv, certifications: newCertifications });
                    }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Institución
                  </label>
                  <Input
                    value={cert.institution}
                    onChange={(e) => {
                      const newCertifications = [...cv.certifications];
                      newCertifications[index].institution = e.target.value;
                      setCV({ ...cv, certifications: newCertifications });
                    }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Fecha
                  </label>
                  <Input
                    type="date"
                    value={cert.date}
                    onChange={(e) => {
                      const newCertifications = [...cv.certifications];
                      newCertifications[index].date = e.target.value;
                      setCV({ ...cv, certifications: newCertifications });
                    }}
                    required
                  />
                </div>
              </div>
            ))}
          </section>

          {/* Habilidades */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Habilidades</h3>
              <Button type="button" onClick={addSkill} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Habilidad
              </Button>
            </div>
            {cv.skills.map((skill, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border rounded">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Habilidad
                  </label>
                  <Input
                    value={skill.name}
                    onChange={(e) => {
                      const newSkills = [...cv.skills];
                      newSkills[index].name = e.target.value;
                      setCV({ ...cv, skills: newSkills });
                    }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nivel
                  </label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={skill.level}
                    onChange={(e) => {
                      const newSkills = [...cv.skills];
                      newSkills[index].level = e.target.value as 'Básico' | 'Intermedio' | 'Avanzado';
                      setCV({ ...cv, skills: newSkills });
                    }}
                    required
                  >
                    <option value="Básico">Básico</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                  </select>
                </div>
              </div>
            ))}
          </section>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Guardar CV</Button>
          </div>
        </form>
      </div>
    </div>
  );
}