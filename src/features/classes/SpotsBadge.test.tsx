import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SpotsBadge } from "./SpotsBadge";
import styles from "./SpotsBadge.module.css";

describe("SpotsBadge", () => {
  it("muestra las plazas", () => {
    render(<SpotsBadge spots={12} />);

    expect(screen.getByText("12 plazas")).toBeInTheDocument();
  });

  it("con 3 plazas, se pone naranja (clase few)", () => {
    render(<SpotsBadge spots={3} />);

    expect(screen.getByText("3 plazas")).toHaveClass(styles.few);
  });

  it("con 4 plazas, no", () => {
    render(<SpotsBadge spots={4} />);

    expect(screen.getByText("4 plazas")).not.toHaveClass(styles.few);
  });
});
