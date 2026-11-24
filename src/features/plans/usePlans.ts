import { useEffect, useState } from "react";
import type { Plan } from "../../app/types";

// Pide los planes al montar el componente
export function usePlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/plans`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        return response.json();
      })
      .then((data: Plan[]) => {
        setPlans(data);
      })
      .catch(() => {
        setError("No se han podido cargar los planes.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // [] = solo una vez, al abrir la página

  return { plans, loading, error };
}
