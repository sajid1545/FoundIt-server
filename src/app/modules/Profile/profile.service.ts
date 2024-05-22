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
					image: true,
					role: true,
					status: true,
					createdAt: true,
					updatedAt: true,
				},
			},
		},
	});
	return result;
};

const updateProfile = async (user: any, payload: any) => {
	const { email, ...userInfo } = payload;

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

		const updateUser = await tsx.user.update({
			where: {
				id: user.id,
			},
			data: {
				email,
			},
		});

		const updateUserProfile = await tsx.userProfile.update({
			where: {
				userId: user.id,
			},
			data: {
				...userInfo,
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

		return updateUserProfile;
	});

	return result;
};

export const ProfileServices = {
	getProfile,
	updateProfile,
};
