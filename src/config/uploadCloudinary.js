import axios from "axios";

const UPLOAD_NAME = process.env.NEXT_PUBLIC_UPLOAD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

const upload = axios.create({
  baseURL: `https://api.cloudinary.com/v1_1/${UPLOAD_NAME}/image/upload`,
});

const uploadCloudinary = async (file) => {
  if (!file) {
    return null;
  }
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  const imageData = await upload.post("/", formData);
  return imageData.data.url;
};

export default uploadCloudinary
