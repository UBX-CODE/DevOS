import { useEffect, useState } from "react";
import { getProfile } from "../services/settings.service";

const Navbar = () => {
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
    <header className="h-20 px-8 flex items-center justify-between bg-[#FAF6F0] border-b border-[#f0eadd]">
      <div>
        <h2 className="font-serif font-medium text-2xl tracking-tight text-[#111]">Welcome Back</h2>
        <p className="text-[15px] text-gray-500 font-light mt-0.5">Manage your projects and tasks</p>
      </div>

      <div className="h-11 w-11 rounded-full bg-white border border-[#f0eadd] text-[#111] flex items-center justify-center font-serif font-medium text-lg shadow-sm">
        {user?.name?.charAt(0).toUpperCase()}
      </div>
    </header>
  );
};

export default Navbar;