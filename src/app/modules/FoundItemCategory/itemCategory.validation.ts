import { z } from "zod";

const createItemCategory = z.object({
	body: z.object({
		name: z.string({ required_error: "Name is required" }),
	}),
});

export const ItemCategoryValidation = {
	createItemCategory,
};
