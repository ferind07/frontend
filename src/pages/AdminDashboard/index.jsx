import React, { useEffect, useState } from "react";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";
import {
  UserOutlined,
  InfoCircleOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import { Tag, Table } from "antd";
import { Pie, Line } from "react-chartjs-2";
import "chart.js/auto";

const AdminDashboard = () => {
  const [listUser, setListUser] = useState([]);
  const [listInstructor, setListInstructor] = useState([]);
  const [listClass, setListClass] = useState([]);

  const getBannedUser = () => {
    var newArray = listUser.filter(function (user) {
      return user.status == 0;
    });
    return newArray;
  };

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
      title: "Role",
      dataIndex: "role",
      render: (text) => {
        if (text == 1) {
          return <Tag color="cyan">User</Tag>;
        } else {
          return <Tag color="blue">Instructor</Tag>;
        }
      },
    },
  ];

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Transaction Chart",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const dataLine = {
    labels,
    datasets: [
      {
        label: "Transaction",
        data: [
          2000, 5000, 4000, 7000, 4500, 2000, 5000, 4000, 7000, 4500, 8000,
          6000,
        ],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  var data = {
    labels: ["Instructor", "User"],
    datasets: [
      {
        label: "# of Votes",
        data: [listInstructor.length, listUser.length - listInstructor.length],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  function getInstructor(users) {
    const listInstructor = [];
    users.forEach((element) => {
      if (element.role == 2) {
        listInstructor.push(element);
      }
    });
    return listInstructor;
  }

  function getAllUser() {
    axios
      .get(BackendUrl + "/admin/allUser")
      .then((success) => {
        const users = success.data;
        //console.log(users);
        setListUser(users);
        setListInstructor(getInstructor(users));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getAllClass() {
    axios
      .get(BackendUrl + "/admin/allClass")
      .then((success) => {
        setListClass(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getInstructorData() {}

  useEffect(() => {
    getAllUser();
    getAllClass();
    getInstructorData();
  }, []);
  const boxStyle = {
    boxShadow: "0px 20px 27px #0000000d",
    borderRadius: "12px",
  };
  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-12">
            <div className="card card-shadow">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-12 mt-2">
                    <div className="card h-100" style={boxStyle}>
                      <div className="card-body d-flex">
                        <div>
                          <div
                            className="d-flex justify-content-start"
                            style={{ gap: "15px" }}
                          >
                            <h3 className="mb-0">Total user</h3>
                          </div>
                          <div
                            className="d-flex justify-content-start mt-2"
                            style={{ gap: "10px" }}
                          >
                            <h5 className="text-muted">
                              {listUser.length} Users
                            </h5>
                          </div>
                        </div>
                        <div className="icon-box2">
                          <UserOutlined style={{ fontSize: "40px" }} />
                        </div>
                        {/* <a href="">Cash out</a> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-12 mt-2">
                    <div className="card h-100" style={boxStyle}>
                      <div className="card-body d-flex">
                        <div>
                          <div
                            className="d-flex justify-content-start"
                            style={{ gap: "15px" }}
                          >
                            <h3 className="mb-0">Total instructor</h3>
                          </div>
                          <div
                            className="d-flex justify-content-start mt-2"
                            style={{ gap: "10px" }}
                          >
                            <h5 className="text-muted">
                              {listInstructor.length} Instructor
                            </h5>
                          </div>
                        </div>
                        <div className="icon-box2">
                          <InfoCircleOutlined style={{ fontSize: "40px" }} />
                        </div>
                        {/* <a href="">Cash out</a> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-12 mt-2">
                    <div className="card h-100" style={boxStyle}>
                      <div className="card-body d-flex">
                        <div>
                          <div
                            className="d-flex justify-content-start"
                            style={{ gap: "15px" }}
                          >
                            <h3 className="mb-0">Total class</h3>
                          </div>
                          <div
                            className="d-flex justify-content-start mt-2"
                            style={{ gap: "10px" }}
                          >
                            <h5 className="text-muted">
                              {listClass.length} Class
                            </h5>
                          </div>
                        </div>
                        <div className="icon-box2">
                          <ContainerOutlined style={{ fontSize: "40px" }} />
                        </div>
                        {/* <a href="">Cash out</a> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mt-4">
            <div className="row">
              <div className="col-4">
                <div className="card" style={boxStyle}>
                  <div className="card-body">
                    <h4 className="text-center">User and Instructor</h4>
                    <Pie data={data} />
                  </div>
                </div>
              </div>
              <div className="col-8">
                <div className="card h-100" style={boxStyle}>
                  <div className="card-body">
                    <h3>Banned User</h3>
                    <Table
                      dataSource={getBannedUser()}
                      columns={columns}
                      size="middle"
                      pagination={{ pageSize: 5 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="col-12 mt-3 mb-5">
            <div className="card card-shadow">
              <div className="card-body">
                <div className="row">
                  <div className="col-5">
                    <h3>Transaction</h3>
                    <Line options={options} data={dataLine} />
                  </div>
                  <div className="col-7">
                    <h3>History Transaction</h3>
                    <div
                      className="card"
                      style={{ height: "300px", overflowY: "auto" }}
                    >
                      <div className="card-body"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
