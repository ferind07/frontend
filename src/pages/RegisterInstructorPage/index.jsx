import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Select, notification } from "antd";
import { Viewer } from "@react-pdf-viewer/core";
import { Worker } from "@react-pdf-viewer/core";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";
import { Input, TimePicker, Checkbox } from "antd";
import { FileAddOutlined } from "@ant-design/icons";

const RegisterInstructorPage = () => {
  const { Option } = Select;
  const [url, setUrl] = useState("");
  const [fileBerkas, setFileBerkas] = useState();
  const [time, setTime] = useState();
  const [katagori, setKatagori] = useState(1);
  const [aboutMe, setAboutMe] = useState("");
  const [catagoryDetail, setCatagoryDetail] = useState("");
  const [availableDay, setAvailableDay] = useState([]);
  const format = "HH:mm";
  const { TextArea } = Input;

  const navigate = useNavigate();

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
          if (response.data.valid == 0) {
            navigate("/instructor/waiting");
          } else {
            navigate("/instructor/home");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getInstructorInfo();
  }, []);

  function handleChangeKatagori(value) {
    console.log(`selected ${value}`);
    setKatagori(value);
  }
  const onChange = (e) => {
    const files = e.target.files;
    setFileBerkas(e.target.files[0]);
    files.length > 0 && setUrl(URL.createObjectURL(files[0]));
  };

  function registerInstructor() {
    let bodyFormData = new FormData();
    bodyFormData.append("katagori", katagori);
    bodyFormData.append("katagoriDetail", catagoryDetail);
    bodyFormData.append("berkas", fileBerkas);
    bodyFormData.append("detail", aboutMe);
    bodyFormData.append("timeStart", time[0]);
    bodyFormData.append("timeEnd", time[1]);
    bodyFormData.append("availableDay", availableDay);
    bodyFormData.append("token", localStorage.getItem("token"));
    axios({
      method: "post",
      url: BackendUrl + "/user/registerInstructor",
      data: bodyFormData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((success) => {
        console.log(success.data);
        if (success.data.status) {
          notification.success({
            message: "Success",
            description: success.data.msg,
          });
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function checkInput() {
    var valid = true;
    if (catagoryDetail == "") {
      valid = false;
      notification.error({
        message: "Error",
        description: "You must fill catagory detail first",
      });
    }
    if (time == undefined) {
      valid = false;
      notification.error({
        message: "Error",
        description: "Time not selected yet",
      });
    }
    if (availableDay.length < 1) {
      valid = false;
      notification.error({
        message: "Error",
        description: "Days not selected",
      });
    }
    return valid;
  }

  const onClickSubmit = (e) => {
    e.preventDefault();
    console.log(time);
    console.log("btn submit clicked");
    if (checkInput()) {
      registerInstructor();
    }
  };

  const boxStyle = {
    boxShadow: "0px 20px 27px #0000000d",
    borderRadius: "12px",
  };

  const onCheckBoxChange = (checkedValue) => {
    //console.log(checkedValue);
    setAvailableDay(checkedValue);
  };

  return (
    <>
      <div className="container myaccount">
        <div className="row">
          <div className="col-12">
            <div className="card box-style" style={boxStyle}>
              <div className="card-header d-flex justify-content-between">
                <h3 className="mb-0">Register as instructor</h3>
                <FileAddOutlined style={{ fontSize: "25px" }} />
              </div>
              <div className="card-body">
                <form
                  encType="multipart/form-data"
                  onSubmit={(e) => onClickSubmit(e)}
                >
                  <div class="form-group row">
                    <label className="col-sm-2 col-form-label">
                      Catagories
                    </label>
                    <div className="col-sm-10">
                      <Select
                        defaultValue="language"
                        style={{ width: "100%" }}
                        onChange={handleChangeKatagori}
                      >
                        <Option value={1}>Language</Option>
                        <Option value={2}>Cooking</Option>
                        <Option value={3}>Sports</Option>
                        <Option value={4}>Design</Option>
                        <Option value={5}>Programming</Option>
                      </Select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                      Catagory detail
                    </label>
                    <div className="col-sm-10">
                      <Input
                        type="text"
                        value={catagoryDetail}
                        onChange={(e) => {
                          setCatagoryDetail(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">About Me</label>
                    <div className="col-sm-10">
                      <TextArea
                        rows={5}
                        value={aboutMe}
                        onChange={(e) => {
                          setAboutMe(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group row mt-2">
                    <label className="col-sm-2 col-form-label">
                      Available Time
                    </label>
                    <div className="col-sm-10">
                      <TimePicker.RangePicker
                        format={format}
                        value={time}
                        onChange={(time) => {
                          console.log(time);
                          setTime(time);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group row mt-2">
                    <label className="col-sm-2 col-form-label">
                      Available day
                    </label>
                    <div className="col-sm-10">
                      <Checkbox.Group onChange={onCheckBoxChange}>
                        <Checkbox value={0}>Sunday</Checkbox>
                        <Checkbox value={1}>Monday</Checkbox>
                        <Checkbox value={2}>Tuesday</Checkbox>
                        <Checkbox value={3}>Wednesday</Checkbox>
                        <Checkbox value={4}>Thursday</Checkbox>
                        <Checkbox value={5}>Friday</Checkbox>
                        <Checkbox value={6}>Saturday</Checkbox>
                      </Checkbox.Group>
                    </div>
                  </div>
                  <div className="form-group row mt-2">
                    <label
                      for="inputPassword"
                      className="col-sm-2 col-form-label"
                    >
                      Upload CV
                    </label>
                    <div className="col-sm-10">
                      <div className="custom-file">
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={onChange}
                        />
                        <p className="text-danger">Only pdf file</p>
                        <div style={{ height: "750px" }}>
                          {url ? (
                            <div
                              style={{
                                border: "1px solid rgba(0, 0, 0, 0.3)",
                                height: "100%",
                              }}
                            >
                              <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
                                <Viewer fileUrl={url} />
                              </Worker>
                            </div>
                          ) : (
                            <div
                              style={{
                                alignItems: "center",
                                border: "2px dashed rgba(0, 0, 0, .3)",
                                display: "flex",
                                fontSize: "2rem",
                                height: "100%",
                                justifyContent: "center",
                                width: "100%",
                              }}
                            >
                              No file chosen
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mt-2">
                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-success"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterInstructorPage;
