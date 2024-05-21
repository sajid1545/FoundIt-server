import prisma from "../../../shared/prisma";

const createClaim = async (user: any, payload: any) => {
	const result = await prisma.claim.create({
		data: {
			...payload,
			userId: user.id,
		},
	});

	return result;
};

const getClaims = async () => {
	const result = await prisma.claim.findMany({
		include: {
			foundItem: {
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
				},
			},
		},
	});
	return result;
};

const updateClaimStatus = async (id: string, payload: any) => {
	console.log("🚀 ~ updateClaimStatus ~ payload:", payload);
	// checking if the claim exists
	const ifClaimExists = await prisma.claim.findUniqueOrThrow({
		where: {
			id,
		},
	});

	const result = await prisma.claim.update({
		where: {
			id,
		},
		data: {
			status: payload.status,
		},
	});
	return result;
};

export const ClaimServices = {
	createClaim,
	getClaims,
	updateClaimStatus,
};
