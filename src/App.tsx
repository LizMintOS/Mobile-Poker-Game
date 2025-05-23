import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import HomePage from "./pages/Home";
import AuthPage from "./pages/Auth";
import { NavigationProvider } from "./contexts/NavProvider";
import ProtectedLayout from "./layouts/ProtectedLayout";

const App = () => {
  return (
    <BrowserRouter>
      <NavigationProvider>
        <Routes>
          <Route path="/:userId/:username">
            <Route element={<ProtectedLayout />}>
              <Route index path="home" element={<HomePage />} />
            </Route>
          </Route>

          <Route index element={<AuthPage />} />
        </Routes>
      </NavigationProvider>
    </BrowserRouter>
  );
}

export default App;
