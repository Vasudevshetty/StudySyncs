import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const ImageUpload = () => {
  const { uploadProfileImage, isLoading, error, notification } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    try {
      await uploadProfileImage(selectedFile);
      setSelectedFile(null); // Clear the file input after upload
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="upload-component">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={isLoading.uploadProfileImage}>
        {isLoading.uploadProfileImage ? "Uploading..." : "Upload"}
      </button>
      {error && <p className="error">{error}</p>}
      {notification && <p className="notification">{notification}</p>}
    </div>
  );
};

export default ImageUpload;
