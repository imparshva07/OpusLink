import axios from "axios";

const upload = async (img) => {
  const data = new FormData();
  data.append("file", img); // The field name for the file must be 'file', not 'img'
  data.append("upload_preset", "OpusLink"); // Must match the exact name of the preset

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/divvgtms6/image/upload",
      data
    );

    const { secure_url } = res.data; // Use "secure_url" for HTTPS URL
    return secure_url;
  } catch (err) {
    console.error("Error uploading to Cloudinary", err);
    throw new Error("Image upload failed");
  }
};

export default upload;
