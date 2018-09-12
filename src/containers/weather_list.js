import React, { Component } from "react";
import { connect } from "react-redux";
import Chart from "../components/chart";
import GoogleMap from "../components/google_map";

class WeatherList extends Component {
  renderWeather(cityData) {
    if (!cityData.main){
      return null;
    }
    const name = cityData.name;
    let temp = cityData.main.temp;
    const tempF = Math.floor(1.8 * (temp - 273) + 32);
    let visWord = "";
    const visibility = cityData.visibility;
    if (visibility < 100){
      visWord = "Zero Visibility";
    }else if (visibility < 1000){
      visWord = "Foggy Visibility"
    }else if (visibility < 5000){
      visWord = "Poor Visibility";
    }else if (visibility < 10000) {
      visWord = "Moderate Visibility";
    }else {
      visWord = "Good Visibility";
    }
    const humidity = cityData.main.humidity;
    const wind = cityData.wind.speed;
    const clouds = cityData.weather[0].description;
    const { lon, lat } = cityData.coord;
    const iconUrl = `http://openweathermap.org/img/w/${cityData.weather[0].icon}.png`;
    console.log(cityData);
    return (
      <div key={name}  id="" className="col-8 mx-auto weather">
           <div className="weather-head">
     <h1 id="location" className="text-center display-4">{name}</h1>
           <div className="row">
         <div id="description" className="description col-6 text-center">
          <img src={iconUrl} alt={clouds} />
         <p className="desc">{clouds}</p>
       </div>
       <div id="temperature" className="col-6 text-center">
        {tempF} <i id="icon-thermometer" className="wi wi-thermometer"></i>
       </div>
     </div>
     <div className="weather-body">
       <div className="row">
         <div className="humidity col-4 text-center">
           <i className="wi wi-raindrop"></i><span> Humidity</span>
         </div>
         <div className="wind col-4 text-center">
           <i className="wi wi-strong-wind"></i><span> Wind Speed</span>
         </div>
         <div className="visibility col-4 text-center">
           <i className="fa fa-eye"></i><span> Visibility</span>
         </div>
       </div>
       <div className="row">
         <div id="humidity" className="humidity-data col-4 text-center">
           {humidity}%
         </div>
         <div id="wind" className="wind-data col-4 text-center">
           {wind} mp/h
         </div>
         <div id="visibility" className="degree-data col-4 text-center">
           {visWord}
         </div>
       </div>
   </div>
 </div>
</div>
    );
  }

  render() {
    return (
      <div className="container">
			   <div className="row">
				     {this.props.weather.map(this.renderWeather)}
         </div>
      </div>
    );
  }
}

function mapStateToProps({ weather }) {
  return { weather };
}

export default connect(mapStateToProps)(WeatherList);
