import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./app";
import { Header } from "./components/header";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./services/reactQuery";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Header />
    <App />
    </QueryClientProvider>
    
  </React.StrictMode>
);
