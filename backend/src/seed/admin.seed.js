import expressAsyncHandler from "express-async-handler";
import adminModel from "../models/admin.model.js";

export const seedAdmin = expressAsyncHandler(async (req, res, next) => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  const existingUser = await adminModel.findOne({ email });
  if (!existingUser) {
    const user = await adminModel.create({
      email,
      password,
      isAdmin: true,
    });
    console.log(`Admin Data added Successfully!!!`);
  } else {
    console.log(`Admin already present, skipping seeding!!!!`);
  }
});
