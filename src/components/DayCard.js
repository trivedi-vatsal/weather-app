import React from "react";
const moment = require("moment");

const DayCard = ({ reading }) => {
  let newDate = new Date();
  const weekday = reading.dt * 1000;
  newDate.setTime(weekday);
  // const imgURL = `owf owf-${reading.weather[0].id} owf-5x`;

  return (
    <div>
      <div className="day-card text-center">
        <p className="font-weight-bold ">{moment(newDate).format("ddd")}</p>
        <p>
          <span className="font-weight-bold">
            {Math.round(reading.main.temp_max)}&#176;
          </span>
          <span> {Math.round(reading.main.temp_min)}&#176;</span>
        </p>
        <img
          src={`http://openweathermap.org/img/wn/${reading.weather[0].icon}@2x.png`}
          alt=""
        />
        <p>{reading.weather[0].main}</p>
      </div>
    </div>
  );
};

export default DayCard;
