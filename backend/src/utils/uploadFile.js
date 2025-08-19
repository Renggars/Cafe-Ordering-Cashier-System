import { v4 as uuidv4 } from "uuid";
import path from "path";
import supabase from "./supabase.js";

const extractFilenameFromUrl = (url) => {
  return url?.split("/").pop();
};

const uploadFile = async (file, bucketName, oldFileUrl = null) => {
  if (!file) {
    throw new Error("File tidak ditemukan.");
  }

  if (oldFileUrl) {
    const oldFilename = extractFilenameFromUrl(oldFileUrl);
    if (oldFilename) {
      console.log("oldFilename: ", oldFilename);
      const { error: removeError } = await supabase.storage
        .from(bucketName)
        .remove([oldFilename]);

      if (removeError) {
        console.warn("Gagal menghapus file lama:", removeError.message);
      }
    }
  }

  const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;

  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(newFilename, file.buffer);

  if (uploadError) {
    throw new Error(
      `Gagal mengupload ke bucket ${bucketName}: ${uploadError.message}`
    );
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(newFilename);

  return publicUrlData.publicUrl;
};

export default uploadFile;
