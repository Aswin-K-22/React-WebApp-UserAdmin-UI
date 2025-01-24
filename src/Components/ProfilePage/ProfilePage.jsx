import { useState, useEffect } from "react";
import axios from "../../axios";
import "./ProfilePage.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfileImage } from "../../Store/slices/authSlice";
import { toast } from "react-toastify";
import defaultProfilePic from '../../assets/Default_pfp.jpg'; 

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [image, setImage] = useState({ file: '', preview: user?.profilePhoto || defaultProfilePic });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Cleanup memory leak from URL.createObjectURL
  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image.preview);
    };
  }, [image]);

  const validateFields = () => {
    const validationErrors = {};
    if (!image.file) {
      validationErrors.image = "Please select an image.";
    } else if (image.file.size > 5 * 1024 * 1024) {
      validationErrors.image = "Image size should be less than 5MB.";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
 formData.append("upload_preset", import.meta.env.VITE_APP_CLOUDINARY_PRESET)
    formData.append("folder",  import.meta.env.VITE_APP_CLOUDINARY_FOLDER);
    const response = await fetch(import.meta.env.VITE_APP_CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const data = await response.json();
    return data.secure_url;
  };

  const createProduct = async (userId, imageUrl) => {
    console.log('userId =' ,userId)
    console.log('imageUrel',imageUrl)
    const response = await axios.post("/user/profile-pic", { userId, imageUrl });
    return response.data;
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    try {
      setIsLoading(true);

      const imageUrl = await uploadImageToCloudinary(image.file);
      const response = await createProduct(user._id, imageUrl);

      dispatch(updateUserProfileImage(response.profilePhoto));
      toast.success("Profile picture updated successfully!");
      navigator('/')
    } catch (error) {
      toast.error(`Failed to update profile picture: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
  
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        toast.error("Only image files are allowed");
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) { // Max 5MB
        toast.error("File size must be less than 5MB");
        return;
      }
      
      setImage( { file: selectedFile, preview: URL.createObjectURL(selectedFile) });
    }
  };
  

  return (
    <div className="profile-page-container">
    <div className="profile-page">
      <h3 className="profile-title">Upload Profile Picture</h3>

      <label htmlFor="profile-image" className="profile-label">Image</label>
      <input
        className={`profile-input ${errors.image ? "profile-input-error" : ""}`}
        type="file"
        id="profile-image"
        accept="image/*"
        onChange={handleImageChange}
      />
      {errors.image && <div className="profile-error-message">{errors.image}</div>}

      {image?.preview ? (
        <div className="profile-image-preview">
          <img src={image.preview} alt="Selected" className="profile-preview-image" />
        </div>
      ) : (
        <div className="profile-thumbnail-placeholder">No image selected</div>
      )}

      <button
        onClick={handleSubmit}
        className="profile-upload-btn"
        disabled={isLoading}
      >
        {isLoading ? "Uploading..." : "Upload and Submit"}
      </button>
    </div>
    </div>
  );
};

export default ProfilePage;
