import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateClassMutation } from "../../app/api";
import { getErrorMessage } from "../../app/apiError";
import { TRAINERS } from "../../app/trainers";
import styles from "./StaffPage.module.css";

const classSchema = z.object({
  activity: z.string().trim().min(1, "Escribe la actividad"),
  room: z.string().trim().min(1, "Escribe la sala"),
  startsAt: z.string().min(1, "Elige el día y la hora"),
  spots: z
    .number({ invalid_type_error: "Escribe un número" })
    .int()
    .min(1, "Al menos 1 plaza"),
  trainerId: z
    .number({ invalid_type_error: "Elige un monitor" })
    .int()
    .min(1, "Elige un monitor"),
});

type ClassForm = z.infer<typeof classSchema>;

export function CreateClassForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClassForm>({ resolver: zodResolver(classSchema) });
  const [createClass, { isLoading }] = useCreateClassMutation();
  const [apiError, setApiError] = useState<string | null>(null);

  async function onSubmit(data: ClassForm) {
    setApiError(null);
    try {
      await createClass({
        ...data,
        // datetime-local da "2026-11-20T18:00" (hora local, sin zona).
        // toISOString() lo pasa a UTC con zona
        startsAt: new Date(data.startsAt).toISOString(),
      }).unwrap();
      reset();
    } catch (error) {
      setApiError(getErrorMessage(error));
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>Nueva clase</h2>
      {apiError && (
        <p className="error" role="alert">
          {apiError}
        </p>
      )}
      <label htmlFor="activity">Actividad</label>
      <input id="activity" {...register("activity")} />
      {errors.activity && <p className="field-error">{errors.activity.message}</p>}

      <label htmlFor="room">Sala</label>
      <input id="room" {...register("room")} />
      {errors.room && <p className="field-error">{errors.room.message}</p>}

      <label htmlFor="startsAt">Día y hora</label>
      <input id="startsAt" type="datetime-local" {...register("startsAt")} />
      {errors.startsAt && <p className="field-error">{errors.startsAt.message}</p>}

      <label htmlFor="spots">Plazas</label>
      <input id="spots" type="number" {...register("spots", { valueAsNumber: true })} />
      {errors.spots && <p className="field-error">{errors.spots.message}</p>}

      <label htmlFor="trainerId">Monitor</label>
      <select id="trainerId" {...register("trainerId", { valueAsNumber: true })}>
        <option value="">Elige uno</option>
        {TRAINERS.map((trainer) => (
          <option key={trainer.id} value={trainer.id}>
            {trainer.name}
          </option>
        ))}
      </select>
      {errors.trainerId && <p className="field-error">{errors.trainerId.message}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Guardando..." : "Crear clase"}
      </button>
    </form>
  );
}
