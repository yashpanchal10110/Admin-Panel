import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

function ImageGallery({ images, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="relative max-w-4xl w-full">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <FaTimes className="w-6 h-6" />
          </button>

          <div className="relative">
            <img
              src={images[currentIndex]}
              alt={`Work image ${currentIndex + 1}`}
              className="w-full h-auto max-h-[80vh] object-contain"
            />

            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
            >
              <FaChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
            >
              <FaChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-4 text-center text-white">
            {currentIndex + 1} / {images.length}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default ImageGallery;