import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { MetaService } from "./meta.service";

const fetchDashboardMetaData = catchAsync(async (req: Request & { user?: any }, res: Response) => {
	const user = req.user;
	const result = await MetaService.fetchDashboardMetaData(user as any);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Meta data retrival successfully!",
		data: result,
	});
});

export const MetaController = {
	fetchDashboardMetaData,
};
