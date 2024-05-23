import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.put("/:id", auth(UserRole.ADMIN), UserControllers.updateUserStatus);

export const UserRoutes = router;
