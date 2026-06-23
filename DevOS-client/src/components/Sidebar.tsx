import {NavLink} from "react-router-dom";
import {FiHome, FiFolder, FiCheckSquare, FiSettings} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
    const { logout } = useAuth();
    return (
        <aside className="w-64 border-r min-h-screen p-4 flex flex-col flex-1">
            <h1 className="text-2xl font-bold mb-8">DevOS</h1>

            <nav className = "flex flex-col gap-4">
                <NavLink to="/" className={({isActive}) => `flex items-center gap-3 rounded-lg p-3 ${isActive ? "bg-black text-white" : "hover:bg-gray-100"}`}><FiHome/>Dashboard</NavLink>
                
                <NavLink to="/projects" className={({isActive}) => `flex items-center gap-3 rounded-lg p-3 ${isActive ? "bg-black text-white" : "hover:bg-gray-100"}`}><FiFolder/>Projects</NavLink>
                
                <NavLink to="/tasks"className={({ isActive }) => `flex items-center gap-3 rounded-lg p-3 ${isActive ? "bg-black text-white" : "hover:bg-gray-100"}`}><FiCheckSquare/>Tasks</NavLink>

                <NavLink to="/settings" className={({isActive}) => `flex items-center gap-3 rounded-lg p-3 ${isActive ? "bg-black text-white" : "hover:bg-gray-100"}`}><FiSettings/>Settings</NavLink>
            </nav>
            <button
    onClick={logout}
    className="
        mt-8
        w-full
        bg-red-500
        text-white
        p-3
        rounded-lg
        hover:bg-red-600
    "
>
    Logout
</button>
        </aside>
    );
};

export default Sidebar;