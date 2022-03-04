import React from "react";

const UnconfirmedSchedule = (props) => {
  const listSubmission = props.subMission;
  return (
    <>
      <div className="row">
        <div className="col-12" style={{ height: "100vh", overflowY: "auto" }}>
          {listSubmission.length}
          {listSubmission.map((subMissionItem) => {
            const dateStart = new Date(subMissionItem.dateStart);
            const dateStartString =
              dateStart.getDate() +
              "/" +
              (dateStart.getMonth() + 1) +
              "/" +
              dateStart.getFullYear() +
              " " +
              dateStart.getHours() +
              ":" +
              dateStart.getMinutes();
            const dateEnd = new Date(subMissionItem.dateEnd);
            const dateEndString =
              dateEnd.getDate() +
              "/" +
              (dateEnd.getMonth() + 1) +
              "/" +
              dateEnd.getFullYear() +
              " " +
              dateEnd.getHours() +
              ":" +
              dateEnd.getMinutes();
            return (
              <>
                <div className="card">
                  <div className="card-body">
                    <p>Submission id : {subMissionItem.id}</p>
                    <h6>{subMissionItem.title} Class</h6>
                    <p>
                      Apply by <a href="">{subMissionItem.name}</a>
                    </p>
                    <h6>
                      {dateStartString} to {dateEndString}
                    </h6>
                    <button className="btn btn-primary" onClick={(e) => {}}>
                      Accept class
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default UnconfirmedSchedule;
