import { useRegisterSW } from "virtual:pwa-register/react";

export const ServiceWorkerManager = () => {
  const { updateServiceWorker } = useRegisterSW({
    immediate: true,
    onRegistered(r) {
      if (r && navigator.serviceWorker.controller) {
        console.log("Service worker registered.");
      }
    },
    onRegisterError(error) {
      console.error("Service worker registration error:", error);
    },
    onNeedRefresh() {
      console.log("New content available — prompting for refresh.");
      updateServiceWorker(true);
    },
    onOfflineReady() {
      console.log("App is ready to work offline!");
    },
  });

  return null;
};
