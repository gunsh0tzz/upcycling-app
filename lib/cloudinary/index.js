export default async function uploadImage(file) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    formData.append("folder", "reuse-app");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dgl815ovl/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    const { url } = await response.json();
    return { url };
  } catch (error) {
    console.error("Upload failed:", error.message);
    throw error;
  }
}
