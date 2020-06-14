import React, { Component } from "react";
import DayCard from "./DayCard";
import TodayCard from "./TodayCard";
import Search from "./Search";

class WeekContainer extends Component {

  state = {
    fullData: [],
    dailyData: [],
    todayData: {},
    lat: "",
    lon: ""
  };

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        let newState = Object.assign({}, this.state);
        newState.lat = position.coords.latitude;
        newState.lon = position.coords.longitude;
        this.setState(newState);
        this.todayData();
        this.weekData();
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      }
    );
  };

  weekData = () => {
    const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.state.lat}&lon=${this.state.lon}&units=metric&APPID=cd560ab35155732fa68beb957bb86d18`;

    fetch(weatherURL)
      .then((res) => res.json())
      .then((data) => {
        const dailyData = data.list.filter((reading) =>
          reading.dt_txt.includes("18:00:00")
        );
        let newState = Object.assign({}, this.state);
        newState.fullData = data.list;
        newState.dailyData = dailyData
        this.setState(newState);
      });
  }

  todayData = () => {
    console.log("call")
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lon}&exclude=minutely,daily&appid=cd560ab35155732fa68beb957bb86d18&units=metric`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let newState = Object.assign({}, this.state);
        newState.todayData = Object.assign({}, data);
        this.setState(newState);
      });
  }

  formatDayCards = () => {
    return this.state.dailyData.map((reading, index) => (
      <DayCard reading={reading} key={index} />
    ));
  };

  handleCity = (coord) => {
    let newState = Object.assign({}, this.state);
    newState.lat = coord[0];
    newState.lon = coord[1];
    this.setState(newState);
    this.todayData();
    this.weekData();
  }

  render() {
    return (
      <div className="pt-2">
        <Search onCity={this.handleCity} />
        <div className="container">
          <div className="scrolling-wrapper d-flex justify-content-lg-around">
            {this.formatDayCards()}
          </div>
        </div>
        {Object.keys(this.state.todayData).length === 0 ? <div className="center-text">Please allow location or use the search </div> : <TodayCard data={this.state.todayData} />}
      </div>
    );
  }
}

export default WeekContainer;
