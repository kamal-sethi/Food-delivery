import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_DB_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (file: Blob): Promise<string | null> => {
  if (!file) {
    return null;
  }
  try {
    const arrayBuffer = await file.arrayBuffer();
    // console.log(arrayBuffer);
    const buffer = Buffer.from(arrayBuffer);
    // console.log("buffer", buffer);
    return new Promise((resolve, reject) => {
      // console.log("hello")
      const uploadStream = cloudinary.uploader.upload_stream(
       
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
           
            resolve(result?.secure_url ?? null);
          }
        }
      );
      uploadStream.end(buffer);
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

// export default uploadOnCloudinary;
