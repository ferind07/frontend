import React from "react";
import moment from "moment";
import BackendUrl from "../../components/BackendUrl";
import { useNavigate } from "react-router-dom";

const UnconfirmedSchedule = (props) => {
  const listSchedule = props.scheduleList;
  const navigate = useNavigate();
  return (
    <>
      <div className="row">
        <div className="col-12" style={{ height: "100vh", overflowY: "auto" }}>
          {listSchedule.length}
          {listSchedule.map((detailSchedule) => {
            const today = new Date(detailSchedule.timeInsert);
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1; // Months start at 0!
            let dd = today.getDate();

            if (dd < 10) dd = "0" + dd;
            if (mm < 10) mm = "0" + mm;

            var formatteddatestr = moment(detailSchedule.timeInsert).format(
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
                          src={BackendUrl + detailSchedule.image}
                          style={{ width: "100%", aspectRatio: "4/3" }}
                        />
                      </div>
                      <div className="col-8">
                        <h5>{detailSchedule.title} Class</h5>
                        <p>With {detailSchedule.iName}</p>
                        <p>Applied at {dateStr}</p>
                        <p>
                          Status{" "}
                          {detailSchedule.status == 4
                            ? "Expired"
                            : detailSchedule.status}
                        </p>
                        <button
                          className="btn btn-primary"
                          onClick={(e) => {
                            navigate(
                              "/instructor/detailSchdule/" + detailSchedule.id
                            );
                          }}
                        >
                          Detail
                        </button>
                      </div>
                    </div>
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
