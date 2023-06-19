import React from 'react';
import './cart.css'
import appState from '../../State';

const Cart = () => {
    const elementsInCart = [];
    for (const element of appState.cart) {
        const roomNumbers = [];
        for (const room of element.rooms)
            roomNumbers.push(<p>Pokój { room.internalNumber }</p>);

        elementsInCart.push(<div class="cart-record">
            <h3>Hotel: { element.hotel.name }</h3>
            { roomNumbers }
            <br/>
        </div>)
    }
    
  return (
    <div class="cart">
        { elementsInCart }
    </div>
    // <p>Test</p>
  );
};

export default Cart;