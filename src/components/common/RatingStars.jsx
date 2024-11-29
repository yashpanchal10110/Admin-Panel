import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

function RatingStars({ rating = 0, size = 'sm' }) {
  // Ensure rating is a valid number between 0 and 5
  const validRating = Math.min(Math.max(Number(rating) || 0, 0), 5);
  
  const fullStars = Math.floor(validRating);
  const hasHalfStar = validRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const starClass = sizeClasses[size];

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className={`text-yellow-400 ${starClass}`} />
      ))}
      {hasHalfStar && <FaStarHalfAlt className={`text-yellow-400 ${starClass}`} />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} className={`text-yellow-400 ${starClass}`} />
      ))}
      <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">{validRating.toFixed(1)}</span>
    </div>
  );
}

export default RatingStars;