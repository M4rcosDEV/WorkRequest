import { Outlet } from "react-router-dom";
import {useState} from 'react';
import SideBar from "../components/SideBar/SideBar";

function MainLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const closeSidebar = () => {
        
        setSidebarOpen(!sidebarOpen);
        console.log(sidebarOpen);
    };



    return (
        <div className="bg-gray-100 h-screen flex">
            {/* Botão Hambúrguer */}
            {!sidebarOpen && (
                <button className="absolute top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md" onClick={closeSidebar}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            )}

            {/* Sidebar com animação */}
            <div className={`${sidebarOpen ? "flex" : "hidden"} `}>
                <SideBar closeSidebar={closeSidebar} />
            </div>

            {/* Área de conteúdo que muda conforme a rota */}
            <div className={`flex-1 p-4 transition-all duration-300 ease-in-out mt-1 ${sidebarOpen ? "ml-[320px]" : "ml-[50px]"}`}>
                <Outlet />
            </div>
        </div>
    );
}

export default MainLayout;
