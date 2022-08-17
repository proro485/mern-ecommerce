import verifyToken from "../utils/verifyToken";

const protectRoute = (token: string) => {
  const isTokenLegit = verifyToken(token);
  return isTokenLegit;
};

export default protectRoute;
