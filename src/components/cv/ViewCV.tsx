import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { CV } from './AddEditCV';

interface ViewCVProps {
  cv: CV;
  onClose: () => void;
}

export default function ViewCV({ cv, onClose }: ViewCVProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">CV de {cv.personalInfo.fullName}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-8">
          {/* Información Personal */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Información Personal</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Correo Electrónico</p>
                <p>{cv.personalInfo.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Teléfono</p>
                <p>{cv.personalInfo.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Dirección</p>
                <p>{cv.personalInfo.address}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Fecha de Nacimiento</p>
                <p>{new Date(cv.personalInfo.birthDate).toLocaleDateString()}</p>
              </div>
            </div>
          </section>

          {/* Educación */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Formación Académica</h3>
            <div className="space-y-4">
              {cv.education.map((edu, index) => (
                <div key={index} className="p-4 border rounded">
                  <h4 className="font-medium">{edu.degree}</h4>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-500">
                    {edu.startYear} - {edu.endYear}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Experiencia */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Experiencia Laboral</h3>
            <div className="space-y-4">
              {cv.experience.map((exp, index) => (
                <div key={index} className="p-4 border rounded">
                  <h4 className="font-medium">{exp.position}</h4>
                  <p className="text-gray-600">{exp.institution}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(exp.startDate).toLocaleDateString()} -{' '}
                    {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Presente'}
                  </p>
                  <p className="mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Certificaciones */}
          {cv.certifications.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold mb-4">Certificaciones</h3>
              <div className="space-y-4">
                {cv.certifications.map((cert, index) => (
                  <div key={index} className="p-4 border rounded">
                    <h4 className="font-medium">{cert.name}</h4>
                    <p className="text-gray-600">{cert.institution}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(cert.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Habilidades */}
          {cv.skills.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold mb-4">Habilidades</h3>
              <div className="grid grid-cols-2 gap-4">
                {cv.skills.map((skill, index) => (
                  <div key={index} className="p-4 border rounded">
                    <h4 className="font-medium">{skill.name}</h4>
                    <p className="text-sm text-gray-500">{skill.level}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="mt-8 flex justify-end">
          <Button onClick={onClose}>Cerrar</Button>
        </div>
      </div>
    </div>
  );
}