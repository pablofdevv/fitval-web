// Cómo llegan los datos (de momento, de json-server)

export type Plan = {
  id: number; // la API de NestJS devuelve los id como número
  name: string;
  monthlyPrice: number;
};

export type GymClass = {
  id: number;
  activity: string;
  room: string;
  startsAt: string; // fecha en texto ISO: "2026-11-02T09:00:00.000Z"
  spots: number;
  trainerName: string;
};

// Lo que se envía para crear una clase (sin id ni trainerName: los pone la API)
export type NewGymClass = {
  activity: string;
  room: string;
  startsAt: string;
  spots: number;
  trainerId: number;
};

export type User = {
  id: number;
  email: string;
  role: "member" | "staff";
};
