import styles from "./SpotsBadge.module.css";

type SpotsBadgeProps = {
  spots: number;
};

export function SpotsBadge({ spots }: SpotsBadgeProps) {
  const className =
    spots <= 3 ? `${styles.badge} ${styles.few}` : styles.badge;

  return <span className={className}>{spots} plazas</span>;
}
