import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import HomePage from "./pages/Home";
import AuthPage from "./pages/Auth";
import { NavigationProvider } from "./contexts/NavProvider";
import ProtectedLayout from "./routes/ProtectedLayout";
import ProtectedHome from "./routes/ProtectedHome";

const App = () => {
  return (
    <BrowserRouter>
      <NavigationProvider>
        <Routes>
          <Route path="/" element={<ProtectedHome />}>
            <Route path="auth" element={<AuthPage />} />
            <Route path=":userId/:username">
              <Route element={<ProtectedLayout />}>
                <Route index path="home" element={<HomePage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </NavigationProvider>
    </BrowserRouter>
  );
};

export default App;
