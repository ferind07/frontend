import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import Navbarr from "../../components/Navbar";
import BackendUrl from "../../components/BackendUrl";
import { AiFillSave } from "react-icons/ai";
import { Input, notification } from "antd";

function MyAccount() {
  let [userData, setUserData] = useState({});
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState([]);
  function getInfo() {
    axios
      .get(BackendUrl + "/user/getInfo?token=" + localStorage.getItem("token"))
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
        setName(response.data.name);
        setPhoneNumber(response.data.phoneNumber);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const saveOnclick = (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append("token", localStorage.getItem("token"));
    bodyFormData.append("name", name);
    bodyFormData.append("phoneNumber", phoneNumber);

    bodyFormData.append("userProfile", image);

    axios({
      method: "post",
      url: BackendUrl + "/user/updateUser",
      data: bodyFormData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((success) => {
        if (success.data.status) {
          notification.success({
            message: "success",
            description: success.data.msg,
          });
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getInfo();
  }, []);

  const userImage = () => {
    //console.log(image.length);
    if (userData.image == "") {
      if (image.length == 0) {
        return <img src="/asset/image/noPic.jpg" width="100%" />;
      } else {
        return <img src={URL.createObjectURL(image)} width="100%" />;
      }
    } else {
      return (
        <img
          src={BackendUrl + userData.image}
          width="100%"
          style={{ aspectRatio: "4/3" }}
        />
      );
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <>
      <Navbarr instructor />
      <div className="container myaccount">
        <div className="row">
          <form encType="multipart/form-data" className="row">
            <div className="col-lg-3 col-md-4">
              <div className="card">
                <div className="card-body">
                  {userImage()}
                  <div className="mt-2">
                    <div className="">
                      <p className="text-center">Change image</p>

                      <input
                        type="file"
                        onChange={(e) => handleImageChange(e)}
                      />
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
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div class="form-group row mt-2">
                    <label
                      for="phoneNumber"
                      className="col-sm-2 col-form-label"
                    >
                      Phone
                    </label>
                    <div class="col-sm-10">
                      <Input
                        type="number"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <h5>
                      Register as {userData.role == 1 ? "User" : "Instructor"}
                    </h5>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-success"
                      onClick={(e) => saveOnclick(e)}
                    >
                      Save <AiFillSave />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default MyAccount;
