import React, { useState, useEffect } from "react";
import Navbarr from "../../components/Navbar";
import { Input, Select, DatePicker, Button } from "antd";
import HistoryComp from "./HistoryComp";
import moment from "moment";

const ReviewPage = () => {
  const { Search } = Input;
  const { Option } = Select;
  const { RangePicker } = DatePicker;

  const dateFormat = "DD/MM/YYYY";

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  return (
    <>
      <Navbarr />
      <div className="container mt-3">
        <div className="row">
          <div className="col-12">
            <h4>History Course</h4>
          </div>
          <div className="row">
            <div className="col-3">
              <div className="card">
                <div className="card-body">
                  <h5>Filter</h5>
                  <div className="">
                    <Search
                      placeholder="Search your course"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <p className="mb-0 mt-3">Sort from</p>
                  <div className="mt-1">
                    <Select
                      defaultValue="Newest"
                      style={{ width: "100%" }}
                      onChange={handleChange}
                    >
                      <Option value="1">Newest</Option>
                      <Option value="2">Oldest</Option>
                    </Select>
                  </div>
                  <p className="mb-0 mt-3">Date course</p>
                  <RangePicker format={dateFormat} className="mt-1" />
                  <Button type="primary" className="mt-2">
                    Reset
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="card" style={{ height: "80vh" }}>
                <div className="card-body">
                  <HistoryComp />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewPage;
