import { Link } from "react-router-dom";
import { formatPrice } from "../../app/format";
import type { Plan } from "../../app/types";
import styles from "./PlanCard.module.css";

type PlanCardProps = {
  plan: Plan;
};

export function PlanCard({ plan }: PlanCardProps) {
  return (
    <article className={styles.card}>
      <span className={styles.name}>{plan.name}</span>
      <span className={styles.price}>
        {formatPrice(plan.monthlyPrice)}
        <span className={styles.month}> /mes</span>
      </span>
      <Link to="/classes">Ver clases</Link>
    </article>
  );
}
