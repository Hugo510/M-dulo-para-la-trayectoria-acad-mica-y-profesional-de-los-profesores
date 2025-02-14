import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

interface PerfilForm {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
}

export const PerfilPage = () => {
  const { user } = useAuthStore();
  const { register, handleSubmit, formState: { errors } } = useForm<PerfilForm>({
    defaultValues: {
      nombre: user?.nombre || '',
      email: user?.email || '',
      telefono: '',
      direccion: '',
    }
  });

  const onSubmit = async (data: PerfilForm) => {
    try {
      // TODO: Implementar actualización de perfil
      console.log(data);
      toast.success('Perfil actualizado correctamente');
    } catch (error) {
      toast.error('Error al actualizar el perfil');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-primary mb-6">Mi Perfil</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
            <input
              type="text"
              {...register('nombre', { required: 'Este campo es requerido' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
            {errors.nombre && (
              <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              {...register('email', {
                required: 'Este campo es requerido',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Correo electrónico inválido'
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
            <input
              type="tel"
              {...register('telefono', {
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Teléfono inválido (10 dígitos)'
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
            {errors.telefono && (
              <p className="mt-1 text-sm text-red-600">{errors.telefono.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Dirección</label>
            <textarea
              {...register('direccion')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
};