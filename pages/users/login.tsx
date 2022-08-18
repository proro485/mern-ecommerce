import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "../../app/slices/userSlice";

const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
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

      if (!data.error) {
        dispatch(setUser(data.user));
        localStorage.setItem("user", JSON.stringify(data.user));
        router.replace("/");
        toast.success(data.message, {
          position: "top-center",
        });
      } else {
        toast.error(data.error, {
          position: "top-center",
        });
      }
    } catch (e) {
      console.log(e);

      toast.error("Client Side Error", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex flex-col items-center space-y-5 text-slate-800 my-[20vh] sm:my-[25vh]">
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
      <Link href="/users/register">Dont have an account? Click here</Link>
    </div>
  );
};

export default Login;
