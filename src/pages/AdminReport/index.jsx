import React, { useState } from "react";
import {
  FundTwoTone,
  DollarCircleTwoTone,
  StarTwoTone,
} from "@ant-design/icons";
import IncomeComp from "./IncomeComp";
import CashOutComp from "./CashOutComp";
import TopUserComp from "./TopUserComp";

const AdminReport = () => {
  const [option, setOption] = useState(1);

  function optionSelected(e, option) {
    setOption(option);
  }

  const renderContent = () => {
    if (option == 1) {
      return <IncomeComp />;
    } else if (option == 2) {
      return <CashOutComp />;
    } else if (option == 3) {
      return <TopUserComp />;
    }
  };

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
              <h3>Report</h3>
            </div>
            <div className="col-3">
              <div className="card" style={boxStyle}>
                <div className="card-body">
                  <div
                    className="d-flex justify-content-start w-100 p-1 box-option"
                    style={{ gap: "15px" }}
                    onClick={(e) => {
                      optionSelected(e, 1);
                    }}
                  >
                    <div className="center">
                      <FundTwoTone
                        style={{ fontSize: "35px", color: "#08c" }}
                      />
                    </div>
                    <h5 className="mb-0">Income</h5>
                  </div>

                  <div
                    className="d-flex justify-content-start w-100 p-1 box-option mt-2"
                    style={{ gap: "15px" }}
                    onClick={(e) => {
                      optionSelected(e, 2);
                    }}
                  >
                    <div className="center">
                      <DollarCircleTwoTone
                        style={{ fontSize: "35px", color: "#08c" }}
                      />
                    </div>
                    <h5 className="mb-0">Cash out</h5>
                  </div>

                  <div
                    className="d-flex justify-content-start w-100 p-1 box-option mt-2"
                    style={{ gap: "15px" }}
                    onClick={(e) => {
                      optionSelected(e, 3);
                    }}
                  >
                    <div className="center">
                      <StarTwoTone
                        style={{ fontSize: "35px", color: "#08c" }}
                      />
                    </div>
                    <h5 className="mb-0">Top user</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-9 mb-5">
              <div className="card" style={boxStyle}>
                <div className="card-body">{renderContent()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminReport;
