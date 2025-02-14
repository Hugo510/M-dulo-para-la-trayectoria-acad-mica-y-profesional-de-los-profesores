import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Correo electrónico inválido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

export const registerSchema = z.object({
  first_name: z.string().nonempty({ message: "Este campo es requerido" }),
  last_name: z.string().nonempty({ message: "Este campo es requerido" }),
  email: z.string().email({ message: "Correo electrónico inválido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  phone: z.string().optional(),
  address: z.string().optional(),
  date_of_birth: z.string().optional(),
});
