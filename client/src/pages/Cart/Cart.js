import React from 'react';
import './cart.css'
import appState from '../../State';
import { useNavigate } from 'react-router-dom';


const Cart = () => {
    const navigation = useNavigate();

    const MakeReservation = (userLogin, hotel, room) => {
        if (!appState.isLoggedIn)
            navigation("../login")
        else
            console.log("Making a reservation not implemented! \n(Login: "+userLogin+", hotel:"+hotel+", room:"+room+")")
    }

    const elementsInCart = [];
    for (const element of appState.cart) {
        const roomElements = [];
        for (const room of element.rooms)
            roomElements.push(
            <div class="room-record">
                <p>Pokój { room.internalNumber }</p>
                <button onClick={() => MakeReservation(appState.login, element.hotel, room)}>Zamów</button>
            </div>
            );

        elementsInCart.push(<div class="cart-record">
            <h3>Hotel: { element.hotel.name }</h3>
            { roomElements }
            <br/>
        </div>)
    }
    
  return (
    <div class="cart">
        <h2>Koszyk uzytkownika</h2>
        {appState.cart.length == 0 &&
        <p>Koszyk jest pusty.</p>
        }
        {appState.cart.length > 0 &&
        <div class="cart-elements">
            { elementsInCart }
        </div>
        }
    </div>
    // <p>Test</p>
  );
};

export default Cart;