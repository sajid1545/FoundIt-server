import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { ItemCategoryControllers } from "./itemCategory.controller";
import { ItemCategoryValidation } from "./itemCategory.validation";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
	"/",
	auth(UserRole.ADMIN, UserRole.USER),
	validateRequest(ItemCategoryValidation.createItemCategory),
	ItemCategoryControllers.createFoundItemCategory
);

router.get("/", ItemCategoryControllers.getAllCategories);

export const ItemCategoryRoutes = router;
