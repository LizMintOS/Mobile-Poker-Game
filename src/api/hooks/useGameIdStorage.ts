export const useGameIdStorage = () => {
  const getGameId = () => {
    return localStorage.getItem("gameId") ?? null;
  };

  const setGameId = (gameId: string) => {
    localStorage.setItem("gameId", gameId);
  };

  const deleteGameId = () => {
    localStorage.removeItem("gameId");
  };

  return { getGameId, setGameId, deleteGameId };
};
