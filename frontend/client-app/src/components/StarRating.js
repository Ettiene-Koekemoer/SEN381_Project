import React from 'react';
import '../styling/App.css'; 

const StarRating = ({ rating, setRating }) => {
  const stars = Array(5).fill(0); 

  return (
    <div className="star-rating">
      {stars.map((_, index) => (
        <span
          key={index}
          className={`star ${index < rating ? 'filled' : ''}`}
          onClick={() => setRating(index + 1)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
