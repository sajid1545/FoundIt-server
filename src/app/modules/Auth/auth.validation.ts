import { z } from "zod";

const register = z.object({
	body: z.object({
		name: z.string({
			required_error: "Name is required",
		}),
		email: z.string({
			required_error: "Email is required",
		}),
		password: z.string({
			required_error: "Password is required",
		}),
		profile: z
			.object({
				bio: z.string().optional(),
				age: z.number().optional(),
			})
			.optional(),
	}),
});

const login = z.object({
	body: z.object({
		email: z.string({
			required_error: "Email is required",
		}),
		password: z.string({
			required_error: "Password is required",
		}),
	}),
});

export const AuthValidation = {
	register,
	login,
};
