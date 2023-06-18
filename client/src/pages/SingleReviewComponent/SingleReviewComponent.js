import React from 'react';
import './singleReviewComponent.css'


const SingleReviewComponent = ({review}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}.${month}.${year}`;
  };


  return (
    <div className='body-rewiev-container' >
        <div className='profile-pic-container'></div>
        <div className='text-section'>
          <div className='revew-header'>
            <p>{review.name}</p>
            <p>{formatDate(review.createdAt)}</p>
          </div>
          <p className='rewiev-dsc'>{review.content}</p>

        </div>

        <div className='rewiev-value'>{review.stars}</div>
    </div>
  );
};

export default SingleReviewComponent;

