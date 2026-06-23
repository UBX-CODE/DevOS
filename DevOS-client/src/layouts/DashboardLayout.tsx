import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-[#FAF6F0] text-[#222] font-sans overflow-hidden">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Navbar setSidebarOpen={setIsSidebarOpen} />
                <main className="p-4 md:p-8 overflow-y-auto flex-1">
                    <Outlet/>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;