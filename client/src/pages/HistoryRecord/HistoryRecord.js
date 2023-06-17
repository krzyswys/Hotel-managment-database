import React from 'react';
import './historyRecord.css'

class HistoryRecord extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div class="history-record">
        <h3>{ this.props.hotelName }</h3>
        <p>Pokój: { this.props.room }</p>
        <p>Data: { this.props.dateFrom } - { this.props.dateTo }</p>
      </div>
    )
  }
}

export default HistoryRecord;
