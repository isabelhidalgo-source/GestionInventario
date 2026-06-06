import Home from "../pages/Home";
import Pacientes from "../pages/Pacientes";
import Products from "../pages/Productos";


export const routes = [
    {
        name: "Inicio",
        path: "/",
        element: <Home />
    },
    {
        path: "/crud-productos",
        element: <CrudProductos />,
        name: "CRUD Productos",
    },
    {
        path: "/products",
        element: <Products />,
        name: "Productos",
    }
];