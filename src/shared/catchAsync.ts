import { NextFunction, Request, RequestHandler, Response } from "express";

// Wraps an asynchronous function to catch any errors and pass them to next middleware.
const catchAsync = (fn: RequestHandler) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await fn(req, res, next);
		} catch (error) {
			next(error);
		}
	};
};

export default catchAsync;
