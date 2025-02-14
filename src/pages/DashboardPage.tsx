import React from 'react';
import { useAuthStore } from '../store/authStore';

export const DashboardPage = () => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-primary mb-4">
          ¡Bienvenido, {user?.nombre}!
        </h1>
        <p className="text-gray-600">
          Desde aquí podrás gestionar tu información profesional y mantener tu CV actualizado.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-primary mb-3">Estado del CV</h2>
          <p className="text-gray-600">
            Tu CV está completo al 75%. Completa la información faltante para mejorar tu perfil.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-primary mb-3">Certificaciones</h2>
          <p className="text-gray-600">
            Tienes 3 certificaciones registradas. La última actualización fue hace 2 meses.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-primary mb-3">Actividad Reciente</h2>
          <ul className="space-y-2 text-gray-600">
            <li>Actualización de experiencia laboral</li>
            <li>Nueva certificación agregada</li>
            <li>Perfil actualizado</li>
          </ul>
        </div>
      </div>
    </div>
  );
};