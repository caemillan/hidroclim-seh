import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Layout from "./Layout.jsx";
import CatalogoPage from "./pages/Catalogo.jsx";
import DetallePage from "./pages/Detalle.jsx";
import AcercaPage from "./pages/Acerca.jsx";
import FAQPage from "./pages/FAQ.jsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Navigate to="/plataformas" replace /> },

      { path: "/plataformas", element: <CatalogoPage defaultTab="plataformas" /> },
      { path: "/bases", element: <CatalogoPage defaultTab="bases" /> },

      { path: "/plataforma/:id", element: <DetallePage /> },
      { path: "/faq", element: <FAQPage /> },
      { path: "/acerca", element: <AcercaPage /> },

      { path: "*", element: <Navigate to="/plataformas" replace /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
