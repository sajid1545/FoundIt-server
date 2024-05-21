import { z } from "zod";

const updateProfile = z.object({
	body: z.object({
		bio: z.string().optional(),
		age: z.number().optional(),
	}),
});

export const ProfileValidation = {
	updateProfile,
};
