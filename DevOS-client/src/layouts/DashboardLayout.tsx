import {Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1">
                <Navbar/>
                <main className="p-6 overflow-y-auto">
                <Outlet/>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;