import { z } from "zod";

const createFoundItem = z.object({
	body: z.object({
		categoryId: z.string({
			required_error: "Category id is required",
		}),
		foundItemName: z.string({
			required_error: "Found item name is required",
		}),
		description: z.string({
			required_error: "Description is required",
		}),
		location: z.string({
			required_error: "Location is required",
		}),
	}),
});

export const FoundItemValidation = {
	createFoundItem,
};
