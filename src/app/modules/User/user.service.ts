import prisma from "../../../shared/prisma";

const getAllUsers = async () => {
	const result = await prisma.user.findMany();
	return result;
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
