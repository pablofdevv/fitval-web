// Formatos en español (se copian tal cual)

// 29.9 → "29,90 €"
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(price);
}

// "2026-11-02T09:00:00.000Z" → "lun, 2 nov, 10:00" (en la hora de tu ordenador)
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("es-ES", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
