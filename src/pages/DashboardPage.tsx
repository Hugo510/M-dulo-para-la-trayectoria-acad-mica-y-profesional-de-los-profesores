import { useAuthStore } from '../store/authStore';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];

const barData = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const lineData = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Dataset 2',
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export const DashboardPage = () => {
  const { user } = useAuthStore();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16 bg-gray-50 animate-fadeIn">
      {/* Tarjeta de bienvenida utilizando la paleta de colores */}
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-primary-lighter via-secondary-light to-primary p-10 rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-110 hover:rotate-3">
          <h1 className="text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
            ¡Bienvenido, {user?.first_name}!
          </h1>
          <p className="text-white text-lg drop-shadow">
            Administra tu información profesional y mantén tu CV siempre actualizado con estilo.
          </p>
        </div>

        {/* Grid de tarjetas con animaciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-110 hover:rotate-3 hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-primary mb-3">Estado del CV</h2>
            <p className="text-gray-600">
              Tu CV está completo al 75%. ¡Actualiza para lograr la perfección!
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-110 hover:rotate-3 hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-primary mb-3">Certificaciones</h2>
            <p className="text-gray-600">
              Tienes 3 certificaciones registradas. ¡Sigue obteniendo más!
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-110 hover:rotate-3 hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-primary mb-3">Actividad Reciente</h2>
            <ul className="space-y-2 text-gray-600">
              <li>Actualización de experiencia laboral</li>
              <li>Nueva certificación agregada</li>
              <li>Perfil actualizado</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sección de gráficas con efectos utilizando la paleta */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-primary mb-6">Información Adicional</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-110 hover:rotate-3 hover:shadow-2xl">
            <h3 className="text-2xl font-bold text-primary mb-3">Progreso del CV</h3>
            <div className="w-full h-64 bg-gradient-to-br from-white to-gray-100 p-4 rounded-xl transition-all duration-500 hover:scale-105">
              <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-110 hover:rotate-3 hover:shadow-2xl">
            <h3 className="text-2xl font-bold text-primary mb-3">Estadísticas Generales</h3>
            <div className="w-full h-64 bg-gradient-to-br from-white to-gray-100 p-4 rounded-xl transition-all duration-500 hover:scale-105">
              <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};