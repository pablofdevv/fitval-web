import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../../app/api";
import { getErrorMessage } from "../../app/apiError";

// Las reglas del formulario: las mismas que pondrá el RegisterDto de tu API
const registerSchema = z.object({
  email: z.string().email("Escribe un correo válido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

type RegisterForm = z.infer<typeof registerSchema>; // el tipo sale de las reglas

export function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [apiError, setApiError] = useState<string | null>(null);
  const [createdEmail, setCreatedEmail] = useState<string | null>(null);

  // Solo se llama si Zod da el visto bueno
  async function onSubmit(data: RegisterForm) {
    setApiError(null);
    try {
      const user = await registerUser(data).unwrap(); // unwrap: si la API falla, lanza el error
      setCreatedEmail(user.email);
    } catch (error) {
      setApiError(getErrorMessage(error));
    }
  }

  // Cuenta creada: ya no se enseña el formulario
  if (createdEmail) {
    return (
      <p>
        Cuenta creada para {createdEmail}. Ya puedes <Link to="/login">entrar</Link>.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Crear cuenta</h1>
      {apiError && (
        <p className="error" role="alert">
          {apiError}
        </p>
      )}
      <label htmlFor="email">Correo</label>
      <input id="email" type="email" {...register("email")} />
      {errors.email && <p className="field-error">{errors.email.message}</p>}
      <label htmlFor="password">Contraseña</label>
      <input id="password" type="password" {...register("password")} />
      {errors.password && (
        <p className="field-error">{errors.password.message}</p>
      )}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Creando..." : "Crear cuenta"}
      </button>
    </form>
  );
}
