import { useState } from "react";
import { loginUser } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await loginUser({email,password,});

      console.log("Response:", response);

      login(response.token);

      alert("Login Successful!");
      navigate("/Dashboard");
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#222] font-sans relative overflow-hidden flex flex-col items-center justify-center">
      
      {/* Animated Floating Shapes */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[15%] w-64 h-64 bg-[#f0eadd] rounded-full mix-blend-multiply opacity-70"
      />
      <motion.div 
        animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[15%] right-[10%] w-80 h-96 bg-[#e6ded2] rounded-[40%] mix-blend-multiply opacity-60"
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white p-10 w-full max-w-[420px] rounded-2xl shadow-xl border border-[#f0eadd]"
      >
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 bg-[#1f1e1e] rounded-full flex items-center justify-center text-white font-serif italic font-medium text-xl shadow-lg">
            D
          </div>
        </div>

        <h1 className="text-4xl font-serif tracking-tight text-center mb-2 text-[#111]">Welcome Back</h1>
        <p className="text-center text-gray-500 mb-8 font-light">Sign in to continue to DevOS.</p>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#FAF6F0] border border-[#f0eadd] px-4 py-3 rounded text-[15px] focus:outline-none focus:border-gray-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#FAF6F0] border border-[#f0eadd] px-4 py-3 rounded text-[15px] focus:outline-none focus:border-gray-400 transition"
            />
          </div>

          <button 
            onClick={handleLogin} 
            className="w-full bg-[#1f1e1e] text-white py-3.5 rounded text-xs font-semibold tracking-widest hover:bg-black transition mt-4"
          >
            SIGN IN
          </button>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-[#f0eadd]"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-[11px] font-medium tracking-widest uppercase">Or</span>
            <div className="flex-grow border-t border-[#f0eadd]"></div>
          </div>

          <a
            href={`${import.meta.env.VITE_API_URL}/auth/google`}
            className="flex items-center justify-center gap-3 w-full bg-white border border-[#f0eadd] text-[#111] py-3.5 rounded text-[13px] font-medium hover:bg-[#FAF6F0] transition shadow-sm"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4" />
            Continue with Google
          </a>
        </div>

        <p className="text-center text-sm text-gray-500 mt-8 font-medium">
          Don't have an account?{' '}
          <span 
            onClick={() => navigate('/register')} 
            className="text-[#111] font-semibold cursor-pointer border-b border-[#111] pb-0.5 hover:opacity-70 transition"
          >
            Register
          </span>
        </p>
      </motion.div>
    </div>
  );
}

export default LoginPage;