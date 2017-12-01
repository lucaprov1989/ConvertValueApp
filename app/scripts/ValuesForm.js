
import React, { Component } from 'react';

class ValuesForm extends Component {


  constructor(props) {
    super(props);
    this.state = {
      value: 0, 
      currency: this.props.data.currencyToConvert, 
      wanted_currency: this.props.data.wanted_currency
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;

    this.setState({
      [name]: e.target.value
    });

    if(name == 'currency')
        this.props.getCurrencies(e.target.value); //update possible currencies
  }
  handleSubmit(event) { //call API to convert currency
    event.preventDefault();

    let data = this.state;
    data.rates = this.props.data.rates;
    //reset state
    this.setState({
      wanted_currency: '',
      value: 0,
      currency: ''
    })
    this.props.convertCurrency(data);
  }

  render() {
    let {value,currency,wanted_currency} = this.state;

    let disable;
    if(value == 0 || !currency || !wanted_currency){
      disable = true;
    }
    
    //map all currencies from api
    let allCurrenciesOptions = this.props.data.allCurrencies.map((option, index) =>
      <option key={index} value={option}>{option}</option>
    );
    //map possible currencies from api
    let possibleCurrenciesOptions = this.props.data.possibleCurrencies.map((option, index) =>
      <option key={index} value={option}>{option}</option>
    );

    return (
      <form className="container">
        <div className="row">
          <div className="form-group col-xs-4">
              <label className="control-label col-xs-10">
                  Value:
                  <input className="form-control" type="number" value={value} name="value" onChange={this.handleChange}/>
              </label>
          </div>
          <div className="form-group col-xs-4">
              <label className="control-label col-xs-10">
                  Currency:
                  <select className="form-control" value={currency} onChange={this.handleChange} name="currency">
                  {allCurrenciesOptions}
                  </select>
              </label>
          </div>
          <div className="form-group col-xs-4">
              <label className="control-label col-xs-10">
                  Wanted Currency:
                  <select  className="form-control" value={wanted_currency} onChange={this.handleChange} name="wanted_currency">
                      {possibleCurrenciesOptions}
                  </select>
              </label>
          </div>
          <div className="form-group">        
            <div className="text-center">
              <input type="submit" className="btn btn-success" disabled = {disable} onClick={this.handleSubmit} value="Submit" />
            </div>
          </div>
        </div>
      </form>
    );
  }
}
export default ValuesForm;
