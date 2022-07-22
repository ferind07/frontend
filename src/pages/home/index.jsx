import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackendUrl from "../../components/BackendUrl";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Card from "./card";
import "./index.css";

const Home = () => {
  const navigate = useNavigate();
  function getInfo() {
    if (localStorage.getItem("token") !== null) {
      axios
        .get(
          BackendUrl + "/user/getInfo?token=" + localStorage.getItem("token")
        )
        .then((success) => {
          console.log(success.data);
          if (success.data.role == 3) navigate("/admin");
          if (success.data.role == 2) navigate("/instructor");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    //console.log("useEffect");
    getInfo();
  }, []);
  return (
    <>
      <Navbar />
      <div className="billboard">
        <img src="/asset/home/banner.jpg" />
        <div className="banner">
          <h2>Learning thats gets you</h2>
          <p>Skill for your present and your future. Now come to your home</p>
        </div>
      </div>
      <div className="catagory-container">
        <h3>Top Categories</h3>
        <hr />
        <div className="container-fluid">
          <div className="row">
            <Card catagory="Cooking" idCat="1" url="/asset/home/cooking.png" />
            <Card catagory="Design" idCat="2" url="/asset/home/design.png" />
            <Card catagory="Language" idCat="3" url="/asset/home/lang.png" />
            <Card
              catagory="Programming"
              idCat="4"
              url="/asset/home/progamming.png"
            />
            <Card catagory="Sport" idCat="5" url="/asset/home/sport.png" />
          </div>
        </div>
        <hr />
      </div>

      <div className="container mentor-container">
        <div className="row justify-content-md-center">
          <div className="col-lg-5 col-md-6 col-sm-6 col-8">
            <img src="/asset/home/mentor.jpeg" className="w-100" />
          </div>
          <div className="col-lg-3 col-md-4 col-sm-4 col-8 center">
            <div>
              <h1>Become an instructor</h1>
              <p>
                Many instructor teach millions of students on T-DEMY. We provide
                platform for you to be an insturctor in here
              </p>
              <button
                className="btn btn-dark"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register here
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
