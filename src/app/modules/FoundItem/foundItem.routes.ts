import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { FoundItemControllers } from "./foundItem.controller";
import { FoundItemValidation } from "./foundItem.validation";

const router = express.Router();

router.post(
	"/",
	auth(UserRole.ADMIN, UserRole.USER),
	validateRequest(FoundItemValidation.createFoundItem),
	FoundItemControllers.createFoundItem
);

router.patch(
	"/:id",
	auth(UserRole.ADMIN, UserRole.USER),
	validateRequest(FoundItemValidation.updateFoundItem),
	FoundItemControllers.updateFoundItem
);
router.delete("/:id", auth(UserRole.ADMIN, UserRole.USER), FoundItemControllers.deleteFoundItem);

router.get("/my-items", auth(UserRole.ADMIN, UserRole.USER), FoundItemControllers.myFoundItems);
router.get("/:id", FoundItemControllers.getSingleFoundItem);
router.get("/", FoundItemControllers.getFoundItems);

export const FoundItemRoutes = router;
