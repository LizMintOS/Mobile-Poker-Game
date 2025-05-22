import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import HomePage from "./pages/Home";
import AuthPage from "./pages/Auth";
import { NavigationProvider } from "./contexts/NavProvider";
import ProtectedLayout from "./layouts/ProtectedLayout";

function App() {
  return (
    <BrowserRouter>
      <NavigationProvider>
        <Routes>
          <Route index path="/auth" element={<AuthPage />} />

          <Route element={<ProtectedLayout />}>
            <Route index path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </NavigationProvider>
    </BrowserRouter>
  );
}

export default App;
