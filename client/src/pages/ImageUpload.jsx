import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const ImageUpload = ({ setShowImageUpload }) => {
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
      setShowImageUpload(false);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="image-upload">
      {selectedFile === null ? (
        <div className="file-input">
          <input
            type="file"
            accept="image/*"
            id="file-input" /* Give the input an id */
            onChange={handleFileChange}
          />

          <label htmlFor="file-input">
            <img src="/img/add-image.png" alt="Select File" />
          </label>
        </div>
      ) : (
        <p>{isLoading.uploadProfileImage ? "Uploading" : "Upload"}</p>
      )}

      <button
        onClick={handleUpload}
        disabled={isLoading.uploadProfileImage}
        className="uploadButton"
      >
        <img
          src="/img/upload-server.png"
          alt={isLoading.uploadProfileImage ? "Uploading..." : "Upload"}
        />
      </button>
      {error && <p className="error">{error}</p>}
      {notification && <p className="notification">{notification}</p>}
    </div>
  );
};

export default ImageUpload;
