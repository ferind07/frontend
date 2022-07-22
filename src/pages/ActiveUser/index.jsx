import React, { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BackendUrl from "../../components/BackendUrl";
import { notification } from "antd";

const ActiveUser = () => {
  let { id } = useParams();

  const navigate = useNavigate();

  function activateUser() {
    axios
      .post(BackendUrl + "/user/activeUser", {
        id: id,
      })
      .then((success) => {
        if (success.data.status == true) {
          notification.success({
            message: "Success",
            description: success.data.msg,
          });
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    activateUser();
  }, []);
  return <div>ActiveUser</div>;
};

export default ActiveUser;
