// Cómo llegan los datos (de momento, de json-server)

export type Plan = {
  id: string; // json-server guarda los id como texto
  name: string;
  monthlyPrice: number;
};

export type GymClass = {
  id: string;
  activity: string;
  room: string;
  startsAt: string; // fecha en texto ISO: "2026-11-02T09:00:00.000Z"
  spots: number;
  trainerName: string;
};

// Lo que se envía para crear una clase (sin id: lo pone json-server)
export type NewGymClass = {
  activity: string;
  room: string;
  startsAt: string;
  spots: number;
  trainerId: number;
  trainerName: string;
};

export type User = {
  id: string;
  email: string;
  role: "member" | "staff";
};
