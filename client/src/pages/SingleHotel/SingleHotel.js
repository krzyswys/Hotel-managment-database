import './SingleHotel.css';
import React, { useState, useEffect } from "react";
import SingleRoomComponent from '../SingleRoomComponent/SingleRoomComponent';
import SingleReviewComponent from '../SingleReviewComponent/SingleReviewComponent';
import { useParams, useSearchParams } from 'react-router-dom';
import appState from '../../State';
import { useNavigate } from 'react-router-dom';
import SidebarPanel from '../SidebarPanel/SidebarPanel';
const SingleHotel = props => {
  const [filters, setFilters] = useState({});
  const navigation = useNavigate();
  const { id } = useParams();
  const [hotel, setHotel] = useState([]); 
  const [rooms, setRooms] = useState([]);
  const [averageRating, setAverageRating] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [images, setImages] = useState([]);
  const [roomCart, setRoomCart] = useState([]);
  const [searchParams] =useSearchParams()
  
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await fetch(`http://localhost:4000/hotel/${id}`);
        const data = await response.json();
        const imagesS = await extractImageLinks(data.hotel);
        const queryParams = new URLSearchParams(removeUndefined(filters));
        const startDate = searchParams.get("startDate")
        const endDate = searchParams.get("dueDate")


        if (startDate && endDate) {
          queryParams.set('startDate', startDate);
          queryParams.set('dueDate', endDate);
        }
        const response2 = await fetch(
          `http://localhost:4000/hotel/${id}/rooms?${new URLSearchParams(queryParams)}`
        );

        const data2 = await response2.json();

        setRooms(data2.rooms);

        setHotel(data.hotel);
        setAverageRating(data.averageRating);
        setReviews(data.reviews);
        setImages(imagesS)
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };


    fetchHotel();
  }, []);
  const removeUndefined = obj => {
    Object.keys(obj).forEach(key => !obj[key] && delete obj[key])
    return obj
  }
  useEffect(() => {
    const fetchRooms = async () => {
      try {
          const queryParams = new URLSearchParams(removeUndefined(filters));
          const startDate = searchParams.get("startDate")
          const endDate = searchParams.get("dueDate")
        if (startDate && endDate) {
          queryParams.set('startDate', startDate);
          queryParams.set('endDate', endDate);
        }
        const response = await fetch(
          `http://localhost:4000/hotel/${id}/rooms?${new URLSearchParams(queryParams)}`
        );

        const data = await response.json();

        setRooms(data.rooms);
      } catch (error) {
        console.error("Błąd pobierania pokoi:", error);
      }
    };

    fetchRooms();
  }, [filters]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}.${month}.${year}`;
  };



  const [currentImage, setCurrentImage] = useState(0);
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const [slideDirection, setSlideDirection] = useState("next");
    
  async function extractImageLinks(hotel) {
    const imageArray = hotel.photos;
    const imgs = await Promise.all(imageArray.map(async (photo) => photo));
    return imgs;
  }

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
  };

  const closeEnlargedView = () => {
    setIsImageEnlarged(false);
  };

  const addRoom = (room) => {
    setRoomCart((prevCart) => prevCart.concat([room]))
  }
  const removeRoom = (room) => {
    setRoomCart((prevCart) => prevCart.filter((val) => val != room))
  }

  const addToCart = () => {
    if (roomCart.length <= 0)
      return

    appState.cart.push(
      {hotel: hotel, rooms: roomCart}
    )
    navigation("../cart")
  }

  const handleFilterSubmit = (filterValues) => {
    setFilters(filterValues);
  };

  return (
    <div className="singleHotel-body">
      <div className="header-singleHotel">
        <div className="image-slider-container" 
        
        >
          {averageRating !== 0 && (
            // <p className="review-mark singleHotel-review">{averageRating}</p>
            <p className="review-mark singleHotel-review">{Number(averageRating).toFixed(2)}</p>
          )}

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
            {hotel.name} <p>Od {formatDate(hotel.createdAt)} | {hotel.address?.country}, {hotel.address?.city}, {hotel.address?.street}, {hotel.address?.houseNumber}, {hotel.address?.postalCode}</p>
          </h2>
          <p className='dsc-singleHotel'>
            {hotel?.description}
            
          </p>
          <button className='btn-singleHotel' onClick={addToCart}>Zamów</button>
        </div>
      </div>

      <div className='room-list'>
      {rooms?.map((room) => (
          <SingleRoomComponent key={room.id} room={room} funs={{addRoom: addRoom, removeRoom: removeRoom}}/>
        ))}
      </div>
      <div className='review-list'>
        {reviews?.map((review) => (
            <SingleReviewComponent key={review.id} review={review} />
          ))}
      </div>
       <h3 className="filter-call">Filtry</h3>
      <div className="sidebar">
        <div className="sidebar-panel">
          <SidebarPanel onChange={handleFilterSubmit}/>
        </div>
      </div>
    </div>
  );
};

export default SingleHotel;

