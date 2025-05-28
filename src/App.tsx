import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import "./App.css";
import HomePage from "./pages/Home";
import AuthPage from "./pages/Auth";
// import { NavigationProvider } from "./contexts/NavProvider";
import AuthorizedLayout from "./routes/AuthorizedLayout";
import CreateGamePage from "./pages/CreateGame";
import PageNotFound from "./pages/PageNotFound";
import AuthRedirectGuard from "./routes/AuthRedirectGuard";

const App = () => {
  return (
    <BrowserRouter>
      {/* <NavigationProvider> */}
      <Routes>
        <Route path="/" element={<AuthRedirectGuard />}>
          <Route path="home" element={<AuthorizedLayout />}>
            <Route index element={<HomePage />} />
            <Route path="create" element={<CreateGamePage />} />
          </Route>
          <Route path="/auth" element={<AuthPage />} />
        </Route>
        <Route path="/page-not-found" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/page-not-found" replace />} />
        {/* <Route path="/" element={<AuthRedirectGuard />}>
            <Route path="home">
              <Route element={<ProtectedLayout />}>
                <Route index element={<HomePage />} />
                <Route path="create" element={<CreateGamePage />} />
              </Route>
            </Route>
          </Route>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/page-not-found" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/page-not-found" replace />} /> */}
      </Routes>
      {/* </NavigationProvider> */}
    </BrowserRouter>
  );
};

export default App;
