export const ROUTES = {
  HOME: "/",
  AUTH: "/auth",
  PAGE_NOT_FOUND: "/page-not-found",
  GAME_LOBBY: (gameId: string) => `/lobby/${gameId}`,
  GAME: (gameId: string) => `/game/${gameId}`,
};
