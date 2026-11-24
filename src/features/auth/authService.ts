import type { User } from "../../app/types";

type StoredUser = User & { password: string }; // como está en db.json

// Login FALSO: json-server no sabe hacer login.
// En la Parte 5 lo cambiarás por el de tu API (POST /auth/login).
// Solo devuelve el token: el usuario se pide después a "/me"
export async function login(email: string, password: string): Promise<string> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users?email=${encodeURIComponent(email)}`
  );
  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }
  const users: StoredUser[] = await response.json();

  const found = users.find((u) => u.password === password);
  if (!found) {
    throw new Error("Correo o contraseña incorrectos.");
  }

  return `token-fake-${found.id}`;
}
