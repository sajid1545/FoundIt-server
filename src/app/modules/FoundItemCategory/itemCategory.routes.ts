import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { ItemCategoryControllers } from "./itemCategory.controller";
import { ItemCategoryValidation } from "./itemCategory.validation";

const router = express.Router();

router.post(
	"/",
	auth(),
	validateRequest(ItemCategoryValidation.createItemCategory),
	ItemCategoryControllers.createFoundItemCategory
);

export const ItemCategoryRoutes = router;
