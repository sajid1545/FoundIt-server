import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../config";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import ApiError from "../errors/ApiError";

const auth = () => {
	return async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
		try {
			const token = req.headers.authorization;

			if (!token) {
				throw new ApiError(httpStatus.UNAUTHORIZED, "Authorization token not found");
			}

			const decoded = jwtHelpers.verifyToken(token, config.jwt.jwt_secret as Secret);

			req.user = decoded;

			next();
		} catch (error) {
			next(error);
		}
	};
};

export default auth;
