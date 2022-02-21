import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import Navbarr from "../../components/Navbar";
import BackendUrl from "../../components/BackendUrl";
import { AiFillSave } from "react-icons/ai";
import { Input } from "antd";

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
                <div className="form-group row">
                  <label for="email" className="col-sm-2 col-form-label">
                    Email
                  </label>
                  <div class="col-sm-10">
                    <Input
                      type="text"
                      id="email"
                      readOnly
                      value={userData.email}
                    />
                  </div>
                </div>
                <div class="form-group row mt-2">
                  <label for="name" className="col-sm-2 col-form-label">
                    Name
                  </label>
                  <div class="col-sm-10">
                    <Input
                      type="text"
                      id="name"
                      readOnly
                      value={userData.name}
                    />
                  </div>
                </div>
                <div class="form-group row mt-2">
                  <label for="phoneNumber" className="col-sm-2 col-form-label">
                    Phone
                  </label>
                  <div class="col-sm-10">
                    <Input
                      type="number"
                      id="phoneNumber"
                      readOnly
                      value={userData.phoneNumber}
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <h5>
                    Register as {userData.role == 1 ? "User" : "Instructor"}
                  </h5>
                </div>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-success">
                    Save <AiFillSave />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyAccount;
