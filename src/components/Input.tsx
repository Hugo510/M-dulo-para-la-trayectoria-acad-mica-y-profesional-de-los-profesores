import { UseFormRegister, FieldValues, FieldErrors, RegisterOptions, Path } from 'react-hook-form';

interface InputProps<T extends FieldValues> {
    id: string;
    type: string;
    register: UseFormRegister<T>;
    name: Path<T>;
    errors: FieldErrors<T>;
    validation?: RegisterOptions<T>;
}

export const Input = <T extends FieldValues>({
    id,
    type,
    register,
    name,
    errors,
    validation
}: InputProps<T>) => {
    return (
        <div>
            <input
                id={id}
                type={type}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                {...register(name, validation)}
            />
            {errors[name] && (
                <p className="mt-1 text-sm text-red-600">{String(errors[name]?.message)}</p>
            )}
        </div>
    );
};
