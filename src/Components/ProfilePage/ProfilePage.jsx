import { useEffect, useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {  FaEdit } from 'react-icons/fa';
import axios from '../../axios';
import './ProfilePage.css';
import { useDispatch, useSelector } from 'react-redux';
import defaultProfilePic from '../../assets/Default_pfp.jpg';
import { updateUserProfileImage } from '../../Store/slices/authSlice';
import { useNavigate } from 'react-router-dom';





const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const navigate = useNavigate();
  const [crop, setCrop] = useState({
    unit: '%', // Defaults to percentages
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    aspect: 1,
  });
  
  const [deleteImage, setDeleteImage] = useState(false);


  useEffect(() => {
    if (user === null) {
      navigate('/login');
    }
  }, [user , navigate]);
  

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        alert('Invalid file type. Please upload a JPEG, PNG, or WEBP image.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // Limit to 5MB
        alert('File size exceeds 5MB. Please upload a smaller image.');
        return;
      }
      setSelectedImage(URL.createObjectURL(file));
      setCroppedImage(null);
    }
  };
  

  const handleCropComplete = (crop) => {
    if (
      !crop ||
      typeof crop.x === 'undefined' ||
      typeof crop.y === 'undefined' ||
      typeof crop.width === 'undefined' ||
      typeof crop.height === 'undefined'
    ) {
      console.error('Invalid crop data:', crop);
      return;
    }

    console.log('Crop object:', crop);

  
    if (selectedImage) {
      const image = new Image();
      image.src = selectedImage;
  
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
  
        canvas.width = crop.width;
        canvas.height = crop.height;
  
        const ctx = canvas.getContext('2d');
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );
  
        const croppedDataUrl = canvas.toDataURL('image/jpeg');
        setCroppedImage(croppedDataUrl);
      };
    }
  };
  



  // const handleResetProfilePic = () => {
  //   setCroppedImage(null);
  //   setSelectedImage(null);
  // };



  const handleSaveProfilePic = async () => {
      if (!croppedImage && !selectedImage && !deleteImage) return;
  console.log('"""""""""""""""-croperd  Image""""""""""-----',croppedImage)
  console.log('"""""""""""""""-selectedImage""""""""""-----',selectedImage)
      try {
        const payload = {
          image: croppedImage || selectedImage  ,
      };
      console.log('Sending payload:', payload);
      const response = await axios.post('/user/profile-pic', payload, {
        headers: { 'Content-Type': 'application/json' },
    });

    console.log('Profile picture updated:', response.data);
    dispatch(updateUserProfileImage(response.data.profilePhoto));

  
          
          alert('Profile picture updated successfully!');
          setDeleteImage(false);
          setSelectedImage(null);
          setCroppedImage(null);
      } catch (error) {
          console.error('Error saving profile picture:', error);
      }
  };
  
  // const handleDeleteProfilePic = async () => {
  //     try {
  //         if (!window.confirm('Are you sure you want to delete your profile picture?')) return;
  
  //         setDeleteImage(true);
  
  //         const response = await axios.delete('/user/profile-pic', {
  //             data: { delete: true },
  //         });
  
  //         console.log('Profile picture deleted:', response.data);
  
  //         dispatch(updateUserProfileImage(null));
          
  //         alert('Profile picture deleted successfully!');
  //         setDeleteImage(false);
  //         setSelectedImage(null);
  //         setCroppedImage(null);
  //     } catch (error) {
  //         console.error('Error deleting profile picture:', error);
  //         alert('Failed to delete profile picture.');
  //     }
  // };

  console.log('Redux state - user:', user);

  

  

  return (
<div className="profile-page">
  <h1>Profile Page</h1>
  <div className="profile-pic-container">
    {user?.profilePhoto ? (
      <img
        src={croppedImage || `${import.meta.env.VITE_API_BASE_URL}${user.profilePhoto}` || defaultProfilePic}
        alt="Profile"
        className="profile-pic canvas-placeholder"
      />
    ) : (
      <img
        src={croppedImage || defaultProfilePic}
        alt="Profile"
        className="profile-pic"
      />
    )}
    <div className="profile-pic-buttons">
      <label htmlFor="upload-input" className="upload-button">
        <FaEdit /> Upload Image
        <input
          id="upload-input"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          hidden
        />
      </label>
      {/* <button className="delete-button" onClick={handleDeleteProfilePic}>
        <FaTrash /> Delete Image
      </button> */}
      {/* {selectedImage && (
        <button className="reset-button" onClick={handleResetProfilePic}>
          <FaUndo /> Reset
        </button>
      )} */}
    </div>
  </div>
  {selectedImage && (
    <>
    <div className="react-crop-container">
      <ReactCrop
        crop={crop}
        onChange={(newCrop) => setCrop(newCrop)}
        onComplete={handleCropComplete}
        aspect={1}
      >
        <img src={selectedImage} alt="Selected" />
      </ReactCrop>
      </div>
      <button className="save-button" onClick={handleSaveProfilePic}>
        Save Profile Picture
      </button>
    </>
  )}
</div>

  );
};

export default ProfilePage;
