import React, { Component } from 'react';

class ConvertedValue extends Component {

  render() {

    const convertedvalue = `${(this.props.data.value*this.props.data.rate).toFixed(2)} ${this.props.data.wanted_currency}`;
    const old_value = `${this.props.data.value} ${this.props.data.currency}`;

    alert(`${old_value} is converted to ${convertedvalue}.`);
    

    return null;
  }

}
export default ConvertedValue;
