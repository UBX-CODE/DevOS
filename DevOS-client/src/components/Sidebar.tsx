import {NavLink} from "react-router-dom";
import {FiHome, FiFolder, FiCheckSquare, FiSettings, FiLogOut} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const { logout } = useAuth();
    return (
        <aside className="w-72 bg-white border-r border-[#f0eadd] min-h-screen p-6 flex flex-col shadow-sm z-10">
            <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 bg-[#1f1e1e] rounded-full flex items-center justify-center text-white font-serif italic font-medium text-lg">
                    D
                </div>
                <Link to="/" className="text-2xl font-serif font-medium tracking-tight text-[#111]">DevOS</Link>
            </div>

            <nav className="flex flex-col gap-2 flex-1">
                <NavLink to="/dashboard" className={({isActive}) => `flex items-center gap-3 rounded text-[15px] p-3.5 transition font-medium ${isActive ? "bg-[#1f1e1e] text-white shadow-md" : "text-gray-600 hover:bg-[#FAF6F0] hover:text-[#111]"}`}><FiHome size={18}/>Dashboard</NavLink>
                
                <NavLink to="/projects" className={({isActive}) => `flex items-center gap-3 rounded text-[15px] p-3.5 transition font-medium ${isActive ? "bg-[#1f1e1e] text-white shadow-md" : "text-gray-600 hover:bg-[#FAF6F0] hover:text-[#111]"}`}><FiFolder size={18}/>Projects</NavLink>
                
                <NavLink to="/tasks"className={({ isActive }) => `flex items-center gap-3 rounded text-[15px] p-3.5 transition font-medium ${isActive ? "bg-[#1f1e1e] text-white shadow-md" : "text-gray-600 hover:bg-[#FAF6F0] hover:text-[#111]"}`}><FiCheckSquare size={18}/>Tasks</NavLink>

                <NavLink to="/settings" className={({isActive}) => `flex items-center gap-3 rounded text-[15px] p-3.5 transition font-medium ${isActive ? "bg-[#1f1e1e] text-white shadow-md" : "text-gray-600 hover:bg-[#FAF6F0] hover:text-[#111]"}`}><FiSettings size={18}/>Settings</NavLink>
            </nav>
            
            <button onClick={logout} className="mt-8 flex items-center justify-center gap-2 w-full bg-[#FAF6F0] border border-[#f0eadd] text-[#111] p-3.5 rounded text-[15px] font-medium hover:bg-[#f0eadd] transition">
                <FiLogOut size={18}/> Logout
            </button>
        </aside>
    );
};

export default Sidebar;