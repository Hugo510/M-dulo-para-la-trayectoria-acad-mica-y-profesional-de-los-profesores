import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import type { CV } from '../types';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const cvPersonalSchema = z.object({
  nombre: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  apellidos: z.string().min(2, { message: 'El apellido debe tener al menos 2 caracteres' }),
  email: z.string().email({ message: 'Correo electrónico inválido' }),
  telefono: z.string().optional(),
  direccion: z.string().optional(),
});

type CVPersonalForm = z.infer<typeof cvPersonalSchema>;

export const CVPage = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const { register, handleSubmit, formState: { errors } } = useForm<CVPersonalForm>({
    resolver: zodResolver(cvPersonalSchema)
  });

  const onSubmit = async (data: CVPersonalForm) => {
    try {
      // TODO: Implementar guardado de CV
      console.log(data);
      toast.success('Información guardada correctamente');
    } catch (error) {
      toast.error('Error al guardar la información');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('personal')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'personal'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Datos Personales
            </button>
            <button
              onClick={() => setActiveTab('formacion')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'formacion'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Formación Académica
            </button>
            <button
              onClick={() => setActiveTab('experiencia')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'experiencia'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Experiencia Profesional
            </button>
            <button
              onClick={() => setActiveTab('certificaciones')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'certificaciones'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Certificaciones
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'personal' && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="nombre">Nombre(s)</Label>
                  <Input
                    id="nombre"
                    type="text"
                    register={register}
                    name="nombre"
                    errors={errors}
                    validation={{ required: 'Este campo es requerido' }}
                  />
                </div>

                <div>
                  <Label htmlFor="apellidos">Apellidos</Label>
                  <Input
                    id="apellidos"
                    type="text"
                    register={register}
                    name="apellidos"
                    errors={errors}
                    validation={{ required: 'Este campo es requerido' }}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  register={register}
                  name="email"
                  errors={errors}
                  validation={{
                    required: 'Este campo es requerido',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Correo electrónico inválido'
                    }
                  }}
                />
              </div>

              <div>
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  type="tel"
                  register={register}
                  name="telefono"
                  errors={errors}
                  validation={{
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Teléfono inválido (10 dígitos)'
                    }
                  }}
                />
              </div>

              <div>
                <Label htmlFor="direccion">Dirección</Label>
                <textarea
                  id="direccion"
                  {...register('direccion')}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Guardar Cambios
              </button>
            </form>
          )}

          {/* TODO: Implementar los demás tabs */}
          {activeTab === 'formacion' && (
            <div className="text-center py-8 text-gray-500">
              Sección de Formación Académica en desarrollo
            </div>
          )}

          {activeTab === 'experiencia' && (
            <div className="text-center py-8 text-gray-500">
              Sección de Experiencia Profesional en desarrollo
            </div>
          )}

          {activeTab === 'certificaciones' && (
            <div className="text-center py-8 text-gray-500">
              Sección de Certificaciones en desarrollo
            </div>
          )}
        </div>
      </div>
    </div>
  );
};