import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth.service";
import { motion } from "framer-motion";

function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [leetcodeUsername, setLeetcodeUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      await registerUser({
        name,
        email,
        password,
        githubUsername,
        leetcodeUsername,
      });

      setMessage("Registration Successful");
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#222] font-sans relative overflow-hidden flex flex-col items-center justify-center py-12">
      
      {/* Animated Floating Shapes */}
      <motion.div 
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[5%] right-[15%] w-72 h-72 bg-[#e6ded2] rounded-[30%] mix-blend-multiply opacity-60"
      />
      <motion.div 
        animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[5%] left-[10%] w-96 h-96 bg-[#f0eadd] rounded-full mix-blend-multiply opacity-70"
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white p-10 w-full max-w-[480px] rounded-2xl shadow-xl border border-[#f0eadd]"
      >
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-[#1f1e1e] rounded-full flex items-center justify-center text-white font-serif italic font-medium text-xl shadow-lg">
            D
          </div>
        </div>

        <h1 className="text-4xl font-serif tracking-tight text-center mb-2 text-[#111]">Create Account</h1>
        <p className="text-center text-gray-500 mb-8 font-light">Join DevOS to streamline your workflow.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#FAF6F0] border border-[#f0eadd] px-4 py-3 rounded text-[15px] focus:outline-none focus:border-gray-400 transition"
            />
          </div>

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

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">GitHub</label>
              <input
                type="text"
                placeholder="Username (opt)"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
                className="w-full bg-[#FAF6F0] border border-[#f0eadd] px-4 py-3 rounded text-[14px] focus:outline-none focus:border-gray-400 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">LeetCode</label>
              <input
                type="text"
                placeholder="Username (opt)"
                value={leetcodeUsername}
                onChange={(e) => setLeetcodeUsername(e.target.value)}
                className="w-full bg-[#FAF6F0] border border-[#f0eadd] px-4 py-3 rounded text-[14px] focus:outline-none focus:border-gray-400 transition"
              />
            </div>
          </div>

          <button 
            onClick={handleRegister} 
            className="w-full bg-[#1f1e1e] text-white py-3.5 rounded text-xs font-semibold tracking-widest hover:bg-black transition mt-4"
          >
            CREATE ACCOUNT
          </button>

          {message && (
            <div className="mt-4 p-3 bg-[#FAF6F0] text-[#111] text-sm font-medium rounded border border-[#f0eadd] text-center">
              {message}
            </div>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-8 font-medium">
          Already have an account?{' '}
          <span 
            onClick={() => navigate('/login')} 
            className="text-[#111] font-semibold cursor-pointer border-b border-[#111] pb-0.5 hover:opacity-70 transition"
          >
            Sign in
          </span>
        </p>
      </motion.div>
    </div>
  );
}

export default RegisterPage;