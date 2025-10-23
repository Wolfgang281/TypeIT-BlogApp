import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import CustomError from "../utils/Error.util";
import userModel from "../models/user.model";

export const authenticate = expressAsyncHandler(async (req, res, next) => {
  let token = req?.cookies?.token || req?.headers?.authorization?.split(" ")[1];
  if (!token) return next(new CustomError("Please login first", 401));

  let decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  let myUser = await userModel.findById(decodedToken.id);

  if (!myUser)
    return next(new CustomError("Invalid session, please login", 401));

  req.user = myUser;

  next();
});

export const authorize = (req, res, next) => {
  if (req?.user?.isAdmin === true) next();
  else next(new CustomError("You are not authorized", 403));
};
