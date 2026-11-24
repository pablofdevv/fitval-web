import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { loggedOut } from "../../features/auth/authSlice";
import { useCurrentUser } from "../../features/auth/useCurrentUser";
import { api } from "../../app/api";
import styles from "./Header.module.css";

export function Header() {
  const { user } = useCurrentUser();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(loggedOut());
    dispatch(api.util.resetApiState());
    navigate("/");
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>
          FitVal
        </Link>
        <NavLink to="/" end>
          Planes
        </NavLink>
        <NavLink to="/classes">Clases</NavLink>
        {user?.role === "staff" && <NavLink to="/staff">Panel</NavLink>}
        <span className={styles.spacer} />
        {user ? (
          <>
            <span className={styles.user}>
              {user.email} · {user.role === "staff" ? "staff" : "socio"}
            </span>
            <button
              type="button"
              className={styles.logout}
              onClick={handleLogout}
            >
              Salir
            </button>
          </>
        ) : (
          <NavLink to="/login">Entrar</NavLink>
        )}
      </nav>
    </header>
  );
}
