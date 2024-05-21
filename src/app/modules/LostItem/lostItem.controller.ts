import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { lostItemFilterableFields } from "./lostItem.constants";
import { LostItemServices } from "./lostItem.service";

const createLostItem = catchAsync(async (req: Request, res: Response) => {
	const result = await LostItemServices.createLostItem(req);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.CREATED,
		message: "Lost item reported successfully",
		data: result,
	});
});

const getLostItems = catchAsync(async (req: Request & { user?: any }, res: Response) => {
	const filters = pick(req.query, lostItemFilterableFields);
	const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

	const result = await LostItemServices.getLostItems(filters, options);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "Lost items retrieved successfully",
		meta: result.meta,
		data: result.data,
	});
});

export const LostItemControllers = {
	createLostItem,
	getLostItems,
};
