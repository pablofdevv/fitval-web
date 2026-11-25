import "@testing-library/jest-dom/vitest"; // añade comprobaciones como toBeInTheDocument()
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Después de cada test, borra lo que ha pintado
afterEach(() => {
  cleanup();
});
