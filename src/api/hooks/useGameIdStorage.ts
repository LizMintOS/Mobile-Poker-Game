export const useGameIdStorage = () => {
  const getGameId = () => {
    return localStorage.getItem("gameId") ?? null;
  };

  const setGameIdStore = (gameId: string) => {
    localStorage.setItem("gameId", gameId);
  };

  const deleteGameId = () => {
    localStorage.removeItem("gameId");
  };

  return { getGameId, setGameIdStore, deleteGameId };
};
