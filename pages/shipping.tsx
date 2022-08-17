import { GetServerSideProps } from "next";
import nookies from "nookies";
import protectRoute from "../middleware/protectRoute";

const Shipping = () => {
  return <div>shipping</div>;
};

export default Shipping;

export const getServerSideProps: GetServerSideProps = async (context) => {
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

  return {
    props: {},
  };
};
