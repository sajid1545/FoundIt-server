import { z } from "zod";

const createLostItem = z.object({
	body: z.object({
		categoryId: z.string({
			required_error: "Category id is required",
		}),
		lostItemName: z.string({
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

const updateLostItem = z.object({
	body: z.object({
		categoryId: z.string().optional(),
		lostItemName: z.string().optional(),
		description: z.string().optional(),
		location: z.string().optional(),
	}),
});

export const LostItemValidation = {
	createLostItem,
	updateLostItem,
};
