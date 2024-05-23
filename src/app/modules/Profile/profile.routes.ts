import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { ProfileControllers } from "./profile.controller";
import { ProfileValidation } from "./profile.validation";

const router = express.Router();

router.get("/", auth(UserRole.ADMIN, UserRole.USER), ProfileControllers.getProfile);

router.put(
	"/",
	auth(UserRole.ADMIN, UserRole.USER),
	validateRequest(ProfileValidation.updateProfile),
	ProfileControllers.updateProfile
);

export const ProfileRoutes = router;
