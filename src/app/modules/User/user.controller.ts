import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { UserServices } from "./user.service";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
	const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
	const result = await UserServices.getAllUsers(options);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "All Users fetched successfully",
		data: result,
	});
});
const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;

	const result = await UserServices.updateUserStatus(id, req.body);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "User status updated successfully",
		data: result,
	});
});

export const UserControllers = {
	updateUserStatus,
	getAllUsers,
};
