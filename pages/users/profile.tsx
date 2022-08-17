import axios from "axios";
import { GetServerSideProps } from "next";
import nookies from "nookies";
import { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "../../app/slices/userSlice";
import protectRoute from "../../middleware/protectRoute";
import User from "../../models/userModel";
import { ProfileProps } from "../../types";
import connectMongo from "../../utils/connectMongo";

const Profile = (props: ProfileProps) => {
  const { addToast } = useToasts();
  const dispatch = useAppDispatch();

  const [name, setName] = useState(props.user.name);
  const [email, setEmail] = useState(props.user.email);
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(setUser(props.user));
    localStorage.setItem("user", JSON.stringify(props.user));
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const updatedData = {
        _id: props.user._id,
        name: name.length ? name : props.user.name,
        email: email.length ? email : props.user.email,
        password: password.length ? password : null,
      };

      const { data } = await axios.put(
        "/api/users/profile",
        updatedData,
        config
      );

      if (!data.error) {
        dispatch(setUser(data.user));
        localStorage.setItem("user", JSON.stringify(data.user));
        addToast(data.message, {
          appearance: "success",
          autoDismiss: true,
        });
      } else {
        addToast(data.error, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    } catch (e) {
      console.log(e);

      addToast("Client Side Error", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <div className="flex justify-center">
      <div className="grid lg:grid-auto-fit-xl gap-5 sm:gap-10 my-10 w-screen mx-4 sm:mx-10 text-slate-800">
        <div>
          <div className="border-px px-4 py-5 sm:px-10 sm:py-10 border-slate-800">
            <div className="text-xl sm:text-3xl font-semibold pb-2 border-b-2">
              Orders
            </div>
          </div>
        </div>
        <div className="flex flex-col border-px border-slate-800 px-4 py-5 sm:px-10 sm:py-10 space-y-3 sm:space-y-5">
          <div className="text-xl sm:text-3xl font-semibold pb-2 border-b-2">
            User Profile
          </div>
          <input
            type="text"
            value={name}
            placeholder="Enter your name"
            className="px-2 w-full h-10 sm:h-12 sm:text-md border-px border-slate-800 outline-none"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            value={email}
            placeholder="Enter your email"
            className="px-2 w-full h-10 sm:h-12 sm:text-md border-px border-slate-800 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="Enter your password"
            className="px-2 w-full h-10 sm:h-12 sm:text-md border-px border-slate-800 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="pt-3">
            <button
              onClick={handleUpdateProfile}
              className="bg-slate-800 font-semibold text-white py-2 w-full cursor-pointer hover:shadow-lg"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const token = nookies.get(context).token;

    const isAuthorized = token && (protectRoute(token) as any);

    if (!isAuthorized) {
      return {
        redirect: {
          destination: "/users/login",
        },
        props: {},
      };
    }

    await connectMongo();
    const data = await User.findById(isAuthorized.id).select("-password");
    const user = JSON.parse(JSON.stringify(data));

    if (!user) {
      return {
        redirect: {
          destination: "/users/login",
        },
        props: {},
      };
    }

    return {
      props: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: "/users/login",
      },
      props: {},
    };
  }
};
