import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AddEditCV, { CV } from '@/components/cv/AddEditCV';
import ViewCV from '@/components/cv/ViewCV';
import { FileText, Mail, Plus, Search, Users } from 'lucide-react';
import { useState } from 'react';

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddCV, setShowAddCV] = useState(false);
  const [showViewCV, setShowViewCV] = useState(false);
  const [showEditCV, setShowEditCV] = useState(false);
  const [selectedCV, setSelectedCV] = useState<CV | null>(null);

  // Mock data for demonstration
  const stats = [
    { name: 'Total CVs', value: '48', icon: FileText },
    { name: 'Active Teachers', value: '32', icon: Users },
  ];

  const [cvs, setCVs] = useState([
    {
      id: 1,
      personalInfo: {
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        address: 'Springfield Elementary',
        birthDate: '1990-01-01',
      },
      education: [
        {
          degree: 'Licenciatura en Educación',
          institution: 'Universidad Nacional',
          startYear: '2008',
          endYear: '2012',
        },
      ],
      experience: [
        {
          institution: 'Springfield Elementary',
          position: 'Profesor de Matemáticas',
          startDate: '2012-08-01',
          endDate: '2024-03-15',
          description: 'Profesor de matemáticas para grados 4-6',
        },
      ],
      certifications: [],
      skills: [
        { name: 'Matemáticas', level: 'Avanzado' },
        { name: 'Pedagogía', level: 'Avanzado' },
      ],
    },
  ]);

  const handleSaveCV = (cv: CV) => {
    if (showEditCV && selectedCV) {
      // Actualizar CV existente
      setCVs(cvs.map((c) => (c.id === selectedCV.id ? { ...cv, id: c.id } : c)));
      setShowEditCV(false);
    } else {
      // Agregar nuevo CV
      setCVs([...cvs, { ...cv, id: cvs.length + 1 }]);
      setShowAddCV(false);
    }
    setSelectedCV(null);
  };

  const handleDeleteCV = (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar este CV?')) {
      setCVs(cvs.filter((cv) => cv.id !== id));
    }
  };

  const filteredCVs = cvs.filter((cv) =>
    cv.personalInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cv.personalInfo.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Stats */}
          <div className="mt-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.name}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <stat.icon className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            {stat.name}
                          </dt>
                          <dd className="text-lg font-semibold text-gray-900">
                            {stat.value}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Buscar CVs..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="mt-4 sm:mt-0">
              <Button onClick={() => setShowAddCV(true)}>
                <Plus className="h-5 w-5 mr-2" />
                Agregar Nuevo CV
              </Button>
            </div>
          </div>

          {/* CV List */}
          <div className="mt-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {filteredCVs.map((cv) => (
                  <li key={cv.id}>
                    <div className="px-4 py-4 flex items-center sm:px-6">
                      <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                          <div className="flex text-sm">
                            <p className="font-medium text-blue-600 truncate">
                              {cv.personalInfo.fullName}
                            </p>
                          </div>
                          <div className="mt-2 flex">
                            <div className="flex items-center text-sm text-gray-500">
                              <Mail className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                              <p>{cv.personalInfo.email}</p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex-shrink-0 sm:mt-0">
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedCV(cv);
                                setShowViewCV(true);
                              }}
                            >
                              Ver
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedCV(cv);
                                setShowEditCV(true);
                              }}
                            >
                              Editar
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteCV(cv.id)}
                            >
                              Eliminar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modales */}
      {showAddCV && (
        <AddEditCV onClose={() => setShowAddCV(false)} onSave={handleSaveCV} />
      )}
      {showEditCV && selectedCV && (
        <AddEditCV
          initialData={selectedCV}
          onClose={() => {
            setShowEditCV(false);
            setSelectedCV(null);
          }}
          onSave={handleSaveCV}
        />
      )}
      {showViewCV && selectedCV && (
        <ViewCV
          cv={selectedCV}
          onClose={() => {
            setShowViewCV(false);
            setSelectedCV(null);
          }}
        />
      )}
    </div>
  );
}