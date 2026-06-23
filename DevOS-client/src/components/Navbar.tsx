import { useEffect, useState } from "react";
import { getProfile } from "../services/settings.service";
import { FiMenu } from "react-icons/fi";

interface NavbarProps {
  setSidebarOpen?: (isOpen: boolean) => void;
}

const Navbar = ({ setSidebarOpen }: NavbarProps) => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getProfile();
        setUser(response.user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <header className="h-20 px-4 md:px-8 flex items-center justify-between bg-[#FAF6F0] border-b border-[#f0eadd]">
      <div className="flex items-center gap-4">
        <button 
          className="md:hidden text-gray-700" 
          onClick={() => setSidebarOpen && setSidebarOpen(true)}
        >
          <FiMenu size={24} />
        </button>
        <div>
          <h2 className="font-serif font-medium text-xl md:text-2xl tracking-tight text-[#111]">Welcome Back</h2>
          <p className="text-[13px] md:text-[15px] text-gray-500 font-light mt-0.5">Manage your projects</p>
        </div>
      </div>

      <div className="h-10 w-10 md:h-11 md:w-11 rounded-full bg-white border border-[#f0eadd] text-[#111] flex items-center justify-center font-serif font-medium text-lg shadow-sm">
        {user?.name?.charAt(0).toUpperCase()}
      </div>
    </header>
  );
};

export default Navbar;