import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import "./App.css";
import HomePage from "./pages/Home";
import AuthPage from "./pages/Auth";
import AuthorizedLayout from "./routes/AuthorizedLayout";
import GameLobby from "./pages/GameLobby";
import PageNotFound from "./pages/PageNotFound";
import AuthRedirectGuard from "./routes/AuthRedirectGuard";
import Game from "./pages/Game";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthRedirectGuard />}>
          <Route element={<AuthorizedLayout />}>
            <Route index element={<HomePage />} />
            <Route path="lobby/:gameId" element={<GameLobby />} />
            <Route path="game/:gameId" element={<Game />} />
          </Route>
          <Route path="auth" element={<AuthPage />} />
        </Route>
        <Route path="/page-not-found" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/page-not-found" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
