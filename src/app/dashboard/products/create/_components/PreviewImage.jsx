'use client';
import { useState } from "react";
import PreviewIcon from '../../../../../../public/images/preview-image-icon.png';

const ImageUploadPreview = ({ elementId }) => {
  const [imagePreview, setImagePreview] = useState(PreviewIcon.src);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-60" >
      <div className="flex w-60 relative" >

        {imagePreview && (
          <div className="mt-4w">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full object-cover rounded-md absolute  top-0 left-0 max-h-50"


            />
          </div>
        )}

        <div className="absolute top-0 left-0 right-0 bottom-0 w-full" >
          <input
            id={elementId}
            type="file"
            required
            name={elementId}
            accept="image/*"
            onChange={handleImageChange}
            className=" p-2 w-full sm:max-w-50 h-50  "
          />
        </div>
      </div>
    </div>
  );
};

export default ImageUploadPreview;
