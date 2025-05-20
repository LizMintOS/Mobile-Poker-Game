import { StrictMode } from "react";
import "./index.css";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import { ServiceWorkerManager } from "./services/serviceWorkerManager.tsx";
// import reportWebVitals from "./services/reportWebVitals.ts";
// import * as serviceWorkerRegistration from "./services/serviceWorkerRegistration.ts";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <ServiceWorkerManager />
    <App />
  </StrictMode>
);

if (process.env.NODE_ENV === 'production' && "serviceWorker" in navigator) {
  navigator.serviceWorker.register(
    import.meta.env.MODE === "production"
      ? "/service-worker.ts"
      : "/dev-sw.js?dev-sw"
  );
}



// serviceWorkerRegistration.register();
// reportWebVitals();