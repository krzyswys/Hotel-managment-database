import {React, useState} from 'react';
import './history.css'
import HistoryRecord from "../HistoryRecord/HistoryRecord"
import appState from "../../State"

const History = () => {
  const [selectedOption, setSelectedOption] = useState("reservations");
  const onRadioChange = e => {
    setSelectedOption(e.target.value)
  }

  return (
    <div className="history">
      <h2>Profil użytkownika {appState.login}</h2>

      <div class="radio-buttons">
        <input type="radio" name="option" id="option-1"
          value="reservations" 
          checked={selectedOption === "reservations"}
          onChange={onRadioChange}
        ></input>

        <input type="radio" name="option" id="option-2"
          value="history" checked={selectedOption === "history"}
          onChange={onRadioChange}
        ></input>

        <label for="option-1" class="option option-1">
          <div class="dot"></div>
          <span>Rezerwacje</span>
        </label>
        <label for="option-2" class="option option-2">
          <div class="dot"></div>
          <span>Historia</span>
        </label>
      </div>

      {selectedOption === "reservations" &&
        <div className="hotel-query-container">
          <HistoryRecord hotelName="Żabka" room="3" dateFrom="2023-07-12" dateTo="2023-07-19"/>
        </div>
      }
      {selectedOption === "history" &&
        <div className="hotel-query-container">
          <HistoryRecord hotelName="Lewiatan" room="201" dateFrom="2023-07-12" dateTo="2023-07-19"/>
          <HistoryRecord hotelName="Biedronka" room="211" dateFrom="2023-07-30" dateTo="2023-08-02"/>
          <HistoryRecord hotelName="Lidl" room="15" dateFrom="2023-07-09" dateTo="2023-07-19"/>
        </div>
      }
    </div>
  );
};

export default History;