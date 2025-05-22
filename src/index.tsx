import { StrictMode } from "react";
import "./index.css";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import { ServiceWorkerManager } from "./services/serviceWorkerManager.tsx";
import { AuthProvider } from "./contexts/AuthProvider.tsx";
import { StatusWrapper } from "./components/common/StatusWrapper.tsx";
import { StatusProvider } from "./contexts/StatusProvider.tsx";
// import { NavigationProvider } from "./contexts/NavProvider.tsx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <StatusProvider>
      <AuthProvider>
        {/* <NavigationProvider> */}
          <ServiceWorkerManager />
          <StatusWrapper />
          <App />
        {/* </NavigationProvider> */}
      </AuthProvider>
    </StatusProvider>
  </StrictMode>
);
