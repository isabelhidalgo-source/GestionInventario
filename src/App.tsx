import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";

import { routes } from "./data/routes";

import { UserProvider } from "./context/UserContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Layout />}>

            {routes.map((route, index) => (
              <Route
                key={index}
                index={route.path === "/"}
                path={route.path === "/" ? undefined : route.path.slice(1)}
                element={route.element}
              />

            ))}

            <Route path="/" element={<Login />} />

            <Route path="/dashboard"
              element={
                // PRIVATE ROUTE PROTEGE EL DASHBOARD
                <PrivateRoute>
                  {/* COMPONENTE PRIVADO */}
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Route>

          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}