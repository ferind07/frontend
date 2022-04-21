import React, { useState } from "react";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";

const Payment = () => {
  const [transactionToken, setTrasactionToken] = useState("");

  function pay(e) {
    e.preventDefault();

    axios
      .post(BackendUrl + "/user/userPay", {
        token: localStorage.getItem("token"),
      })
      .then((success) => {
        const token = success.data;
        window.snap.pay(token, {
          onSuccess: function (result) {
            /* You may add your own implementation here */
            alert("payment success!");
            console.log(result);
          },
          onPending: function (result) {
            /* You may add your own implementation here */
            alert("wating your payment!");
            console.log(result);
          },
          onError: function (result) {
            /* You may add your own implementation here */
            alert("payment failed!");
            console.log(result);
          },
          onClose: function () {
            /* You may add your own implementation here */
            alert("you closed the popup without finishing the payment");
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <script
        type="text/javascript"
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key="SB-Mid-client-bAR36cuy3BSC-wV9"
      ></script>
      <button
        className="btn btn-success"
        onClick={(e) => {
          pay(e);
        }}
      >
        PAY
      </button>
    </div>
  );
};

export default Payment;
