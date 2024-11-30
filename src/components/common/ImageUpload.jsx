import { useState, useRef } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../utils/firebase';
import { FaUpload, FaSpinner } from 'react-icons/fa';

function ImageUpload({ onImageUpload, currentImage }) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentImage || '');
  const fileInputRef = useRef(null);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      
      // Create preview URL
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);

      // Upload to Firebase Storage
      const storageRef = ref(storage, `images/${Date.now()}-${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);

      onImageUpload(downloadUrl);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div 
        className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-500"
        onClick={() => fileInputRef.current?.click()}
      >
        {previewUrl ? (
          <div className="relative">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="mx-auto max-h-48 rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
              <span className="text-white">Change Image</span>
            </div>
          </div>
        ) : (
          <div className="py-8">
            {isUploading ? (
              <FaSpinner className="animate-spin h-8 w-8 mx-auto text-gray-400" />
            ) : (
              <>
                <FaUpload className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Click to upload an image
                </p>
              </>
            )}
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={isUploading}
        />
      </div>
      {isUploading && (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Uploading...
        </p>
      )}
    </div>
  );
}

export default ImageUpload;