import React, { useEffect, useState } from "react";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";
import { Table, Tag, Button, notification, Input } from "antd";
import { useNavigate } from "react-router-dom";

const AdminMaster = () => {
  var navigate = useNavigate();

  const [listUser, setListUser] = useState([]);
  const [tempListUser, setTempListUser] = useState([]);

  function getUser() {
    axios
      .get(BackendUrl + "/admin/allUser")
      .then((success) => {
        setListUser(success.data);
        setTempListUser(success.data);
        console.log(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function onClickBanUser(e, id, status) {
    e.preventDefault();
    axios
      .post(BackendUrl + "/admin/banUser", {
        id: id,
        status: status,
      })
      .then((success) => {
        notification.success({
          description: "success",
          message: "action success",
        });
        getUser();
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
      title: "Role",
      dataIndex: "role",
      render: (text, record) => {
        if (text == 1) {
          return <Tag color="cyan">User</Tag>;
        } else {
          return (
            <Tag
              color="blue"
              onClick={() => {
                navigate("/admin/detailInstructor/" + record.id);
              }}
              style={{ cursor: "pointer" }}
            >
              Instructor
            </Tag>
          );
        }
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => {
        if (text == 1) {
          return <Tag color="green">active</Tag>;
        } else {
          return <Tag color="red">Banned</Tag>;
        }
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        if (text == 1) {
          return (
            <Button
              danger
              onClick={(e) => onClickBanUser(e, record.id, record.status)}
            >
              Ban
            </Button>
          );
        } else {
          return (
            <Button
              onClick={(e) => onClickBanUser(e, record.id, record.status)}
            >
              Un Ban
            </Button>
          );
        }
      },
    },
  ];

  function search(e) {
    const keyword = e.target.value;

    const temp = tempListUser.filter((detailUser) => {
      const name = detailUser.name;
      return name.toLowerCase().includes(keyword.toLowerCase());
    });

    setListUser(temp);
  }
  const boxStyle = {
    boxShadow: "0px 20px 27px #0000000d",
    borderRadius: "12px",
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-12">
            <div className="card" style={boxStyle}>
              <div className="card-header">
                <h2 className="text-center mb-0">Master User</h2>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div className="center">
                    <p className="mb-0">{listUser.length} User</p>
                  </div>
                  <Input
                    placeholder="Search"
                    style={{ width: "200px" }}
                    onChange={(e) => {
                      search(e);
                    }}
                  />
                </div>
                <hr />
                <Table dataSource={listUser} columns={columns} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMaster;
