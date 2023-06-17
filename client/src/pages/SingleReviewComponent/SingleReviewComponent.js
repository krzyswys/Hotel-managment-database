import React from 'react';
import './singleReviewComponent.css'


const SingleReviewComponent = () => {


  return (
    <div className='body-rewiev-container' >
        <div className='profile-pic-container'></div>
        <div className='text-section'>
          <div className='revew-header'>
            <p>Nazwa</p>
            <p>05.06.2003</p>
          </div>
          <p className='rewiev-dsc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in . . .</p>

        </div>

        <div className='rewiev-value'>4.7</div>
    </div>
  );
};

export default SingleReviewComponent;

