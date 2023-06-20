import React from 'react';
import './modifyForm.css'


class ModifyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {newBedsNumber: this.props.room.beds};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    var returnValue
    if (this.props.type == "modify-room")
      returnValue = 
      <div class="modify-form">
        <h2>Modyfikuj pokój {this.props.room.internalNumber} w hotelu {this.props.hotel.name}</h2>
        <form onSubmit={this.handleSubmit}>        
          <label>Maksymalna liczba osób:
            <input type="number" min={1} max={50} value={this.state.newBedsNumber} 
            onChange={(event) => this.setState({newBedsNumber: event.target.value})} />        
          </label>

          <input type="submit" value="Submit" />
        </form>
      </div>

    else
      console.log("Unknown form type: " + this.props.type)

    return (returnValue);
  }
}

export default ModifyForm;
