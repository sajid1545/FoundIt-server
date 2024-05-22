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

const updateFoundItem = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await FoundItemServices.updateFoundItem(id, req.body);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "Found item updated successfully",
		data: result,
	});
});

const deleteFoundItem = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await FoundItemServices.deleteFoundItem(id);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "Found item deleted successfully",
		data: result,
	});
});

const myFoundItems = catchAsync(async (req: Request & { user?: any }, res: Response) => {
	const user = req.user;
	const result = await FoundItemServices.myFoundItems(user);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "Your Found items fetched successfully",
		data: result,
	});
});
const getSingleFoundItem = catchAsync(async (req: Request & { user?: any }, res: Response) => {
	const { id } = req.params;
	const result = await FoundItemServices.getSingleFoundItem(id);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "Single Found item fetched successfully",
		data: result,
	});
});

export const FoundItemControllers = {
	createFoundItem,
	getFoundItems,
	updateFoundItem,
	deleteFoundItem,
	myFoundItems,
	getSingleFoundItem,
};
