import React, { useState } from 'react';

export const BusquedaPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    area: '',
    nivelAcademico: '',
    experiencia: '',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar búsqueda
    console.log({ searchTerm, filters });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-primary mb-6">Búsqueda de CVs</h1>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, habilidades, certificaciones..."
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Buscar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={filters.area}
              onChange={(e) => setFilters({ ...filters, area: e.target.value })}
              className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            >
              <option value="">Área de Especialidad</option>
              <option value="sistemas">Sistemas</option>
              <option value="mecatronica">Mecatrónica</option>
              <option value="industrial">Industrial</option>
            </select>

            <select
              value={filters.nivelAcademico}
              onChange={(e) => setFilters({ ...filters, nivelAcademico: e.target.value })}
              className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            >
              <option value="">Nivel Académico</option>
              <option value="licenciatura">Licenciatura</option>
              <option value="maestria">Maestría</option>
              <option value="doctorado">Doctorado</option>
            </select>

            <select
              value={filters.experiencia}
              onChange={(e) => setFilters({ ...filters, experiencia: e.target.value })}
              className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            >
              <option value="">Años de Experiencia</option>
              <option value="0-2">0-2 años</option>
              <option value="3-5">3-5 años</option>
              <option value="5+">Más de 5 años</option>
            </select>
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-primary mb-4">Resultados</h2>
        <div className="text-gray-500 text-center py-8">
          Ingresa un término de búsqueda para ver resultados
        </div>
      </div>
    </div>
  );
};