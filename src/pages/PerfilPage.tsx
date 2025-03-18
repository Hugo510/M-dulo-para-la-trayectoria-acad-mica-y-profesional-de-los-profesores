import { useEffect } from "react";
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserStore } from "../store/userStore";

const perfilSchema = z.object({
  first_name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  last_name: z.string().min(2, { message: 'El apellido debe tener al menos 2 caracteres' }),
  email: z.string().email({ message: 'Correo electrónico inválido' }),
  phone: z.string().optional(),
  address: z.string().optional(),
});

type PerfilForm = z.infer<typeof perfilSchema>;

export const PerfilPage = () => {
  const { user } = useAuthStore();
  const { profile, loading, error, fetchProfile, updateProfile } = useUserStore();
  const { register, handleSubmit, formState: { errors } } = useForm<PerfilForm>({
    resolver: zodResolver(perfilSchema),
    defaultValues: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
    }
  });

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const onSubmit = async (data: PerfilForm) => {
    try {
      await updateProfile(data);
      toast.success('Perfil actualizado correctamente');
    } catch {
      toast.error('Error al actualizar el perfil');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-primary mb-8">Mi Perfil</h1>

        {loading ? (
          <p>Cargando perfil...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : profile ? (
          <div>
            <h1>{profile.first_name} {profile.last_name}</h1>
            <p>Email: {profile.email}</p>
            {/* ...otros campos... */}
          </div>
        ) : (
          <p>No se encontró el perfil</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="first_name">Nombre</Label>
            <Input
              id="first_name"
              type="text"
              register={register}
              name="first_name"
              errors={errors}
              validation={{
                required: 'Este campo es requerido',
                minLength: {
                  value: 2,
                  message: 'El nombre debe tener al menos 2 caracteres'
                }
              }}
            />
          </div>
          <div>
            <Label htmlFor="last_name">Apellido</Label>
            <Input
              id="last_name"
              type="text"
              register={register}
              name="last_name"
              errors={errors}
              validation={{
                required: 'Este campo es requerido',
                minLength: {
                  value: 2,
                  message: 'El apellido debe tener al menos 2 caracteres'
                }
              }}
            />
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
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              type="tel"
              register={register}
              name="phone"
              errors={errors}
            />
          </div>

          <div>
            <Label htmlFor="address">Dirección</Label>
            <textarea
              id="address"
              {...register('address')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};