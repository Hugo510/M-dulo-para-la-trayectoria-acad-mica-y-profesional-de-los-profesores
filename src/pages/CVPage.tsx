import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import type { CV } from '../types';

export const CVPage = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const { register, handleSubmit, formState: { errors } } = useForm<CV['datosPersonales']>();

  const onSubmit = async (data: CV['datosPersonales']) => {
    try {
      // TODO: Implementar guardado de CV
      console.log(data);
      toast.success('Información guardada correctamente');
    } catch (error) {
      toast.error('Error al guardar la información');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('personal')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'personal'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Datos Personales
            </button>
            <button
              onClick={() => setActiveTab('formacion')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'formacion'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Formación Académica
            </button>
            <button
              onClick={() => setActiveTab('experiencia')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'experiencia'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Experiencia Profesional
            </button>
            <button
              onClick={() => setActiveTab('certificaciones')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'certificaciones'
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
                  <label className="block text-sm font-medium text-gray-700">Nombre(s)</label>
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
                  <label className="block text-sm font-medium text-gray-700">Apellidos</label>
                  <input
                    type="text"
                    {...register('apellidos', { required: 'Este campo es requerido' })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  />
                  {errors.apellidos && (
                    <p className="mt-1 text-sm text-red-600">{errors.apellidos.message}</p>
                  )}
                </div>
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