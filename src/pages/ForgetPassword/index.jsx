import React, { useState } from "react";
import Navbarr from "../../components/Navbar";
import { Input, Button, notification } from "antd";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  function forgetPassword() {
    axios
      .post(BackendUrl + "/user/forgetPassword", { email: email })
      .then((success) => {
        console.log(success);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Navbarr />
      <div className="container w-50">
        <div className="row">
          <div className="col-12 mt-4">
            <div className="card">
              <div className="card-body card-shadow">
                <h2 className="text-center">Reset Password</h2>
                <hr />
                <p className="mb-0">Email</p>
                <Input
                  className="mt-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  type="primary"
                  className="mt-2"
                  onClick={(e) => {
                    forgetPassword();
                  }}
                >
                  Reset Password
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
