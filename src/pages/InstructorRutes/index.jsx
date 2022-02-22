import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbarr from "../../components/Navbar";
import RegisterInstructorPage from "../RegisterInstructorPage";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";

const InstructorRoutes = () => {
  const [instructorInfo, setInstructorInfo] = useState([]);

  function getInstructorInfo() {
    axios
      .get(
        BackendUrl +
          "/user/getInstructorInfo?token=" +
          localStorage.getItem("token")
      )
      .then((response) => {
        console.log(response.data);
        if (response.data == 0) {
          console.log("kosong");
        } else {
          console.log("isi");
        }
        setInstructorInfo(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getInstructorInfo();
  }, []);
  return (
    <React.Fragment>
      <Navbarr instructor />
      <Routes>
        <Route path="/" element={<RegisterInstructorPage />} />
      </Routes>
    </React.Fragment>
  );
};

export default InstructorRoutes;
