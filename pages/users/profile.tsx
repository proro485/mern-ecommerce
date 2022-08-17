import { GetServerSideProps } from "next";
import nookies from "nookies";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "../../app/slices/userSlice";
import protectRoute from "../../middleware/protectRoute";
import User from "../../models/userModel";
import { ProfileProps } from "../../types";
import connectMongo from "../../utils/connectMongo";

const Profile = (props: ProfileProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUser(props.user));
    localStorage.setItem("user", JSON.stringify(props.user));
  }, []);

  return <div>{props.user.name}</div>;
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
