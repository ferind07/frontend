import React, { useState, useEffect } from "react";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";

const Payment = () => {
  const [transactionToken, setTrasactionToken] = useState("");
  const [orderID, setOrderID] = useState("");
  const [grossAmount, setGrossAmount] = useState("");

  useEffect(() => {}, []);

  function pay(e) {
    e.preventDefault();
    axios
      .post(BackendUrl + "/user/userPay", {
        order_id: orderID,
        gross_amount: grossAmount,
      })
      .then((success) => {
        const token = success.data;
        window.snap.pay(token, {
          onSuccess: function (result) {
            console.log("success");
            console.log(result);
          },
          onPending: function (result) {
            console.log("pending");
            console.log(result);
          },
          onError: function (result) {
            console.log("error");
            console.log(result);
          },
          onClose: function () {
            console.log(
              "customer closed the popup without finishing the payment"
            );
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <div className="container mt-5">
        <input
          type="text"
          placeholder="oder_id"
          value={orderID}
          onChange={(e) => {
            setOrderID(e.target.value);
          }}
        />
        <br />
        <input
          type="number"
          placeholder="gross_amount"
          value={grossAmount}
          onChange={(e) => {
            setGrossAmount(e.target.value);
          }}
        />
        <br />
        <button
          className="btn btn-success"
          onClick={(e) => {
            pay(e);
          }}
        >
          PAY
        </button>
      </div>
    </div>
  );
};

export default Payment;
