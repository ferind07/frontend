import React, { useState, useEffect } from "react";
import { Input, Button, Select, notification } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";

const AddBankAccount = () => {
  const { Option } = Select;
  const [bankList, setBankList] = useState([]);
  const [bankAccountInfo, setBankAccountInfo] = useState([]);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [bankCode, setBankCode] = useState("");

  function getAvailableBankList() {
    axios
      .get(BackendUrl + "/user/getBank")
      .then((success) => {
        //console.log(success.data);
        setBankList(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getBankAccountInformation() {
    axios
      .get(
        BackendUrl +
          "/user/getBankAccountInformation?token=" +
          localStorage.getItem("token")
      )
      .then((success) => {
        console.log(success.data);
        if (success.data.length > 0) {
          setAccountNumber(success.data[0].accountNumber);
          setAccountHolderName(success.data[0].accountHolderName);
          setBankCode(success.data[0].bankCode);
        }
        setBankAccountInfo(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function saveBankInformation() {
    if (bankAccountInfo.length > 0) {
      axios
        .post(BackendUrl + "/user/updateBankAccount", {
          token: localStorage.getItem("token"),
          bankCode: bankCode,
          accountHolderName: accountHolderName,
          accountNumber: accountNumber,
        })
        .then((success) => {
          //console.log(success.data);
          if (success.data.status == true) {
            notification.success({
              message: "Success",
              description: success.data.msg,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post(BackendUrl + "/user/addBankAccount", {
          token: localStorage.getItem("token"),
          bankCode: bankCode,
          accountHolderName: accountHolderName,
          accountNumber: accountNumber,
        })
        .then((success) => {
          //console.log(success.data);
          if (success.data.status == true) {
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

  const itemList = () => {
    const comp = [];
    bankList.map((detailBank, index) => {
      comp.push(
        <Option value={detailBank.code} key={index}>
          {detailBank.name}
        </Option>
      );
    });
    return comp;
  };

  function handleChange(value) {
    setBankCode(value);
  }

  useEffect(() => {
    getAvailableBankList();
    getBankAccountInformation();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h2>Your Account</h2>
        </div>
        <div>
          <p className="mb-1">Bank</p>
          <Select className="w-100" onChange={handleChange} value={bankCode}>
            {itemList()}
          </Select>
        </div>

        <div className="mt-2">
          <p className="mb-1">Account number</p>
          <Input
            type="number"
            value={accountNumber}
            onChange={(e) => {
              setAccountNumber(e.target.value);
            }}
          />
        </div>

        <div className="mt-2">
          <p className="mb-1">Account holder name</p>
          <Input
            value={accountHolderName}
            onChange={(e) => {
              setAccountHolderName(e.target.value);
            }}
          />
        </div>
        <div className="mt-2 d-flex justify-content-end">
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={(e) => {
              e.preventDefault();
              saveBankInformation();
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddBankAccount;
