export const ROUTES = {
  INDEX: "/",
  AUTH: "/auth",
  HOME: "home",
  PAGE_NOT_FOUND: "/page-not-found",
  GAME_LOBBY: (gameId: string) => `/lobby/${gameId}`,
  GAME: (gameId: string) => `/game/${gameId}`,
};
