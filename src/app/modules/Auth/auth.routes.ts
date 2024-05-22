import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { AuthControllers } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post("/register", validateRequest(AuthValidation.register), AuthControllers.register);
router.post("/login", validateRequest(AuthValidation.login), AuthControllers.login);
router.post("/change-password", auth(), AuthControllers.changePassword);

export const AuthRoutes = router;
