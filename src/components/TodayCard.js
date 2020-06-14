import React from "react";
import ChartistGraph from "react-chartist";
const moment = require("moment");

const TodayCard = ({ data }) => {
  const imgURL = `owf owf-${data.current.weather[0].id} owf-5x ml-3`;
  let graphData = [];
  let label = data.hourly.map((entry) => {
    let newDate = new Date();
    let today = newDate.getDate();
    let day = entry.dt * 1000;
    newDate.setTime(day);
    if (today === newDate.getDate()) {
      newDate = moment(newDate).format("h a");
      graphData.push(entry.temp);
      return Math.round(entry.temp) + "°\r\n" + newDate;
    }
  });

  var lineChartData = {
    labels: label,
    series: [graphData],
  };

  var lineChartOptions = {
    showArea: true,
    width: 3000,
    showPoint: true,
    fullWidth: true,
    axisY: {
      showLabel: false,
      showGrid: false,
    },
    axisX: {
      labelInterpolationFnc: function (value) {
        return value;
      },
    },
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title d-flex align-items-center">
                <span className="font-weight-bolder display-4">
                  {Math.round(data.current.temp)}&#176;C
                </span>
                <i className={imgURL} style={{ color: "#cccccc" }}></i>
              </h5>
              <div className="scrolling-wrapper pb-0">
                <ChartistGraph
                  data={lineChartData}
                  options={lineChartOptions}
                  type={"Line"}
                />
              </div>
            </div>
            <div className="card-body pt-0">
              <div className="row">
                <div className="col-6">
                  <div className="card bg-light border-0">
                    <div className="card-body p-2">
                      <h6 className="card-subtitle mb-0 font-weight-bold">
                        Pressure
                      </h6>
                      <p className="card-text mb-0 ">
                        {data.current.pressure} hpa
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card bg-light border-0">
                    <div className="card-body p-2">
                      <h6 className="card-subtitle mb-0 font-weight-bold">
                        Humidity
                      </h6>
                      <p className="card-text mb-0">
                        {data.current.humidity} %
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayCard;
