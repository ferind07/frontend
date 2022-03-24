import React, { useEffect, useState } from "react";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";
import Calendar from "react-awesome-calendar";

const MySchedule = (props) => {
  return (
    <div className="row">
      <p>{props.listEvent.length}</p>
      <div className="col-12">
        <Calendar events={props.listEvent} />
      </div>
    </div>
  );
};

export default MySchedule;
