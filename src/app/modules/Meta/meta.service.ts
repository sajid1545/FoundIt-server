import prisma from "../../../shared/prisma";

const fetchDashboardMetaData = async (user: any) => {
	const totalUsersCount = await prisma.user.count();
	const totalActiveUsersCount = await prisma.user.count({
		where: {
			status: "ACTIVE",
		},
	});
	const foundItemsCount = await prisma.foundItem.count();
	const lostItemsCount = await prisma.lostItem.count();
	const claimsCount = await prisma.claim.count();
	const totalApprovedClaims = await prisma.claim.count({
		where: {
			status: "APPROVED",
		},
	});
	const totalCategoriesCount = await prisma.foundItemCategory.count();
	const totalAdminCount = await prisma.user.count({
		where: {
			role: "ADMIN",
		},
	});

	const result = {
		totalUsersCount,
		totalActiveUsersCount,
		foundItemsCount,
		lostItemsCount,
		claimsCount,
		totalApprovedClaims,
		totalCategoriesCount,
		totalAdminCount,
	};
	return result;
};

export const MetaService = {
	fetchDashboardMetaData,
};
