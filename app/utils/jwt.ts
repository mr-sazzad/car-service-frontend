import jwt from "jsonwebtoken";

export const decodedToken = (token: string) => {
  return jwt.decode(token);
};
