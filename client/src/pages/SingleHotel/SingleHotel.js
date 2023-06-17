import './SingleHotel.css';
import React, { useState } from "react";
import SingleRoomComponent from '../SingleRoomComponent/SingleRoomComponent';
import SingleReviewComponent from '../SingleReviewComponent/SingleReviewComponent';

const SingleHotel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const [slideDirection, setSlideDirection] = useState("next");
  const images = [
    require("../images/pic1.jpg"),
    require("../images/pic2.jpg"),
    require("../images/pic3.jpg"),
    require("../images/pic4.jpg"),
    require("../images/pic5.jpg"),
  ];

  // useEffect(() => {
  //   const timer = setTimeout(nextImage, 3000); 
  //   return () => clearTimeout(timer);
  // }, [currentImage]);

  const nextImage = () => {
    setSlideDirection("next");
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const previousImage = () => {
    setSlideDirection("prev");
    setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
  };
  const enlargeImage = () => {
    setIsImageEnlarged(true);
    console.log(isImageEnlarged)
  };

  const closeEnlargedView = () => {
    setIsImageEnlarged(false);
  };

  return (
    <div className="singleHotel-body">
      <div className="header-singleHotel">
        <div className="image-slider-container" 
        style={{position : isImageEnlarged ? 'static' : 'relative',
        width : isImageEnlarged ? '0px' : ''}}
        >
          <p className="review-mark singleHotel-review">4.7</p>
          <div
            className={`image-slider ${isImageEnlarged ? 'enlarged' : ''}`}
            style={{
              backgroundImage: `url("${images[currentImage]}")`,
            }}
            onClick={isImageEnlarged ? closeEnlargedView : enlargeImage}
          >
            <button
              className="slider-button left"
              onClick={(e) => {
                e.stopPropagation();
                previousImage();
              }}
            >
              &lt;
            </button>
            <button
              className="slider-button right"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              &gt;
            </button>
          </div>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560.9993791935!2d19.943737677101975!3d50.0675732715216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47165b1af992f8a3%3A0x4de5808f747be637!2sPawia%2C%2030-001%20Krak%C3%B3w!5e0!3m2!1spl!2spl!4v1686938925411!5m2!1spl!2spl'
            allowFullScreen=''
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            title='map'
          ></iframe>
        </div>
        <div className='header-text'>
          <h2>
            Nazwa hotelu <p>Od 05.05.2005</p>
          </h2>
          <p className='dsc-singleHotel'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in orem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in
          </p>
          <button className='btn-singleHotel'>Zamów</button>
        </div>
      </div>

      <div className='room-list'>
        <SingleRoomComponent/>
        <SingleRoomComponent/>
        <SingleRoomComponent/>
        <SingleRoomComponent/>
        <SingleRoomComponent/>
        <SingleRoomComponent/>
        <SingleRoomComponent/>
        <SingleRoomComponent/>
        <SingleRoomComponent/>
      </div>
      <div className='review-list'>
              <SingleReviewComponent/>
              <SingleReviewComponent/>
              <SingleReviewComponent/>
              <SingleReviewComponent/>
              <SingleReviewComponent/>
      </div>
    </div>
  );
};

export default SingleHotel;
