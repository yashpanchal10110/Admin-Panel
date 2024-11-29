import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaImage, FaSpinner } from 'react-icons/fa';

function ImageGrid({ images, onImageClick }) {
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (imageUrl) => {
    setLoadedImages(prev => ({ ...prev, [imageUrl]: true }));
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="relative aspect-square group cursor-pointer overflow-hidden rounded-lg"
          whileHover={{ scale: 1.05 }}
          onClick={() => onImageClick(index)}
        >
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            {!loadedImages[image] && (
              <FaSpinner className="animate-spin text-gray-400 text-2xl" />
            )}
          </div>
          <img
            src={image}
            alt={`Work image ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              loadedImages[image] ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => handleImageLoad(image)}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
            <FaImage className="text-white opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default ImageGrid;