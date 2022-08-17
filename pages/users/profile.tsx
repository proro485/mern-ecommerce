import { GetServerSideProps } from "next";
import nookies from "nookies";
import protectRoute from "../../middleware/protectRoute";
import User from "../../models/userModel";
import { ProfileProps } from "../../types";
import connectMongo from "../../utils/connectMongo";

const Profile = (props: ProfileProps) => {
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
        user: user,
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
