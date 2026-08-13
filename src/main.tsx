import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { PreviewGate } from "./components/PreviewGate.tsx";
import "./i18n";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <PreviewGate>
    <App />
  </PreviewGate>,
);
