import React from "react";
import ChartistGraph from "react-chartist";
const SunCalc = require('suncalc');
const moment = require("moment");

const TodayCard = (props) => {
    let times = SunCalc.getTimes(new Date(), props.lat, props.lon);
    let list = (times) => {
        let val = []
        let sunrise = SunCalc.getPosition(times.sunrise, props.lat, props.lon)
        let solarNoon = SunCalc.getPosition(times.solarNoon, props.lat, props.lon)
        let sunset = SunCalc.getPosition(times.sunset, props.lat, props.lon)

        //let now = SunCalc.getPosition(new Date(), props.lat, props.lon)
        val.push(sunrise.altitude)
        val.push(solarNoon.altitude)
        val.push(sunset.altitude)
        return val
    };

    let lineChartData = {
        labels: [
            moment(times.sunrise).format("h:mm[\r\n]a"), 
            moment(times.solarNoon).format("h:mm[\r\n]a"), 
            moment(times.sunset).format("h:mm[\r\n]a")],
        series: [list(times)],
    };

    let lineChartOptions = {
        chartPadding: 20,
        showArea: true,
        height: 200,
        showPoint: true,
        fullWidth: true,
        axisY: {
            showLabel: false,
            showGrid: false,
        },
        axisX: {
            showLabel: true,
            showGrid: true,
        },
    };
    return (<div>
        <div className="card-body pt-0 pb-0">
            <div className="row">
                <div className="col-6">
                    <div className="card bg-light border-0">
                        <div className="card-body p-2">
                            <h6 className="card-subtitle mb-0 font-weight-bold">
                                Sunrise
                      </h6>
                            <p className="card-text mb-0 ">
                                {moment(times.sunrise).format("h:mm a")}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="card bg-light border-0">
                        <div className="card-body p-2">
                            <h6 className="card-subtitle mb-0 font-weight-bold">
                                Sunet
                      </h6>
                            <p className="card-text mb-0">
                                {moment(times.sunset).format("h:mm a")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-12 d-flex chart-sun" style={{ width: "100%" }}>
            <ChartistGraph className="flex-grow-1"
                data={lineChartData}
                options={lineChartOptions}
                type={"Line"}
            />
        </div>
    </div>)
}

export default TodayCard