import { Loading } from "../../components/ui/Loading";
import { PlanCard } from "./PlanCard";
import { usePlans } from "./usePlans";

export function PlansPage() {
  const { plans, loading, error } = usePlans();

  if (loading) {
    return <Loading text="Cargando planes..." />;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  // Del más barato al más caro. [...plans] hace una copia: el estado no se toca
  const sortedPlans = [...plans].sort((a, b) => a.monthlyPrice - b.monthlyPrice);

  return (
    <>
      <h1>Entrena a tu ritmo</h1>
      <p>Elige el plan que mejor te encaje. Sin permanencia.</p>
      <div className="grid">
        {sortedPlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </>
  );
}
