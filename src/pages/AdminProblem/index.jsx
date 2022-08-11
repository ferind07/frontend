import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Tag, Button } from "antd";
import moment from "moment";
import BackendUrl from "../../components/BackendUrl";
import { useNavigate } from "react-router-dom";

const AdminProblem = () => {
  var navigate = useNavigate();

  const [report, setReport] = useState([]);

  function getReport() {
    axios
      .get(BackendUrl + "/admin/getReport")
      .then((success) => {
        setReport(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getReport();
  }, []);

  const columns = [
    {
      title: "ID Report",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "class",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        if (text == 0) {
          return <Tag color="red">Rejected</Tag>;
        } else if (text == 1) {
          return <Tag color="green">Accepted</Tag>;
        } else if (text == 2) {
          return <Tag color="yellow">Need Response</Tag>;
        }
      },
    },
    {
      title: "date",
      dataIndex: "date",
      render: (text, record) => {
        const date = moment(text);

        const formatedDate = date.format("dddd, DD MMMM yyyy kk:mm");

        return formatedDate;
      },
    },
    {
      title: "action",
      render: (text, record) => {
        return (
          <Button
            type="primary"
            onClick={(e) => {
              navigate("/admin/detailProblem/" + record.id);
            }}
          >
            Detail
          </Button>
        );
      },
    },
  ];
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card mt-3 mb-5">
              <div className="card-body">
                <h3>User Report</h3>
                <hr />
                <Table
                  dataSource={report}
                  columns={columns}
                  pagination={{ pageSize: 10 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProblem;
