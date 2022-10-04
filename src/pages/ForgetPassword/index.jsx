import React, { useState } from "react";
import Navbarr from "../../components/Navbar";
import { Input, Button, notification } from "antd";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  function validateEmail(email) {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
      return true;
    } else {
      if (email == "") {
        //message.error("Insert email");
        notification.error({
          message: "Error",
          description: "Please insert email",
        });
        return false;
      }
      //message.error("Wrong email");
      notification.error({
        message: "Error",
        description: "Wrong email format",
      });
      return false;
    }
  }

  function forgetPassword() {
    if (validateEmail(email)) {
      axios
        .post(BackendUrl + "/user/forgetPassword", { email: email })
        .then((success) => {
          console.log(success);
          if (success.data.status == false) {
            notification.error({
              message: "Error",
              description: success.data.msg,
            });
          } else {
            notification.success({
              message: "Success",
              description: success.data.msg,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <>
      <Navbarr />
      <div className="container-login">
        <div className="container">
          <div className="row">
            <div className="col-12 mt-4">
              <div className="card">
                <div className="card-body card-shadow">
                  <h2 className="text-center">Reset Password</h2>
                  <hr />
                  <div className="d-flex justify-content-start">
                    <p className="mb-0">Email</p>
                  </div>

                  <Input
                    className="mt-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="d-flex justify-content-end">
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
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
