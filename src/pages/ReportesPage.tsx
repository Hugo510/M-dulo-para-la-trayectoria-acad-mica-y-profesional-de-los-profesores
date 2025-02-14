import React, { useState } from 'react';
import { BarChart, PieChart, LineChart } from 'lucide-react';

export const ReportesPage = () => {
  const [reportType, setReportType] = useState('general');

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-primary mb-6">Reportes y Estadísticas</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => setReportType('general')}
            className={`p-4 rounded-lg border ${
              reportType === 'general'
                ? 'border-primary bg-primary-lighter text-primary'
                : 'border-gray-200 hover:border-primary-light'
            } flex items-center justify-center gap-2`}
          >
            <BarChart size={20} />
            <span>Estadísticas Generales</span>
          </button>

          <button
            onClick={() => setReportType('areas')}
            className={`p-4 rounded-lg border ${
              reportType === 'areas'
                ? 'border-primary bg-primary-lighter text-primary'
                : 'border-gray-200 hover:border-primary-light'
            } flex items-center justify-center gap-2`}
          >
            <PieChart size={20} />
            <span>Distribución por Áreas</span>
          </button>

          <button
            onClick={() => setReportType('tendencias')}
            className={`p-4 rounded-lg border ${
              reportType === 'tendencias'
                ? 'border-primary bg-primary-lighter text-primary'
                : 'border-gray-200 hover:border-primary-light'
            } flex items-center justify-center gap-2`}
          >
            <LineChart size={20} />
            <span>Tendencias</span>
          </button>
        </div>

        {reportType === 'general' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Total de Docentes</h3>
              <p className="text-3xl font-bold text-primary">150</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">CVs Actualizados</h3>
              <p className="text-3xl font-bold text-primary">85%</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Certificaciones</h3>
              <p className="text-3xl font-bold text-primary">324</p>
            </div>
          </div>
        )}

        {reportType === 'areas' && (
          <div className="text-center py-8 text-gray-500">
            Visualización de distribución por áreas en desarrollo
          </div>
        )}

        {reportType === 'tendencias' && (
          <div className="text-center py-8 text-gray-500">
            Visualización de tendencias en desarrollo
          </div>
        )}
      </div>
    </div>
  );
};