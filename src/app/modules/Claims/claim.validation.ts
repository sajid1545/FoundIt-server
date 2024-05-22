import { ClaimStatus } from "@prisma/client";
import { z } from "zod";

const createClaim = z.object({
	body: z.object({
		foundItemId: z.string({
			required_error: "Found item id is required",
		}),
		distinguishingFeatures: z.string({
			required_error: "Distinguishing features is required",
		}),
		lostDate: z.string({
			required_error: "Lost date is required",
		}),
	}),
});

const updateClaimStatus = z.object({
	body: z.object({
		status: z.enum([ClaimStatus.APPROVED, ClaimStatus.PENDING, ClaimStatus.REJECTED]).optional(),
	}),
});

export const ClaimValidation = {
	createClaim,
	updateClaimStatus,
};
