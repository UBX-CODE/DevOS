import {NavLink} from "react-router-dom";
import {FiHome, FiFolder, FiCheckSquare, FiSettings, FiLogOut, FiX, FiGitBranch} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
    const { logout } = useAuth();
    
    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden" 
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Content */}
            <aside className={`fixed inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out w-72 bg-white border-r border-[#f0eadd] min-h-screen p-6 flex flex-col shadow-sm z-50`}>
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#1f1e1e] rounded-full flex items-center justify-center text-white font-serif italic font-medium text-lg">
                            D
                        </div>
                        <Link to="/" className="text-2xl font-serif font-medium tracking-tight text-[#111]" onClick={() => setIsOpen(false)}>DevOS</Link>
                    </div>
                    <button className="md:hidden text-gray-500" onClick={() => setIsOpen(false)}>
                        <FiX size={24} />
                    </button>
                </div>

                <nav className="flex flex-col gap-2 flex-1">
                    <NavLink to="/dashboard" onClick={() => setIsOpen(false)} className={({isActive}) => `flex items-center gap-3 rounded text-[15px] p-3.5 transition font-medium ${isActive ? "bg-[#1f1e1e] text-white shadow-md" : "text-gray-600 hover:bg-[#FAF6F0] hover:text-[#111]"}`}><FiHome size={18}/>Dashboard</NavLink>
                    <NavLink to="/projects" onClick={() => setIsOpen(false)} className={({isActive}) => `flex items-center gap-3 rounded text-[15px] p-3.5 transition font-medium ${isActive ? "bg-[#1f1e1e] text-white shadow-md" : "text-gray-600 hover:bg-[#FAF6F0] hover:text-[#111]"}`}><FiFolder size={18}/>Projects</NavLink>
                    <NavLink to="/tasks" onClick={() => setIsOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded text-[15px] p-3.5 transition font-medium ${isActive ? "bg-[#1f1e1e] text-white shadow-md" : "text-gray-600 hover:bg-[#FAF6F0] hover:text-[#111]"}`}><FiCheckSquare size={18}/>Tasks</NavLink>
                    <NavLink to="/settings" onClick={() => setIsOpen(false)} className={({isActive}) => `flex items-center gap-3 rounded text-[15px] p-3.5 transition font-medium ${isActive ? "bg-[#1f1e1e] text-white shadow-md" : "text-gray-600 hover:bg-[#FAF6F0] hover:text-[#111]"}`}><FiSettings size={18}/>Settings</NavLink>
                    <NavLink to="/workflow" onClick={() => setIsOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded text-[15px] p-3.5 transition font-medium ${ isActive ? "bg-[#1f1e1e] text-white shadow-md" : "text-gray-600 hover:bg-[#FAF6F0] hover:text-[#111]"}`}><FiGitBranch size={18} />Workflow</NavLink>
                </nav>
                
                <button onClick={() => { setIsOpen(false); logout(); }} className="mt-8 flex items-center justify-center gap-2 w-full bg-[#FAF6F0] border border-[#f0eadd] text-[#111] p-3.5 rounded text-[15px] font-medium hover:bg-[#f0eadd] transition">
                    <FiLogOut size={18}/> Logout
                </button>
            </aside>
        </>
    );
};

export default Sidebar;