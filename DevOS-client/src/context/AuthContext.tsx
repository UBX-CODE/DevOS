import {createContext,useContext,useState,type ReactNode,} from "react";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {children: ReactNode;}

export const AuthProvider = ({children,}: AuthProviderProps) => {

  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const login = (token: string) => {
    console.log("Token Received:", token);
    localStorage.setItem("token",token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ token, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {

  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};