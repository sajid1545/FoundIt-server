import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { TPaginationOptions } from "../../interfaces/pagination";
import { filterableSortBy, foundItemSearchAbleFields } from "./foundItem.constant";
import { TFoundItemsFilterRequest } from "./foundItem.interface";

const createFoundItem = async (user: any, payload: any) => {
	const result = await prisma.$transaction(async (tsx) => {
		const createFoundItem = await tsx.foundItem.create({
			data: {
				...payload,
				userId: user.id,
			},
		});

		const userData = await tsx.user.findUniqueOrThrow({
			where: {
				id: user.id,
			},
			select: {
				id: true,
				name: true,
				email: true,
				password: false,
				createdAt: true,
				updatedAt: true,
			},
		});

		const categoryData = await tsx.foundItemCategory.findUniqueOrThrow({
			where: {
				id: payload.categoryId,
			},
		});

		const responseObject = {
			...createFoundItem,
			user: userData,
			category: categoryData,
		};

		return responseObject;
	});

	return result;
};

const getFoundItems = async (params: TFoundItemsFilterRequest, options: TPaginationOptions) => {
	const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);

	let sort;

	// filterableSortBy: ["foundItemName", "category"] -- sortby can be done only in these fields
	if (filterableSortBy.map((field) => field === sortBy).includes(true)) {
		sort = sortBy;
	} else {
		sort = "createdAt";
	}

	const andConditions: Prisma.FoundItemWhereInput[] = [];

	const { searchTerm, ...itemsFilter } = params;

	if (params.searchTerm) {
		andConditions.push({
			OR: foundItemSearchAbleFields.map((field) => ({
				[field]: {
					contains: params.searchTerm,
					mode: "insensitive",
				},
			})),
		});
	}

	if (Object.keys(itemsFilter).length > 0) {
		andConditions.push({
			AND: Object.keys(itemsFilter).map((key) => ({
				[key]: {
					equals: (itemsFilter as any)[key],
				},
			})),
		});
	}

	const whereConditions: Prisma.FoundItemWhereInput =
		andConditions.length > 0 ? { AND: andConditions } : {};

	const result = await prisma.foundItem.findMany({
		where: whereConditions,
		include: {
			user: {
				select: {
					id: true,
					name: true,
					email: true,
					password: false,
					createdAt: true,
					updatedAt: true,
				},
			},
			category: true,
		},
		skip,
		take: limit,
		orderBy: sort === "category" ? { category: { name: sortOrder as any } } : { [sort]: sortOrder },
	});

	const total = await prisma.foundItem.count({
		where: whereConditions,
	});

	return {
		meta: {
			page,
			limit,
			total,
		},
		data: result,
	};
};

export const FoundItemServices = {
	createFoundItem,
	getFoundItems,
};
