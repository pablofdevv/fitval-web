import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { loggedIn } from "./authSlice";
import { login } from "./authService";
import { useLazyGetMeQuery } from "../../app/api";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [getMe] = useLazyGetMeQuery();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("Escribe el correo y la contraseña.");
      return;
    }

    setSending(true);
    setError(null);

    try {
      const token = await login(email, password);
      dispatch(loggedIn(token));
      const user = await getMe(token).unwrap();

      if (user.role === "staff") {
        navigate("/staff", { replace: true });
      } else {
        navigate("/classes", { replace: true });
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Entrar</h1>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      <label htmlFor="email">Correo</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="username"
      />
      <label htmlFor="password">Contraseña</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
      />
      <button type="submit" disabled={sending}>
        {sending ? "Entrando..." : "Entrar"}
      </button>

      <p>
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </form>
  );
}
