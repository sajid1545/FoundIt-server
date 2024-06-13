import { UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";

const register = async (payload: any) => {
	const { ...userInfo } = payload;

	const hashedPassword: string = await bcrypt.hash(payload.password, 10);

	const result = await prisma.$transaction(async (tsx) => {
		const createUserData = await tsx.user.create({
			data: {
				...userInfo,
				password: hashedPassword,
			},
		});

		const createdUserProfile = await tsx.userProfile.create({
			data: {
				userId: createUserData.id,
			},
		});

		const getUserData = await tsx.user.findUnique({
			where: {
				id: createUserData.id,
			},
			select: {
				id: true,
				name: true,
				email: true,
				password: false,
				createdAt: true,
				updatedAt: true,
				profile: true,
			},
		});

		// returning user data excluding password
		return getUserData;
	});

	return result;
};

const login = async (payload: { email: string; password: string }) => {
	// checking if the user exists or not

	const userData = await prisma.user.findUniqueOrThrow({
		where: {
			email: payload.email,
			status: UserStatus.ACTIVE,
		},
	});

	// checking if the password is correct
	const isPasswordMatched = await bcrypt.compare(payload.password, userData.password);

	if (!isPasswordMatched) {
		throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");
	}

	// generating token and assigning it to user

	const accessToken = jwtHelpers.generateToken(
		{
			id: userData.id,
			email: userData.email,
			role: userData.role,
		},
		config.jwt.jwt_secret as Secret,
		config.jwt.expires_in as string
	);

	return {
		id: userData.id,
		name: userData.name,
		email: userData.email,
		token: accessToken,
	};
};

const changePassword = async (user: any, payload: any) => {
	const userData = await prisma.user.findUniqueOrThrow({
		where: {
			email: user.email,
			status: UserStatus.ACTIVE,
		},
	});

	const isCorrectPassword = await bcrypt.compare(payload.currentPassword, userData.password);

	if (!isCorrectPassword) {
		throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect password");
	}

	const hashedPassword = await bcrypt.hash(payload.newPassword, 10);

	await prisma.user.update({
		where: {
			email: userData.email,
		},
		data: {
			password: hashedPassword,
		},
	});

	return {
		message: "Password changed successfully",
	};
};

export const AuthServices = {
	register,
	login,
	changePassword,
};
