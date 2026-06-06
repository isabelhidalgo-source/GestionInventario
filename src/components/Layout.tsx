import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

import { routes } from "../data/routes";

export default function Layout() {
    const menu = routes.map((route) => ({
        name: route.name,
        path: route.path
    }));

    return (
        <>
            <Navbar title="Veterinaria San Roque" />

            <div className="container">
                <Sidebar menu={menu} />
                <main className="main">
                    <Outlet />
                </main>
            </div>
            <Footer location={"Cochabamba, Bolivia"} year={2026} />
        </>
    );
}