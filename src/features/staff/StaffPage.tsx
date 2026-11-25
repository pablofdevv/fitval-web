import { useState } from "react";
import { useDeleteClassMutation, useGetClassesQuery } from "../../app/api";
import { getErrorMessage } from "../../app/apiError";
import { formatDate } from "../../app/format";
import type { GymClass } from "../../app/types";
import { Loading } from "../../components/ui/Loading";
import { CreateClassForm } from "./CreateClassForm";
import styles from "./StaffPage.module.css";

export function StaffPage() {
  const { data: classes = [], isLoading } = useGetClassesQuery(""); // "" = todas
  const [deleteClass] = useDeleteClassMutation();
  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function remove(gymClass: GymClass) {
    setDeleteError(null);
    try {
      await deleteClass(gymClass.id).unwrap();
    } catch (error) {
      // Con tu API: 409 si la clase tiene reservas
      setDeleteError(`«${gymClass.activity}»: ${getErrorMessage(error)}`);
    }
  }

  return (
    <>
      <h1>Panel del personal</h1>
      <div className={styles.layout}>
        <CreateClassForm />
        <div className={styles.table}>
          {deleteError && (
            <p className="error" role="alert">
              {deleteError}
            </p>
          )}
          {isLoading ? (
            <Loading text="Cargando clases..." />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Actividad</th>
                  <th>Día y hora</th>
                  <th>Sala</th>
                  <th>Plazas</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {classes.map((gymClass) => (
                  <tr key={gymClass.id}>
                    <td>{gymClass.activity}</td>
                    <td>{formatDate(gymClass.startsAt)}</td>
                    <td>{gymClass.room}</td>
                    <td>{gymClass.spots}</td>
                    <td>
                      <button
                        type="button"
                        className={styles.delete}
                        onClick={() => remove(gymClass)}
                      >
                        Borrar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
