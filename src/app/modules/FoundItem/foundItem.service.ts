import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { TPaginationOptions } from "../../interfaces/pagination";
import { filterableSortBy, foundItemSearchAbleFields } from "./foundItem.constant";
import { TFoundItemsFilterRequest } from "./foundItem.interface";

const createFoundItem = async (user: any, payload: any) => {
	const result = await prisma.$transaction(async (tsx) => {
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
		const createFoundItem = await tsx.foundItem.create({
			data: {
				...payload,
				name: userData.name,
				email: user.email,
				userId: user.id,
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

	// filter by category
	let categoryFilter = "";

	if ((itemsFilter as any).category) {
		categoryFilter = (itemsFilter as any).category;
	}

	const ss = Object.keys(itemsFilter);

	if (ss.length > 0 && ss.includes("category")) {
		andConditions.push({
			category: {
				name: {
					contains: categoryFilter,
					mode: "insensitive",
				},
			},
		});
	}

	delete (itemsFilter as any).category;

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
			claim: {
				include: {
					user: true,
				},
			},
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

const updateFoundItem = async (id: string, payload: any) => {
	const isFindItemExists = await prisma.foundItem.findUniqueOrThrow({
		where: {
			id,
		},
	});

	const result = await prisma.foundItem.update({
		where: {
			id,
		},
		data: {
			...payload,
		},
	});
	return result;
};

const deleteFoundItem = async (id: string) => {
	const isFoundItemExists = await prisma.foundItem.findUniqueOrThrow({
		where: {
			id,
		},
	});

	const result = await prisma.$transaction(async (tsx) => {
		const deleteClaim = await tsx.claim.deleteMany({
			where: {
				foundItemId: id,
			},
		});

		const result = await prisma.foundItem.delete({
			where: {
				id,
			},
		});

		return result;
	});

	return result;
};

const myFoundItems = async (user: any) => {
	const result = await prisma.foundItem.findMany({
		where: {
			userId: user.id,
		},
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
			claim: {
				include: {
					user: true,
				},
			},
		},
	});
	return result;
};

const getSingleFoundItem = async (id: string) => {
	const result = await prisma.foundItem.findUniqueOrThrow({
		where: {
			id,
		},
		include: {
			user: {
				select: {
					id: true,
					email: true,
					name: true,
					createdAt: true,
					updatedAt: true,
				},
			},
			category: true,
			claim: {
				include: {
					user: true,
				},
			},
		},
	});
	return result;
};

export const FoundItemServices = {
	createFoundItem,
	getFoundItems,
	updateFoundItem,
	deleteFoundItem,
	myFoundItems,
	getSingleFoundItem,
};
