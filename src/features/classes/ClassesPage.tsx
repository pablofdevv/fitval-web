import { useSearchParams } from "react-router-dom";
import { useGetClassesQuery } from "../../app/api";
import { Loading } from "../../components/ui/Loading";
import { ClassCard } from "./ClassCard";
import styles from "./ClassesPage.module.css";

export function ClassesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activity = searchParams.get("activity") ?? "";

  const { data: classes = [], isLoading, isError } = useGetClassesQuery(activity);

  function changeActivity(text: string) {
    setSearchParams(text ? { activity: text } : {});
  }

  return (
    <>
      <div className={styles.toolbar}>
        <h1>Horario de clases</h1>
        <div className={styles.search}>
          <label htmlFor="activity">Buscar actividad</label>
          <input
            id="activity"
            type="text"
            value={activity}
            onChange={(e) => changeActivity(e.target.value)}
          />
        </div>
      </div>

      {isLoading && <Loading text="Cargando clases..." />}
      {isError && <p className="error">No se ha podido conectar con la API.</p>}
      {!isLoading && !isError && classes.length === 0 && (
        <p>No hay clases de «{activity}». Prueba con otra actividad.</p>
      )}

      {!isLoading && !isError && classes.length > 0 && (
        <div className={styles.list}>
          {classes.map((gymClass) => (
            <ClassCard key={gymClass.id} gymClass={gymClass} />
          ))}
        </div>
      )}
    </>
  );
}
