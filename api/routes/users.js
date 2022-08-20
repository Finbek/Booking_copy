import express from "express";
import {
  deleteUser,
  getUsers,
  getUser,
  updateUser,
} from "../controllers/User.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//AUTH USER TOKEN = VERIFICATION

// //jwt
// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("You are authenticated");
// });

// //user token verification
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("You are authenticated and can delete your account");
// });

// //admin token verification
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("You are admin and can delete all account");
// });

//UPDATE
router.put("/:id", verifyUser, updateUser);
//DELETE
router.delete("/:id", verifyUser, deleteUser);
//GET
router.get("/:id", verifyUser, getUser);
//GET ALL
router.get("/", verifyAdmin, getUsers);
export default router;
