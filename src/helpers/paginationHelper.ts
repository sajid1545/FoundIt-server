type TPagination = {
	page?: number;
	limit?: number;
	sortOrder?: string;
	sortBy?: string;
};

type TPaginationResult = {
	page: number;
	limit: number;
	skip: number;
	sortBy: string;
	sortOrder: string;
};

const calculatePagination = (options: TPagination): TPaginationResult => {
	const page: number = Number(options.page) || 1;
	const limit: number = Number(options.limit) || 10;
	const skip: number = (Number(page) - 1) * limit;

	const sortBy: string = options.sortBy || "createdAt";
	const sortOrder: string = options.sortOrder || "asc";

	return {
		page,
		limit,
		skip,
		sortBy,
		sortOrder,
	};
};

export const paginationHelper = {
	calculatePagination,
};