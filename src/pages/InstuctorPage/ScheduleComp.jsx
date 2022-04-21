import React from "react";
import moment from "moment";

const ScheduleComp = (props) => {
  const date = moment(props.from);
  console.log(props.from);
  const month = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h6 style={{ marginBottom: "0px" }}>
              {date.date()} {month[date.month()]} {date.year()}
            </h6>
            <h6 style={{ marginBottom: "0px" }}>
              {date.subtract(7, "hours").format("HH:mm")}
            </h6>
          </div>

          <hr style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }} />
          <p className="mb-0">{props.title}</p>
        </div>
      </div>
    </>
  );
};

export default ScheduleComp;
