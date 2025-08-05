'use client';
import { useState } from "react";
import { Upload, FileImage, X } from "lucide-react";

const ImageUploadPreview = ({ elementId }) => {
  const [imagePreview, setImagePreview] = useState(null);

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

  const removeImage = () => {
    setImagePreview(null);
    const input = document.getElementById(elementId) as HTMLInputElement | null;
    if (input) {
      input.value = '';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
        
        {/* Área de preview/upload */}
        <div className="w-full h-60 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 overflow-hidden">
          
          {imagePreview ? (
            // Preview da imagem
            <div className="relative w-full h-full">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
              
              {/* Botão de remover */}
              <button
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
              
              {/* Overlay para trocar imagem */}
              <div className="absolute inset-0 bg-transparent bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                <div className="text-white opacity-0 hover:opacity-100 transition-opacity duration-200">
                  <Upload className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Clique para trocar</p>
                </div>
              </div>
            </div>
          ) : (
            // Estado inicial sem imagem
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <FileImage className="w-8 h-8" />
              </div>
              <p className="text-lg font-medium mb-2">Adicionar imagem</p>
              <p className="text-sm text-center px-4">
                Clique ou arraste uma imagem aqui
              </p>
              <p className="text-xs text-gray-400 mt-2">
                PNG, JPG ou JPEG
              </p>
            </div>
          )}
        </div>

        {/* Input file invisível */}
        <input
          id={elementId}
          type="file"
          required
          name={elementId}
          accept="image/*"
          onChange={handleImageChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ImageUploadPreview;