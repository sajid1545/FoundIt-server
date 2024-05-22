import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { ClaimControllers } from "./claim.controller";
import { ClaimValidation } from "./claim.validation";

const router = express.Router();

router.get("/", auth(), ClaimControllers.getClaims);
router.get("/my-claims", auth(), ClaimControllers.myClaims);
router.post(
	"/",
	auth(),
	validateRequest(ClaimValidation.createClaim),
	ClaimControllers.createClaim
);
router.put(
	"/:claimId",
	auth(),
	validateRequest(ClaimValidation.updateClaimStatus),
	ClaimControllers.updateClaimStatus
);

export const ClaimRoutes = router;
