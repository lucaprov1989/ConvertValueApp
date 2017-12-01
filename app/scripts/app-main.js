import React, { Component } from 'react';
import ValuesForm from './ValuesForm';
import ConvertedValue from './ConvertedValue';
import Config from './Config';

class App extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      allCurrencies: [],
      possibleCurrencies: []
    };
  }



  

  render() {
    return (
      <div>
      <h1 className="text-center"> React Convert Value App</h1>
        <ValuesForm data={this.state} getCurrencies={this.getCurrencies.bind(this)} convertCurrency={this.convertCurrency.bind(this)} /> 
        {/* if we have rate we render*/}
        {this.state.rate > 0 && <ConvertedValue data={this.state}/>}
      </div>
    )

  } 
  //The api request method
  fetchApi(url) {
    fetch(url).then((res) => res.json()).then((data) => {
      // update state with all possible currencies
      let allCurrencies, possibleCurrencies;

      [allCurrencies, possibleCurrencies] = processCurrencies(data); 

      this.setState({ 
        allCurrencies: allCurrencies,
        possibleCurrencies: possibleCurrencies,
        rates: data.rates,
        //rate to 0 so it does not render again the converted value alert
        rate: 0
      })

    })

    // .catch((err) => console.log('Currencies not found'))
  } // end function

  getCurrencies(currency) {

    let url = currency ? `${Config.urlApi}?base=${currency}` : Config.urlApi;
    this.fetchApi(url);
  } 

  convertCurrency(data) {
    //if option is not selected || data.currency == data.wanted_currency
    if(!data.wanted_currency || !data.currency ){
      alert('Select a currency!');
    }
    //else look for the rate to convert
    else {

        let rate = findRate(data.rates, data.wanted_currency);

        //update state to render the alert with the converted value
          this.setState({ 
            rate: rate,
            value: data.value,
            wanted_currency: data.wanted_currency,
            currency: data.currency
          })

    } 
  }//end convertcurrency

  //fetch api at start
  componentDidMount() {
    let url = Config.urlApi 
    this.fetchApi(url)
  }
} // } // END CLASS - APP

/*Use Case Functions*/

let findRate = (rates, wantedCurrency) => {
  let rateFound;
  //(let rate of Object.keys(rates))
  Object.keys(rates).forEach( rate => { 
    if(rate == wantedCurrency){
      rateFound = rates[rate];
    }
  })
  return rateFound;
}

let processCurrencies = data => {

  let allCurrencies = [], possibleCurrencies = [];
  allCurrencies.push('',data.base), possibleCurrencies.push('');
  //(let rate of Object.keys(rates))
  Object.keys(data.rates).forEach( rate => { 
  allCurrencies.push(rate), possibleCurrencies.push(rate);
  })

  allCurrencies.sort(), possibleCurrencies.sort();
  ;
  return [allCurrencies, possibleCurrencies];
}
module.exports = App;
