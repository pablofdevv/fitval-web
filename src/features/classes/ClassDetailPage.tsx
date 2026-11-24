import { Link, useParams } from "react-router-dom";
import { useGetClassQuery } from "../../app/api";
import { formatDate } from "../../app/format";
import { Loading } from "../../components/ui/Loading";
import { SpotsBadge } from "./SpotsBadge";

export function ClassDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: gymClass, isLoading, isError } = useGetClassQuery(id ?? "");

  if (isLoading) {
    return <Loading text="Cargando clase..." />;
  }

  if (isError || !gymClass) {
    return (
      <>
        <p className="error">Esa clase no existe.</p>
        <p>
          <Link to="/classes">Volver al horario</Link>
        </p>
      </>
    );
  }

  return (
    <>
      <p>
        <Link to="/classes">← Volver al horario</Link>
      </p>

      <h1>{gymClass.activity}</h1>
      <p>
        <SpotsBadge spots={gymClass.spots} />
      </p>
      <p>
        <strong>Cuándo:</strong> {formatDate(gymClass.startsAt)}
      </p>
      <p>
        <strong>Sala:</strong> {gymClass.room}
      </p>
      <p>
        <strong>Monitor:</strong> {gymClass.trainerName}
      </p>
    </>
  );
}
