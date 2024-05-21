import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ItemCategoryServices } from "./itemCategory.service";

const createFoundItemCategory = catchAsync(async (req: Request & { user?: any }, res: Response) => {
	const result = await ItemCategoryServices.createFoundItemCategory(req.body);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.CREATED,
		message: "Found item category created successfully",
		data: result,
	});
});

export const ItemCategoryControllers = {
	createFoundItemCategory,
};
