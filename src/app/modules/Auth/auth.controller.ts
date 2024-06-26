import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthServices } from "./auth.service";

const register = catchAsync(async (req: Request, res: Response) => {
	const result = await AuthServices.register(req.body);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.CREATED,
		message: "User registered successfully",
		data: result,
	});
});

const login = catchAsync(async (req: Request, res: Response) => {
	const result = await AuthServices.login(req.body);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "User logged in successfully",
		data: result,
	});
});

const changePassword = catchAsync(async (req: Request & { user?: any }, res: Response) => {
	const user = req.user;

	const result = await AuthServices.changePassword(user, req.body);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Password changed successfully",
		data: {
			status: 200,
			message: "Password changed successfully",
		},
	});
});

export const AuthControllers = {
	register,
	login,
	changePassword,
};
