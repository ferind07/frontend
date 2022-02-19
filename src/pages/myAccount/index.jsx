import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import Navbarr from "../../components/Navbar";
import BackendUrl from "../../components/BackendUrl";
import { Form, Input } from "antd";

function MyAccount() {
  let [userData, setUserData] = useState({});

  function getInfo() {
    axios
      .get(BackendUrl + "/user/getInfo?token=" + localStorage.getItem("token"))
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getInfo();
  }, []);

  const userImage = () => {
    if (userData.image == "") {
      return <img src="/asset/image/noPic.jpg" width="100%" />;
    } else {
      return "ada gambar";
    }
  };
  return (
    <>
      <Navbarr />
      <div className="container myaccount">
        <div className="row">
          <div className="col-lg-3 col-md-4">
            <div className="card">
              <div className="card-body">
                {userImage()}
                <div className="mt-2">
                  <div className="d-flex justify-content-center">
                    <a className="text-primary">Change image</a>
                  </div>
                  <div className="d-flex justify-content-center">
                    <a className="text-danger">Delete image</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9 col-md-8">
            <div className="card">
              <div className="card-body">
                <Form></Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyAccount;
