import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "../../app/slices/userSlice";

const Register = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/register",
      { name, email, password },
      config
    );

    if (!data.error) {
      dispatch(setUser(data.user));
      localStorage.setItem("user", JSON.stringify(data.user));
      router.replace("/");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-5 text-slate-800 my-48 sm:my-52">
      <div className="text-3xl mb-3 font-semibold">Sign Up</div>
      <input
        type="text"
        value={name}
        placeholder="Enter your name"
        className="px-2 w-4/5 sm:w-96 h-12 text-lg border-px border-slate-800 outline-none"
        onChange={(e) => setName(e.target.value)}
      />
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
          onClick={handleRegister}
          className="bg-slate-800 font-semibold text-white py-2 px-12 cursor-pointer hover:shadow-lg"
        >
          Sign Up
        </button>
      </div>
      <Link href="/users/login">Already have an account? Click here</Link>
    </div>
  );
};

export default Register;
