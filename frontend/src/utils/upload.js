import axios from "axios";

const upload = async (img) => {
  const data = new FormData();
  data.append("file", img);
  data.append("upload_preset", "OpusLink");

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/divvgtms6/image/upload",
      data
    );

    const { secure_url } = res.data;
    return secure_url;
  } catch (err) {
    console.error("Error uploading to Cloudinary", err);
    throw new Error("Image upload failed");
  }
};

export default upload;
