import expressAsyncHandler from "express-async-handler";
import userModel from "../models/user.model";

export const seedAdmin = expressAsyncHandler(async (req, res, next) => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  const existingUser = await userModel.findOne({ email });
  if (!existingUser) {
    const user = await userModel.create({
      email,
      password,
      isAdmin: true,
    });
    console.log(`Admin Data added Successfully!!!`);
  } else {
    console.log(`Admin already present, skipping seeding!!!!`);
  }
});
