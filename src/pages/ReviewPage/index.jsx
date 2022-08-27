import React, { useState, useEffect } from "react";
import Navbarr from "../../components/Navbar";
import { Input, Select, DatePicker, Button, Empty } from "antd";
import HistoryComp from "./HistoryComp";
import moment from "moment";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";

const ReviewPage = () => {
  const { Search } = Input;
  const { Option } = Select;
  const { RangePicker } = DatePicker;

  const dateFormat = "DD/MM/YYYY";

  const [keyword, setKeyword] = useState("");
  const [valRangePicker, setValRangePicker] = useState([]);
  const [sort, setSort] = useState(0);

  const [historyList, setHistoryList] = useState([]);
  const [tempHistoryList, setTempHistoryList] = useState([]);

  function handleChange(value) {
    setSort(value);
  }

  function getHistoryCourse() {
    axios
      .get(
        BackendUrl +
          "/user/getHSubmissionDone?token=" +
          localStorage.getItem("token")
      )
      .then((success) => {
        setHistoryList(success.data);
        setTempHistoryList(success.data);
        console.log(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function renderData() {
    if (historyList.length != 0) {
      const compList = [];
      historyList.map((detailHistory) => {
        //console.log(detailHistory.image);
        compList.push(
          <HistoryComp
            time={detailHistory.timeInsert}
            orderId={detailHistory.id}
            instructorName={detailHistory.name}
            idInstructor={detailHistory.idUser}
            picture={detailHistory.image}
            courseName={detailHistory.title}
            price={detailHistory.price}
          />
        );
      });
      return compList;
    } else {
      return <Empty className="mt-5" />;
    }
  }

  function onClickReset() {
    setHistoryList(tempHistoryList);
  }

  function filterKeyword(keyword) {
    const arr = tempHistoryList.filter((detailHistory) => {
      return detailHistory.title.toLowerCase().includes(keyword.toLowerCase());
    });
    return arr;
  }

  function filterDate(arrHistory) {
    //console.log(valRangePicker);
    var filtered = arrHistory.filter((detailHistory) => {
      const date = new Date(moment(detailHistory.timeInsert).add(-7, "hours"));
      const dateStart = valRangePicker[0].set({ hour: 0 }).toDate();
      const dateEnd = valRangePicker[1].set({ hour: 23 }).toDate();

      return date >= dateStart && date <= dateEnd;
    });
    //console.log(filtered);
    return filtered;
  }

  function dateSort(arrHistory) {
    if (sort == 2) {
      var filtered = arrHistory.sort((a, b) => a.timeInsert - b.timeInsert);

      return filtered;
    } else {
      var filtered = arrHistory.sort((a, b) => b.timeInsert - a.timeInsert);

      return filtered;
    }
  }

  function onClickFilter() {
    //console.log(filterKeyword(keyword));
    var data = filterKeyword(keyword);
    data = filterDate(data);
    data = dateSort(data);

    setHistoryList(data);
  }

  useEffect(() => {
    getHistoryCourse();
  }, []);

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
              <div className="card card-shadow">
                <div className="card-body">
                  <h5>Filter</h5>
                  <div className="">
                    <Search
                      placeholder="Search your course"
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        setKeyword(e.target.value);
                      }}
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
                  <RangePicker
                    format={dateFormat}
                    className="mt-1"
                    value={valRangePicker}
                    onChange={(value) => {
                      setValRangePicker(value);
                    }}
                  />
                  <div
                    className="d-flex justify-content-start mt-2"
                    style={{ gap: "15px" }}
                  >
                    <Button
                      type="primary"
                      className="mt-2"
                      onClick={() => {
                        onClickFilter();
                      }}
                    >
                      Filter
                    </Button>
                    <Button
                      className="mt-2"
                      onClick={() => {
                        onClickReset();
                      }}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="card card-shadow" style={{ height: "80vh" }}>
                <div className="card-body" style={{ overflowY: "auto" }}>
                  {renderData()}
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
