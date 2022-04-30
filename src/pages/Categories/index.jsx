import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import CategoriesCard from "./categoriesCard";
import Footer from "../../components/Footer";
import axios from "axios";
import { AiOutlineTeam } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { Input } from "antd";
import BackendUrl from "../../components/BackendUrl";
import { Empty } from "antd";

const Categories = () => {
  let { id } = useParams();
  const [listInstrucor, setListInstructor] = useState([]);

  useEffect(() => {
    axios
      .get(BackendUrl + "/user/getInstructorList?katagori=" + id)
      .then((success) => {
        setListInstructor(success.data);
        console.log(success);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const katagoriText = () => {
    var katText = "";

    if (id == 1) {
      katText = "Language";
    } else if (id == 2) {
      katText = "Cooking";
    } else if (id == 3) {
      katText = "Sports";
    } else if (id == 4) {
      katText = "Design";
    } else if (id == 5) {
      katText = "Programming";
    }

    return katText;
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{ paddingBottom: "30px" }}>
        <h2 className="mt-5 mb-0">{katagoriText()}</h2>
        <h5 className="mt-2 text-muted">Another ways to learn language</h5>
        <div className="d-flex justify-content-between">
          <p style={{ fontSize: "0.8rem" }}>
            <AiOutlineTeam color="#00B4D8" size="1.5rem" />
            {listInstrucor.length} instructors
          </p>
          <div className="col-md-5 col-6">
            <Input.Search allowClear style={{ width: "100%" }} />
          </div>
        </div>
        <hr />
        <div className="row">
          {listInstrucor.map((listInstrucor) => {
            return (
              <CategoriesCard
                name={listInstrucor.name}
                detail={listInstrucor.detail}
                image={listInstrucor.image}
                id={listInstrucor.id}
              />
            );
          })}
          {listInstrucor.length == 0 && (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </div>
      </div>
    </>
  );
};

export default Categories;
