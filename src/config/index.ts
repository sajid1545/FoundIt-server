import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
	env: process.env.NODE_ENV,
	port: process.env.PORT,
	jwt: {
		jwt_secret: process.env.JWT_SECRET,
		expires_in: process.env.JWT_EXPIRES_IN,
	},
	imageUploader: {
		cloudinary_name: process.env.CLOUDINARY_NAME,
		cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
		cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
	},
};
