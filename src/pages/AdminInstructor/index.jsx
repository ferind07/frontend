import React, { useState, useEffect } from "react";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";
import { Table, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";

const AdminInstructor = () => {
  var navigate = useNavigate();

  let [dataInstructor, setDataInstructor] = useState([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Register As",
      dataIndex: "katagori",
      key: "katagori",
      render: (katagori) => {
        if (katagori == 1) return "Language";
        if (katagori == 2) return "Cooking";
        if (katagori == 3) return "Sports";
        if (katagori == 4) return "Design";
        if (katagori == 5) return "Programming";
      },
    },
    {
      title: "CV",
      dataIndex: "berkas",
      key: "berkas",
      render: (berkas) => {
        return (
          <a href={BackendUrl + berkas} target="_blank">
            View CV
          </a>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record) => {
        return (
          <>
            <Button
              onClick={() => {
                navigate("/admin/detailInstructor/" + record.id);
              }}
            >
              Details
            </Button>
            <Button
              style={{ marginLeft: "5px" }}
              onClick={(e) => onClickApprove(e, record)}
            >
              Approve
            </Button>
          </>
        );
      },
    },
  ];

  const onClickApprove = (e, data) => {
    e.preventDefault();
    axios
      .post(BackendUrl + "/admin/approveInstructor", {
        idUser: data.id,
      })
      .then((success) => {
        console.log(success);
        if (success.data.status == true) {
          notification.success({
            message: "Success",
            description: success.data.msg,
          });
          getUnApprovedInstructor();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function getUnApprovedInstructor() {
    axios
      .get(
        BackendUrl +
          "/admin/getUnApprovedInstructor?token=" +
          localStorage.getItem("token")
      )
      .then((success) => {
        setDataInstructor(success.data.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getUnApprovedInstructor();
  }, []);
  const boxStyle = {
    boxShadow: "0px 20px 27px #0000000d",
    borderRadius: "12px",
  };
  return (
    <>
      <div className="container-style">
        <div className="container mt-3">
          <div className="row">
            <div className="col-12">
              <div className="card" style={boxStyle}>
                <div className="card-header">
                  <h5 className="card-title">Approve New Instructor</h5>
                </div>
                <div className="card-body">
                  <Table
                    columns={columns}
                    dataSource={dataInstructor}
                    rowKey={(record) => record.uid}
                    scroll={{ x: 1000 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminInstructor;
