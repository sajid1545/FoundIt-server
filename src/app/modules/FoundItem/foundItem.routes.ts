import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { FoundItemControllers } from "./foundItem.controller";
import { FoundItemValidation } from "./foundItem.validation";

const router = express.Router();

router.post(
	"/",
	auth(),
	validateRequest(FoundItemValidation.createFoundItem),
	FoundItemControllers.createFoundItem
);

router.patch(
	"/:id",
	auth(),
	validateRequest(FoundItemValidation.updateFoundItem),
	FoundItemControllers.updateFoundItem
);
router.delete("/:id", auth(), FoundItemControllers.deleteFoundItem);

router.get("/", FoundItemControllers.getFoundItems);

export const FoundItemRoutes = router;
