import {React, useEffect, useState} from 'react';
import './managerView.css'
import ModifyForm from '../ModifyForm/ModifyForm';

const ManagerView = () => {
  const [hotels, setHotels] = useState([]);
  const [isDisplayed, setDisplayed] = useState([]);
  const [isFormOpen, setFormOpen] = useState(false);

  const [modifiedRoom, setModifiedRoom] = useState();
  const [modifiedHotel, setModifiedHotel] = useState();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('http://localhost:4000/hotels');
        const data = await response.json();
        setHotels(data.hotels)
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    }; 

    fetchHotels();
  }, []);

  const swapHotelDisplay = (hotel, index) => {
    var displArr
    if (isDisplayed.length == 0)
      displArr = hotels.map(hotel => false)
    else
      displArr = isDisplayed
    setDisplayed(displArr.map((_, i) => (i == index) ? !displArr[i] : displArr[i]))
  } 

  const removeRoom = (hotel, room) => {
    console.log("Removing room unimplemented.")
  }

  const modifyRoom = (hotel, room) => {
    console.log("Modifying room unimplemented.")
    setModifiedRoom(room)
    setModifiedHotel(hotel)
    setFormOpen(true)
  }

  const addNewRoom = (hotel) => {
    console.log("Adding room unimplemented.")
  }

  const handleModifyRoomSubmit = (output) => {
    console.log("Handling room modification unimplemented. (From "+modifiedRoom.beds+" to "+output.newBedsNumber+")")
    setFormOpen(false)
  }

  var returnValue
  if (isFormOpen)
    returnValue = <ModifyForm 
    type="modify-room" 
    onSubmit={handleModifyRoomSubmit}
    hotel={modifiedHotel} 
    room={modifiedRoom}>
    </ModifyForm>
    // returnValue = <h2>Test</h2>
  else
    returnValue = 
      <div className="manager-view">
        <h1>Widok menedżera</h1>
        <ul class="hotels-list">
            {hotels?.map((hotel, index) => (
              <li>{hotel.Id}{hotel.name}

                {!isDisplayed[index] &&
                <button onClick={() => swapHotelDisplay(hotel, index)}>Rozwiń szczegóły</button>}

                {isDisplayed[index] &&
                <div>
                  <button onClick={() => swapHotelDisplay(hotel, index)}>Schowaj szczegóły</button>
                  <button class="modify" onClick={() => addNewRoom(hotel, index)}>Dodaj pokój</button>
                </div>}

                {isDisplayed[index] &&
                <ul class="rooms-list">
                  {hotel.rooms.map((room, index) => (
                    <li>
                      Pokój <b>{room.internalNumber}</b>, liczba miejsc: <b>{room.beds}</b>
                      <button class="remove" onClick={() => removeRoom(hotel, room)}>Usuń</button>
                      <button class="modify" onClick={() => modifyRoom(hotel, room)}>Modyfikuj</button>
                    </li>
                  ))}
                </ul>}
                <hr></hr>
              </li>
            ))}
        </ul>
      </div>
  
  return (
    returnValue
  );
};

export default ManagerView;