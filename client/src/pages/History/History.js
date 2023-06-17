import React from 'react';
import './history.css'
import HistoryRecord from "../HistoryRecord/HistoryRecord"

const History = () => {
  return (
    <div className="history">
      <h2>Historia użytkownika</h2>
      <div className="hotel-query-container">
        <HistoryRecord hotelName="Lewiatan" room="201" dateFrom="2023-07-12" dateTo="2023-07-19"/>
        <HistoryRecord hotelName="Biedronka" room="211" dateFrom="2023-07-30" dateTo="2023-08-02"/>
        <HistoryRecord hotelName="Lidl" room="15" dateFrom="2023-07-09" dateTo="2023-07-19"/>
      </div>
    </div>
  );
};

export default History;