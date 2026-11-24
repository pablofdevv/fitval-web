// Saca un texto legible de un error de la API (se copia tal cual).
// NestJS responde { message: "texto" } o { message: ["texto 1", "texto 2"] }
export function getErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: string | string[] } }).data;
    if (Array.isArray(data?.message)) return data.message.join(". ");
    if (data?.message) return data.message;
  }
  return "No se ha podido conectar con la API.";
}
