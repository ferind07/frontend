import React, { useEffect, useState } from "react";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";
import {
  UserOutlined,
  InfoCircleFilled,
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

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-12">
            <div className="card card-shadow">
              <div className="card-body">
                <div className="row">
                  <div className="col-4">
                    <div className="card">
                      <div className="card-body">
                        <h3>Total User</h3>
                        <div className="d-flex" style={{ gap: "10px" }}>
                          <UserOutlined style={{ fontSize: "40px" }} />
                          <h5 className="text-muted">
                            {listUser.length} Users
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="card">
                      <div className="card-body">
                        <h3>Total Instructor</h3>
                        <div className="d-flex" style={{ gap: "10px" }}>
                          <InfoCircleFilled style={{ fontSize: "40px" }} />
                          <h5 className="text-muted">
                            {listInstructor.length} Instructor
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="card">
                      <div className="card-body">
                        <h3>Total Class</h3>
                        <div className="d-flex" style={{ gap: "10px" }}>
                          <ContainerOutlined style={{ fontSize: "40px" }} />
                          <h5 className="text-muted">
                            {listClass.length} Class
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 mt-3">
            <div className="card card-shadow">
              <div className="card-body">
                <div className="row">
                  <div className="col-4">
                    <h4 className="text-center">User and Instructor</h4>
                    <Pie data={data} />
                  </div>
                  <div className="col-8">
                    <div className="card">
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
