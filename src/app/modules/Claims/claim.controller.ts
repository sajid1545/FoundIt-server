import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ClaimServices } from "./claim.service";

const createClaim = catchAsync(async (req: Request & { user?: any }, res: Response) => {
	const user = req.user;

	const result = await ClaimServices.createClaim(user, req.body);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.CREATED,
		message: "Claim created successfully",
		data: result,
	});
});

const getClaims = catchAsync(async (req: Request, res: Response) => {
	const result = await ClaimServices.getClaims();

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "Claims retrieved successfully",
		data: result,
	});
});

const updateClaimStatus = catchAsync(async (req: Request & { user?: any }, res: Response) => {
	const { claimId } = req.params;

	const result = await ClaimServices.updateClaimStatus(claimId, req.body);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "Claim updated successfully",
		data: result,
	});
});

export const ClaimControllers = {
	createClaim,
	getClaims,
	updateClaimStatus,
};
