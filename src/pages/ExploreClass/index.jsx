import React, { useEffect, useState } from "react";
import Navbarr from "../../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";
import NumberFormat from "react-number-format";
import moment from "moment";
import { notification } from "antd";
const HtmlToReactParser = require("html-to-react").Parser;

const ExploreClass = () => {
  let { id } = useParams();
  const [classDetail, setClassDetail] = useState({});

  const htmlToReactParser = new HtmlToReactParser();

  function laodClass() {
    axios
      .get(BackendUrl + "/user/getClassDetail?id=" + id)
      .then((success) => {
        setClassDetail(success.data);
        console.log(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const renderJumlahClass = () => {
    const element = [];
    if (classDetail.classCount) {
      for (let index = 0; index < classDetail.classCount; index++) {
        element.push(
          <>
            <h5 className="mt-2 mb-0">Select time {index + 1}</h5>
            <input type="datetime-local" id={"time" + (index + 1)} />
          </>
        );
      }
    }
    return element;
  };

  useEffect(() => {
    //console.log("explore class");
    laodClass();
  }, []);

  function submitClass(e) {
    e.preventDefault();
    if (localStorage.getItem("token") == null) {
      notification.error({
        message: "Error",
        description: "You must login first",
      });
    } else {
      const token = localStorage.getItem("token");
      const idClass = id;
      const idInstructor = classDetail.idInstructor;
      let dateStart = [];
      let dateEnd = [];
      //dateEnd = moment(dateEnd).format("YYYY-MM-DD HH:mm:ss");
      for (let index = 0; index < classDetail.classCount; index++) {
        dateStart.push(
          moment(document.getElementById("time" + (index + 1)).value).format(
            "YYYY-MM-DD HH:mm:ss"
          )
        );
        const tdateEnd = moment(
          document.getElementById("time" + (index + 1)).value
        )
          .add(classDetail.duration, "m")
          .toDate();
        dateEnd.push(moment(tdateEnd).format("YYYY-MM-DD HH:mm:ss"));
      }

      axios
        .post(BackendUrl + "/user/submissionClass", {
          token: token,
          idClass: idClass,
          idInstructor: idInstructor,
          dateStart: dateStart,
          dateEnd: dateEnd,
        })
        .then((success) => {
          console.log(success);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  return (
    <>
      <Navbarr />
      <div className="container mt-3">
        <div className="row">
          <div className="col-12">
            <div className="card card-shadow">
              <div className="card-body">
                <h1>{classDetail.title} Course</h1>
                <div className="row">
                  <div className="col-md-6">
                    <img src={BackendUrl + classDetail.image} width="100%" />
                  </div>
                  <div className="col-md-6">
                    <h5 className="mb-0">Duration</h5>
                    <p>{classDetail.duration} minute</p>
                    <h5 className="mb-0">Class count</h5>
                    <p>{classDetail.classCount} Class</p>
                    <h5 className="mb-0">Price</h5>
                    <NumberFormat
                      value={classDetail.price}
                      displayType="text"
                      thousandSeparator
                      prefix="Rp. "
                    />

                    {renderJumlahClass()}
                    <br />
                    <button
                      className="btn btn-success mt-2"
                      onClick={(e) => {
                        submitClass(e);
                      }}
                    >
                      Book
                    </button>
                  </div>
                </div>
                <h5 className="mt-2">Detail Course</h5>
                {htmlToReactParser.parse(classDetail.detail)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExploreClass;