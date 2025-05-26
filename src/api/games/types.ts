export type CreateGameInput = {
  name: string;
  creatorId: string;
};

export type Game = {
  id: string;
  name: string;
  creatorId: string;
  hasStarted: boolean;
};
