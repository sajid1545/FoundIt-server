import { v2 as cloudinary } from "cloudinary";
import { ICloudinaryResponse, IFile } from "../app/interfaces/filte";
import config from "../config";

// Configuration
cloudinary.config({
	cloud_name: config.imageUploader.cloudinary_name,
	api_key: config.imageUploader.cloudinary_api_key,
	api_secret: config.imageUploader.cloudinary_api_secret,
});

const uploadToCloudinary = async (file: IFile): Promise<ICloudinaryResponse | undefined> => {
	return new Promise((resolve, reject) => {
		cloudinary.uploader.upload(file.path, (error: Error, result: ICloudinaryResponse) => {
			if (error) {
				reject(error);
			} else {
				resolve(result);
			}
		});
	});
};
export const imageUploader = {
	uploadToCloudinary,
};
