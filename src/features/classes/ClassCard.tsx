import { Link } from "react-router-dom";
import { formatDate } from "../../app/format";
import type { GymClass } from "../../app/types";
import { SpotsBadge } from "./SpotsBadge";
import styles from "./ClassCard.module.css";

type ClassCardProps = {
  gymClass: GymClass;
};

export function ClassCard({ gymClass }: ClassCardProps) {
  return (
    <Link to={`/classes/${gymClass.id}`} className={styles.card}>
      <span className={styles.when}>{formatDate(gymClass.startsAt)}</span>
      <div className={styles.info}>
        <span className={styles.activity}>{gymClass.activity}</span>
        <span className={styles.details}>
          {gymClass.room} · con {gymClass.trainerName}
        </span>
      </div>
      <SpotsBadge spots={gymClass.spots} />
    </Link>
  );
}
