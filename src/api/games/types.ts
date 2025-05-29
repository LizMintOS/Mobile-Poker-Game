export type CreateGameInput = {
  name: string;
  creatorId: string;
};

export type Game = {
  id: string;
  creatorId: string;
  hasStarted: boolean;
  playerCount: number;
};
