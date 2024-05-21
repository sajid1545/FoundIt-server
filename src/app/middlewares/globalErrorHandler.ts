import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";

const handleZodError = (err: ZodError) => {
	const issues = err.issues.map((issue) => {
		return {
			field: issue?.path[issue.path.length - 1], // last index ta nibo
			message: issue?.message,
		};
	});

	const errorMessage = err.issues.map((issue) => {
		return `${issue.message}`;
	});

	return {
		message: errorMessage,
		errorDetails: {
			...err,
			issues,
		},
	};
};

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
	let message = err.message || "Something went wrong!";

	let errorDetails = err;

	// customize the error if it's a ZodError
	if (err instanceof ZodError) {
		const simplifiedError = handleZodError(err);
		message = simplifiedError?.message.join(", ");
		errorDetails = simplifiedError?.errorDetails;
	}

	res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
		success: false,
		message,
		errorDetails,
	});
};

export default globalErrorHandler;
