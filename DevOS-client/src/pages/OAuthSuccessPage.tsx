import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const OAuthSuccessPage = () => {

  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {

    const params =
      new URLSearchParams(
        window.location.search
      );

    const token =
      params.get("token");

    if (token) {

      login(token);
      toast.success(
  "Welcome to DevOS!"
);
      navigate("/dashboard");

    } else {

      navigate("/login");

    }

  }, [navigate, login]);

  return (
    <h1>Logging you in...</h1>
  );
};

export default OAuthSuccessPage;