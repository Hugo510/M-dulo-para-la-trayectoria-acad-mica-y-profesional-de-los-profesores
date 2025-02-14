import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../schemas/authSchemas';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

interface RegisterForm {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    date_of_birth?: string;
}

export const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema)
    });
    const navigate = useNavigate();
    const registerUser = useAuthStore(state => state.register);

    const onSubmit = async (data: RegisterForm) => {
        try {
            await registerUser(data);
            toast.success('Registro exitoso');
            navigate('/login');
        } catch (error) {
            toast.error('Error al registrar el usuario' + error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-primary">Registro de Usuario</h2>
                    <p className="text-gray-600 mt-2">Crea tu cuenta</p>
                </div>

                <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Nombres
                            </label>
                            <input
                                type="text"
                                {...register('first_name', { required: 'Este campo es requerido' })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary"
                            />
                            {errors.first_name && (
                                <p className="mt-1 text-sm text-red-600">{errors.first_name.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Apellidos
                            </label>
                            <input
                                type="text"
                                {...register('last_name', { required: 'Este campo es requerido' })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary"
                            />
                            {errors.last_name && (
                                <p className="mt-1 text-sm text-red-600">{errors.last_name.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                {...register('email', {
                                    required: 'Este campo es requerido',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Correo inválido'
                                    }
                                })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Teléfono (opcional)
                            </label>
                            <input
                                type="text"
                                {...register('phone')}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Dirección (opcional)
                            </label>
                            <input
                                type="text"
                                {...register('address')}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Fecha de Nacimiento (opcional)
                            </label>
                            <input
                                type="date"
                                {...register('date_of_birth')}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                {...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: {
                                        value: 6,
                                        message: 'La contraseña debe tener al menos 6 caracteres'
                                    }
                                })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Registrarse
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
