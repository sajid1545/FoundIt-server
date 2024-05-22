import prisma from "../../../shared/prisma";

const createFoundItemCategory = async (payload: { name: string }) => {
	const result = await prisma.foundItemCategory.create({
		data: payload,
	});
	return result;
};

const getAllCategories = async () => {
	const result = await prisma.foundItemCategory.findMany();
	return result;
};

export const ItemCategoryServices = {
	createFoundItemCategory,
	getAllCategories,
};
