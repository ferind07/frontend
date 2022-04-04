import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";
const HtmlToReactParser = require("html-to-react").Parser;

const InstructorDetailClass = () => {
  const { id } = useParams();

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

  function deleteClass(e) {
    e.preventDefault();
  }

  useEffect(() => {
    laodClass();
  }, []);

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h6 className="text-muted">Class id : {classDetail.id}</h6>
                <h4>{classDetail.title}</h4>
                <img
                  src={BackendUrl + classDetail.image}
                  width="100%"
                  style={{ aspectRatio: "4/3" }}
                />
                <p className="mt-2">
                  Number of class : {classDetail.classCount}
                </p>
                <hr />
                <h4>Detail Class</h4>
                {htmlToReactParser.parse(classDetail.detail)}
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    deleteClass(e);
                  }}
                >
                  Delete Class
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorDetailClass;
