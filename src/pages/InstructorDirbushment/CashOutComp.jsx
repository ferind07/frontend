import React, { useEffect, useState } from "react";
import { DollarTwoTone } from "@ant-design/icons";
import { Select, Input, Button, notification } from "antd";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";
import NumberFormat from "react-number-format";

const CashOutComp = (props) => {
  const [bankAccount, setBankAccount] = useState([]);
  const [nominalCashOut, setNominalCashOut] = useState(0);
  const [accountInfo, setAccountInfo] = useState({});

  const { Option } = Select;

  function getBankAccountInformation() {
    axios
      .get(
        BackendUrl +
          "/user/getBankAccountInformation?token=" +
          localStorage.getItem("token")
      )
      .then((success) => {
        console.log(success.data);
        setBankAccount(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function checkInput() {
    var valid = true;
    if (nominalCashOut < 10000) {
      valid = false;
      notification.error({
        message: "Error",
        description: "Min Rp. 10.000 to cashout",
      });
    }
    if (accountInfo.accountNumber == undefined) {
      valid = false;
      notification.error({
        message: "Error",
        description: "Please select your bank account first",
      });
    }
    return valid;
  }

  function cashOut() {
    if (props.userInfo.saldo < nominalCashOut) {
      notification.error({
        message: "Error",
        description: "Not Enough Balance",
      });
    } else {
      if (checkInput()) {
        axios
          .post(BackendUrl + "/user/cashOut", {
            token: localStorage.getItem("token"),
            amount: nominalCashOut,
            accountHolderName: accountInfo.accountHolderName,
            accountNumber: accountInfo.accountNumber,
            bankCode: accountInfo.bankCode,
            saldoBaru:
              parseInt(props.userInfo.saldo) - parseInt(nominalCashOut),
          })
          .then((success) => {
            console.log(success);
            if (success.data.status == true) {
              notification.success({
                message: "Success",
                description: success.data.msg,
              });
              props.getInfo();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }

  const renderOption = () => {
    const compList = [];

    bankAccount.map((bankDetail, index) => {
      compList.push(
        <Option value={index} key={index}>
          {bankDetail.accountHolderName} / {bankDetail.accountNumber} /{" "}
          {bankDetail.bankCode}
        </Option>
      );
    });

    return compList;
  };

  useEffect(() => {
    getBankAccountInformation();
  }, []);
  const boxStyle = {
    boxShadow: "0px 20px 27px #0000000d",
    borderRadius: "12px",
  };
  return (
    <>
      <div>
        <h2>Cash out</h2>
        <div className="w-100">
          <div className="card" style={boxStyle}>
            <div
              className="card-body d-flex justify-content-start"
              style={{ gap: "15px" }}
            >
              <DollarTwoTone style={{ fontSize: "50px" }} />
              <div className="center">
                <div>
                  <h6 className="mb-0">Avaliable to cash out</h6>
                  <p className="mb-0">
                    <NumberFormat
                      value={props.userInfo.saldo}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rp. "}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <h6>Cashout to </h6>
            <Select
              className="w-100"
              onChange={(value) => {
                setAccountInfo(bankAccount[value]);
                //console.log(bankAccount[value]);
              }}
            >
              {renderOption()}
            </Select>
          </div>
          <div className="mt-3">
            <h6>Nominal Cash out </h6>
            <Input
              type="number"
              value={nominalCashOut}
              onChange={(e) => {
                setNominalCashOut(e.target.value);
              }}
            />
            <div className="d-flex justify-content-end mt-1">
              Minimal cash out Rp.10.000
            </div>
          </div>
          <div className="d-flex justify-content-end mt-2">
            <Button
              type="primary"
              onClick={(e) => {
                cashOut();
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CashOutComp;
