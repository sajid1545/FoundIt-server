import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserServices } from "./user.service";

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;

	const result = await UserServices.updateUserStatus(id, req.body);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "User profile updated successfully",
		data: result,
	});
});

export const UserControllers = {
	updateUserStatus,
};
