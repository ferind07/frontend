import React from "react";
import BackendUrl from "../../components/BackendUrl";
import moment from "moment";

const ScheduleCard = (props) => {
  const today = new Date(props.submissionDetail.timeInsert);
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  var formatteddatestr = moment(props.submissionDetail.timeInsert).format(
    "hh:mm a"
  );
  const dateStr = dd + "/" + mm + "/" + yyyy + " " + formatteddatestr;

  return (
    <>
      <div className="card mt-2">
        <div className="card-body">
          <div className="row">
            <div className="col-12 col-md-4">
              <img
                src={BackendUrl + props.submissionDetail.image}
                style={{ width: "100%", aspectRatio: "4/3" }}
              />
            </div>
            <div className="col-8">
              <h5>{props.submissionDetail.title} Class</h5>
              <p>With {props.submissionDetail.iName}</p>
              <p>Applied at {dateStr}</p>
              <p>
                Status{" "}
                {props.submissionDetail.status == 4
                  ? "Expired"
                  : props.submissionDetail.status}
              </p>
              <button className="btn btn-primary">Detail</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleCard;
