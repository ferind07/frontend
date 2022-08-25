import React, { useState, useEffect } from "react";
import AddBankAccount from "./AddBankAccount";
import CashOutComp from "./CashOutComp";
import axios from "axios";
import {
  BankOutlined,
  ToTopOutlined,
  DollarTwoTone,
  ContainerOutlined,
} from "@ant-design/icons";
import NumberFormat from "react-number-format";
import BackendUrl from "../../components/BackendUrl";
import HistoryCashOutComp from "./HistoryCashOutComp";
import "./style.css";

const InstructorDirbushment = () => {
  const [option, setOption] = useState(1);
  const [userInfo, setUserInfo] = useState({});

  function optionSelected(e, opt) {
    e.preventDefault();
    setOption(opt);
  }

  const renderContent = () => {
    if (option == 1) {
      return <AddBankAccount />;
    } else if (option == 2) {
      return <CashOutComp userInfo={userInfo} getInfo={getInfo} />;
    } else if (option == 3) {
      return <HistoryCashOutComp />;
    }
  };

  function getInfo() {
    axios
      .get(BackendUrl + "/user/getInfo?token=" + localStorage.getItem("token"))
      .then((success) => {
        console.log(success.data);
        setUserInfo(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getInfo();
  }, []);

  const boxStyle = {
    boxShadow: "0px 20px 27px #0000000d",
    borderRadius: "12px",
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 mt-3">
            <h4>Dirbushment</h4>
          </div>
          <div className="col-4">
            <div className="card card-shadow">
              <div className="card-body">
                <div className="card" style={boxStyle}>
                  <div className="card-body">
                    <div
                      className="d-flex justify-content-start"
                      style={{ gap: "5px" }}
                    >
                      <div className="center">
                        <DollarTwoTone
                          style={{ fontSize: "25px", color: "#08c" }}
                        />
                      </div>
                      <h4 className="mb-0">Your balance</h4>
                    </div>

                    <h3 className="text-muted mb-0">
                      <NumberFormat
                        value={userInfo.saldo}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rp. "}
                      />
                    </h3>
                  </div>
                </div>
                <hr />
                <div
                  className="d-flex w-100 p-1 box-option justify-content-start"
                  style={{ gap: "5px" }}
                  onClick={(e) => {
                    optionSelected(e, 1);
                  }}
                >
                  <div className="center">
                    <BankOutlined style={{ fontSize: "25px", color: "#08c" }} />
                  </div>
                  <h5 className="mb-0">Bank account</h5>
                </div>
                <div
                  className="d-flex mt-2 w-100 p-1 box-option justify-content-start"
                  style={{ gap: "5px" }}
                  onClick={(e) => {
                    optionSelected(e, 2);
                  }}
                >
                  <div className="center">
                    <ToTopOutlined
                      style={{ fontSize: "25px", color: "#08c" }}
                    />
                  </div>
                  <h5 className="mb-0">Cash out</h5>
                </div>
                <div
                  className="d-flex mt-2 w-100 p-1 box-option justify-content-start"
                  style={{ gap: "5px" }}
                  onClick={(e) => {
                    optionSelected(e, 3);
                  }}
                >
                  <div className="center">
                    <ContainerOutlined
                      style={{ fontSize: "25px", color: "#08c" }}
                    />
                  </div>
                  <h5 className="mb-0">History</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-8">
            <div className="card card-shadow">
              <div className="card-body">{renderContent()}</div>
              {/* <div className="card-body">
                <HistoryCashOutComp />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorDirbushment;
