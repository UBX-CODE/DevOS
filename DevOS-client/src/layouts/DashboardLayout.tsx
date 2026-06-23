import {Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen bg-[#FAF6F0] text-[#222] font-sans">
            <Sidebar />
            <div className="flex-1 flex flex-col h-screen">
                <Navbar/>
                <main className="p-8 overflow-y-auto flex-1">
                    <Outlet/>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;