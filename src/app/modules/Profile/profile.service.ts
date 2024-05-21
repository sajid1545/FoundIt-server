import prisma from "../../../shared/prisma";

const getProfile = async (user: any) => {
	const result = await prisma.userProfile.findUniqueOrThrow({
		where: {
			userId: user.id,
		},
		include: {
			user: {
				select: {
					id: true,
					name: true,
					email: true,
					createdAt: true,
					updatedAt: true,
				},
			},
		},
	});
	return result;
};

const updateProfile = async (user: any, payload: any) => {
	const result = await prisma.userProfile.update({
		where: {
			userId: user.id,
		},
		data: {
			...payload,
		},
		include: {
			user: {
				select: {
					id: true,
					name: true,
					email: true,
					createdAt: true,
					updatedAt: true,
				},
			},
		},
	});
	return result;
};

export const ProfileServices = {
	getProfile,
	updateProfile,
};
