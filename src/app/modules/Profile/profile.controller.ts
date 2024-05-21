import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ProfileServices } from "./profile.service";

const getProfile = catchAsync(async (req: Request & { user?: any }, res: Response) => {
	const user = req.user;

	const result = await ProfileServices.getProfile(user);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "Profile retrieved successfully",
		data: result,
	});
});

const updateProfile = catchAsync(async (req: Request & { user?: any }, res: Response) => {
	const user = req.user;

	const result = await ProfileServices.updateProfile(user, req.body);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "User profile updated successfully",
		data: result,
	});
});

export const ProfileControllers = {
	getProfile,
	updateProfile,
};
