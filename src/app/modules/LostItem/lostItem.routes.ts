import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { LostItemControllers } from "./lostItem.controller";
import { LostItemValidation } from "./lostItem.validation";

const router = express.Router();

router.post(
	"/",
	auth(),
	// (req: Request, res: Response, next: NextFunction) => {
	// 	console.log(req.body);
	// 	req.body = LostItemValidation.createLostItem.parse(JSON.parse(req.body.data));
	// 	return LostItemControllers.createLostItem(req, res, next);
	// },
	validateRequest(LostItemValidation.createLostItem),

	LostItemControllers.createLostItem
);

router.patch(
	"/:id",
	auth(),
	validateRequest(LostItemValidation.updateLostItem),
	LostItemControllers.updateLostItem
);

router.put("/status/:id", auth(), LostItemControllers.changeLostItemFoundStatus);

router.delete("/:id", auth(), LostItemControllers.deleteLostItem);

router.get("/", LostItemControllers.getLostItems);

export const LostItemRoutes = router;
