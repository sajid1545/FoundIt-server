import { paginationHelper } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { TPaginationOptions } from "../../interfaces/pagination";

const getAllUsers = async (options: TPaginationOptions) => {
	const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);
	const result = await prisma.user.findMany({
		skip,
		take: limit,
		orderBy:
			sortBy && sortOrder
				? {
						[sortBy]: sortOrder,
				  }
				: { createdAt: "desc" },
	});
	const total = await prisma.user.count();

	return {
		meta: {
			page,
			limit,
			total,
		},
		data: result,
	};
};

const updateUserStatus = async (id: string, payload: any) => {
	const ifUserExists = await prisma.user.findUniqueOrThrow({
		where: {
			id,
		},
	});

	const result = await prisma.user.update({
		where: {
			id,
		},
		data: {
			status: payload.status,
		},
	});
	return result;
};

export const UserServices = {
	updateUserStatus,
	getAllUsers,
};
