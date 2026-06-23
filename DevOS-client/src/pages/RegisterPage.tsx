import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser }
from "../services/auth.service";

function RegisterPage() {

  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [githubUsername,
    setGithubUsername] =
    useState("");

  const [leetcodeUsername,
    setLeetcodeUsername] =
    useState("");

  const [message,
    setMessage] =
    useState("");

  const handleRegister =
    async () => {

      try {

        await registerUser({
          name,
          email,
          password,
          githubUsername,
          leetcodeUsername,
        });

        setMessage(
          "Registration Successful"
        );

        setTimeout(() => {

          navigate("/login");

        }, 1000);

      } catch (error) {

        console.error(error);

      }
    };

  return (

    <div className="
      flex
      justify-center
      items-center
      min-h-screen
      bg-gray-100
    ">

      <div className="
        bg-white
        shadow-lg
        rounded-xl
        p-8
        w-full
        max-w-md
      ">

        <h1 className="
          text-3xl
          font-bold
          mb-6
          text-center
        ">
          Register
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="
              border
              p-3
              w-full
              rounded
            "
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="
              border
              p-3
              w-full
              rounded
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="
              border
              p-3
              w-full
              rounded
            "
          />

          <input
            type="text"
            placeholder="GitHub Username"
            value={
              githubUsername
            }
            onChange={(e) =>
              setGithubUsername(
                e.target.value
              )
            }
            className="
              border
              p-3
              w-full
              rounded
            "
          />

          <input
            type="text"
            placeholder="LeetCode Username"
            value={
              leetcodeUsername
            }
            onChange={(e) =>
              setLeetcodeUsername(
                e.target.value
              )
            }
            className="
              border
              p-3
              w-full
              rounded
            "
          />

          <button
            onClick={
              handleRegister
            }
            className="
              bg-black
              text-white
              p-3
              rounded
              w-full
            "
          >
            Register
          </button>

          <p className="
            text-center
            text-sm
          ">
            Already have an account?

            <span
              onClick={() =>
                navigate(
                  "/login"
                )
              }
              className="
                text-blue-500
                cursor-pointer
                ml-1
              "
            >
              Login
            </span>
          </p>

          {message && (
            <p className="
              text-green-600
              text-center
            ">
              {message}
            </p>
          )}

        </div>

      </div>

    </div>
  );
}

export default RegisterPage;