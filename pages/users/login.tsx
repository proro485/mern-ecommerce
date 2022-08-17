import axios from "axios";
import Link from "next/link";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    localStorage.setItem("user", JSON.stringify(data.user));
  };

  return (
    <div className="flex flex-col items-center space-y-5 text-slate-800 my-56 sm:my-60">
      <div className="text-3xl mb-3 font-semibold">Sign In</div>
      <input
        type="text"
        value={email}
        placeholder="Enter your email"
        className="px-2 w-4/5 sm:w-96 h-12 text-lg border-px border-slate-800 outline-none"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="Enter your password"
        className="px-2 w-4/5 sm:w-96 h-12 text-lg border-px border-slate-800 outline-none"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="pt-3">
        <button
          onClick={handleLogin}
          className="bg-slate-800 font-semibold text-white py-2 px-12 cursor-pointer hover:shadow-lg"
        >
          Sign In
        </button>
      </div>
      <Link href="/users/register">Don't have an account? Click here</Link>
    </div>
  );
};

export default Login;
