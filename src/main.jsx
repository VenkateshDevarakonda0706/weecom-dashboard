import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./ErrorBoundary";

function MountTest() {
  return (
    <div style={{ position: 'fixed', right: 12, bottom: 12, zIndex: 9999 }}>
      <div style={{ background: '#111827', color: '#fff', padding: '6px 10px', borderRadius: 6, fontSize: 12 }}>
        React mounted
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster position="top-right" />
        <MountTest />
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);