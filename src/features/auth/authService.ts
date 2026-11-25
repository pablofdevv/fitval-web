import { getErrorMessage } from "../../app/apiError";

// Login real: POST /auth/login devuelve solo { accessToken }.
// Quién soy se pide después a GET /auth/me
export async function login(email: string, password: string): Promise<string> {
  let response: Response;
  try {
    response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  } catch {
    throw new Error("No se ha podido conectar con la API.");
  }

  const data = await response.json().catch(() => null);
  if (response.status === 401) {
    throw new Error("Correo o contraseña incorrectos.");
  }
  if (!response.ok) {
    throw new Error(getErrorMessage({ data }));
  }
  return (data as { accessToken: string }).accessToken;
}
