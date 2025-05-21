import { StrictMode } from "react";
import "./index.css";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import { ServiceWorkerManager } from "./services/serviceWorkerManager.tsx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <ServiceWorkerManager />
    <App />
  </StrictMode>
);