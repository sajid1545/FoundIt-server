import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { ClaimControllers } from "./claim.controller";
import { ClaimValidation } from "./claim.validation";

const router = express.Router();

router.get("/", auth(UserRole.ADMIN, UserRole.USER), ClaimControllers.getClaims);
router.get("/my-claims", auth(UserRole.ADMIN, UserRole.USER), ClaimControllers.myClaims);
router.post(
	"/",
	auth(UserRole.ADMIN, UserRole.USER),
	validateRequest(ClaimValidation.createClaim),
	ClaimControllers.createClaim
);
router.put(
	"/:claimId",
	auth(UserRole.ADMIN, UserRole.USER),
	validateRequest(ClaimValidation.updateClaimStatus),
	ClaimControllers.updateClaimStatus
);

export const ClaimRoutes = router;
