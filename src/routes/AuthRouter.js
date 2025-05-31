import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { createUser } from "../models/user/UserModels.js";
export const router = express.Router();
//User registration
router.post("/signup", async (req, res) => {
    try {
      console.log(req.body);
      const { name, email, password, phoneNumber, role } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(password, salt);
      const userData = await createUser({
        name,
        phoneNumber,
        role,
        email,
        password: hashedpassword,
      });
      //verfication Token
      const verificationToken = jwt.sign(
        { _id: userData._id, email: userData.email, name: userData.name },
        config.jwtSecret,
        {
          expiresIn: "365d",
        }
      );

      userData.verificationToken = verificationToken;
      await userData.save();
    //   await sendVerificationMail(email, `url ${verificationToken}`);
      const respObj = {
        status: "success",
        message: "User created successfully!",
      };
      res.status(200).send(respObj);
    } catch (error) {
      let errObj = {
        status: "error",
        message: "Error Creating",
        error: {
          code: 500,
          details: error.message || "Error creating user",
        },
      };
  
      res.status(500).send(errObj);
    }
  });
  export default router;