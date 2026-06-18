import { useState } from "react";
import { loginUser } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
      navigate("/");
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">Login</h1>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded w-80"
      />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded w-80"
      />

      <button onClick={handleLogin} className="bg-black text-white px-4 py-2 rounded">Login</button>
    </div>
  );
}

export default LoginPage;