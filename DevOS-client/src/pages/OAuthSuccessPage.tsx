import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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