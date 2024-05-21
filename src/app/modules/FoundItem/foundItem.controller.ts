import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { foundItemFilterableFields } from "./foundItem.constant";
import { FoundItemServices } from "./foundItem.service";

const createFoundItem = catchAsync(async (req: Request & { user?: any }, res: Response) => {
	const user = req.user;
	const result = await FoundItemServices.createFoundItem(user, req.body);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.CREATED,
		message: "Found item reported successfully",
		data: result,
	});
});

const getFoundItems = catchAsync(async (req: Request & { user?: any }, res: Response) => {
	const filters = pick(req.query, foundItemFilterableFields);
	const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

	const result = await FoundItemServices.getFoundItems(filters, options);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "Found items retrieved successfully",
		meta: result.meta,
		data: result.data,
	});
});

export const FoundItemControllers = {
	createFoundItem,
	getFoundItems,
};
