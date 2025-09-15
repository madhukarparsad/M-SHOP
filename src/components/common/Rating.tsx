import { Star, StarHalf } from "lucide-react";
import { useState } from "react";
interface RatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  className?: string;
  reviewCount?: number;
  onChange?: (rating: number) => void;
  editable?: boolean;
}

export const Rating: React.FC<RatingProps> = ({ 
  rating, 
  size = 'md', 
  showNumber = false, 
  className = '',
  reviewCount,
  onChange,
  editable = false
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  const sizeClasses = { 
    sm: 'w-3 h-3', 
    md: 'w-5 h-5', 
    lg: 'w-6 h-6' 
  };
  
  const textSize = { 
    sm: 'text-xs', 
    md: 'text-sm', 
    lg: 'text-base' 
  };

  const displayRating = hoverRating || rating;
  const fullStars = Math.floor(displayRating);
  const hasHalfStar = displayRating % 1 >= 0.5 && displayRating % 1 !== 0;

  const handleClick = (newRating: number) => {
    if (editable && onChange) {
      onChange(newRating);
    }
  };

  const handleMouseEnter = (starValue: number) => {
    if (editable) {
      setHoverRating(starValue);
      setIsInteracting(true);
    }
  };

  const handleMouseLeave = () => {
    if (editable) {
      setHoverRating(0);
      setIsInteracting(false);
    }
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div 
        className="flex items-center"
        onMouseLeave={handleMouseLeave}
        role={editable ? 'slider' : undefined}
        aria-label={editable ? 'Product rating' : undefined}
        aria-valuenow={rating}
        aria-valuemin={0}
        aria-valuemax={5}
        tabIndex={editable ? 0 : undefined}
      >
        {[1, 2, 3, 4, 5].map((starValue) => {
          if (starValue <= fullStars) {
            return (
              <Star
                key={starValue}
                className={`${sizeClasses[size]} text-yellow-400 fill-yellow-400 cursor-${editable ? 'pointer' : 'default'}`}
                onClick={() => handleClick(starValue)}
                onMouseEnter={() => handleMouseEnter(starValue)}
                aria-hidden="true"
              />
            );
          } else if (starValue === fullStars + 1 && hasHalfStar) {
            return (
              <StarHalf
                key={starValue}
                className={`${sizeClasses[size]} text-yellow-400 fill-yellow-400 cursor-${editable ? 'pointer' : 'default'}`}
                onClick={() => handleClick(starValue - 0.5)}
                onMouseEnter={() => handleMouseEnter(starValue - 0.5)}
                aria-hidden="true"
              />
            );
          } else {
            return (
              <Star
                key={starValue}
                className={`${sizeClasses[size]} text-gray-300 cursor-${editable ? 'pointer' : 'default'}`}
                onClick={() => handleClick(starValue)}
                onMouseEnter={() => handleMouseEnter(starValue)}
                aria-hidden="true"
              />
            );
          }
        })}
      </div>
      
      {(showNumber || reviewCount) && (
        <div className="flex items-center gap-2">
          {showNumber && (
            <span className={`${textSize[size]} text-gray-700 font-medium`}>
              {rating.toFixed(1)}
            </span>
          )}
          {reviewCount !== undefined && (
            <span className={`${textSize[size]} text-gray-500`}>
              ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
            </span>
          )}
        </div>
      )}
    </div>
  );
};