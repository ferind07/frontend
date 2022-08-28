import React, { useEffect, useState } from "react";
import BackendUrl from "../../components/BackendUrl";
import axios from "axios";
import { Input, Tabs, notification, TimePicker, Checkbox, Button } from "antd";
import moment from "moment";
import { Worker } from "@react-pdf-viewer/core";
// Import the main Viewer component
import { Viewer } from "@react-pdf-viewer/core";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
// default layout plugin
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// Import styles of default layout plugin
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import { AiFillSave } from "react-icons/ai";
import { UserOutlined } from "@ant-design/icons";

const InstructorAboutMe = () => {
  const [userInfo, setUserInfo] = useState({});
  const [instructorInfo, setInstructorInfo] = useState({});
  const [image, setImage] = useState([]);
  const [numPages, setNumPages] = useState(null);
  const [activeDays, setActiveDays] = useState([]);
  let [pageNumber, setPageNumber] = useState(1);
  const [berkas, setBerkas] = useState();

  //pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
  const { TabPane } = Tabs;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [detail, setDetail] = useState("");
  const [katagoriDetail, setKatagoriDetail] = useState("");
  const [time, setTime] = useState();
  const { TextArea } = Input;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function getDetailIns() {
    axios
      .get(BackendUrl + "/user/getInfo?token=" + localStorage.getItem("token"))
      .then((success) => {
        setUserInfo(success.data);
        setName(success.data.name);
        setPhone(success.data.phoneNumber);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        BackendUrl +
          "/user/getInstructorInfo?token=" +
          localStorage.getItem("token")
      )
      .then((success) => {
        setDetail(success.data.instructorDetail);
        setInstructorInfo(success.data);
        const timeStart = moment(
          "2010-10-20 " + success.data.timeStart,
          "YYYY-MM-DD HH:mm"
        );
        const timeEnd = moment(
          "2010-10-20 " + success.data.timeEnd,
          "YYYY-MM-DD HH:mm"
        );
        const tempTime = [];
        tempTime.push(timeStart);
        tempTime.push(timeEnd);
        console.log(success.data);
        setKatagoriDetail(success.data.katagoriDetail);

        const activeDaysArr = success.data.activeDays.split(",");
        //console.log(activeDaysArr);
        const parseIntArr = activeDaysArr.map(Number);
        setActiveDays(parseIntArr);
        setTime(tempTime);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const userImage = () => {
    //console.log(image.length);
    if (userInfo.image == "") {
      if (image.length == 0) {
        return (
          <>
            <img src="/asset/image/noPic.jpg" width="100%" />
            <input
              type="file"
              className="mt-2"
              onChange={(e) => {
                handleImageChange(e);
              }}
            />
          </>
        );
      } else {
        return (
          <>
            <img src={URL.createObjectURL(image)} width="100%" />
            <input
              type="file"
              className="mt-2"
              onChange={(e) => {
                handleImageChange(e);
              }}
            />
          </>
        );
      }
    } else {
      return (
        <>
          <img
            src={BackendUrl + userInfo.image}
            width="70%"
            style={{ aspectRatio: "3/4" }}
          />
          <input
            type="file"
            className="mt-2"
            onChange={(e) => {
              handleImageChange(e);
            }}
          />
        </>
      );
    }
  };
  useEffect(() => {
    getDetailIns();
  }, []);

  const changePasswordOnClick = (e) => {
    e.preventDefault();

    if (
      currentPassword == "" ||
      newPassword == "" ||
      newPasswordConfirmation == ""
    ) {
      notification.error({
        message: "Error",
        description: "Please fill the empty field",
      });
    } else {
      if (newPassword == newPasswordConfirmation) {
        axios
          .post(BackendUrl + "/user/changePassword", {
            token: localStorage.getItem("token"),
          })
          .then((response) => {
            console.log(response);
            if (response.data.status) {
              notification.success({
                message: "Success",
                description: response.data.msg,
              });
            } else {
              notification.error({
                message: "Error",
                description: response.data.msg,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        notification.error({
          message: "Error",
          description: "Password confirmation not same",
        });
      }
    }
  };

  const changePasswordComp = () => {
    return (
      <>
        <div class="form-group row mt-2">
          <label for="name" className="col-sm-3 col-form-label">
            Current password
          </label>
          <div class="col-sm-9">
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div class="form-group row mt-2">
          <label for="name" className="col-sm-3 col-form-label">
            New password
          </label>
          <div class="col-sm-9">
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div class="form-group row mt-2">
          <label for="name" className="col-sm-3 col-form-label">
            New password confirmation
          </label>
          <div class="col-sm-9">
            <Input
              type="password"
              value={newPasswordConfirmation}
              onChange={(e) => {
                setNewPasswordConfirmation(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-success"
            onClick={(e) => changePasswordOnClick(e)}
          >
            Save <AiFillSave />
          </button>
        </div>
      </>
    );
  };

  const katagoriComp = () => {
    let katagori = "";
    if (instructorInfo.katagori == 1) {
      katagori = "Language";
    } else if (instructorInfo.katagori == 2) {
      katagori = "Cooking";
    } else if (instructorInfo.katagori == 3) {
      katagori = "Sport";
    } else if (instructorInfo.katagori == 4) {
      katagori = "Design";
    } else if (instructorInfo.katagori == 5) {
      katagori = "Programming";
    }

    return (
      <>
        <h5>Register as {katagori} Instructor</h5>
      </>
    );
  };

  // creating new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // pdf file onChange state
  const [pdfFile, setPdfFile] = useState(null);

  // pdf file error state
  const [pdfError, setPdfError] = useState("");

  const allowedFiles = ["application/pdf"];
  const uploadBerkas = (e) => {
    let selectedFile = e.target.files[0];
    // console.log(selectedFile.type);
    if (selectedFile) {
      if (selectedFile && allowedFiles.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfError("");
          setPdfFile(e.target.result);
          setBerkas(selectedFile);
        };
      } else {
        notification.error({
          message: "Error",
          description: "Not a valid pdf: Please select only PDF",
        });
      }
    } else {
      console.log("please select a PDF");
      notification.error({
        message: "Error",
        description: "please select a PDF",
      });
    }
  };
  const onClickSave = (e) => {
    let bodyFormData = new FormData();
    bodyFormData.append("token", localStorage.getItem("token"));
    bodyFormData.append("berkas", berkas);

    axios({
      method: "post",
      url: BackendUrl + "/user/updateBerkas",
      data: bodyFormData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((success) => {
        if (success.data.status) {
          notification.success({
            message: "Success",
            description: success.data.msg,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const renderDocument = () => {
    let url = "";
    if (pdfFile) {
      url = pdfFile;
    } else {
      url = BackendUrl + instructorInfo.berkas;
    }
    return (
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
        <Viewer fileUrl={url} plugins={[defaultLayoutPluginInstance]}></Viewer>
      </Worker>
    );
  };

  const compBerkas = () => {
    return (
      <>
        <div>
          <div className="mb-2">
            <div className="row">
              <div className="col-6">
                <h5>Document</h5>
                {renderDocument()}
              </div>
              <div className="col-6">
                <h5>Change Docuement</h5>
                <input
                  type="file"
                  className="form-control-file"
                  onChange={uploadBerkas}
                />
                <br />
                <Button type="primary" className="mt-2" onClick={onClickSave}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const onChangeCheckBox = (selectedValue) => {
    setActiveDays(selectedValue);
    console.log(selectedValue);
  };

  const options = [
    {
      label: "Sunday",
      value: 0,
    },
    {
      label: "Monday",
      value: 1,
    },
    {
      label: "Tuesday",
      value: 2,
    },
    {
      label: "Wednesday",
      value: 3,
    },
    {
      label: "Thursday",
      value: 4,
    },
    {
      label: "Friday",
      value: 5,
    },
    {
      label: "Saturday",
      value: 6,
    },
  ];
  const boxStyle = {
    boxShadow: "0px 20px 27px #0000000d",
    borderRadius: "12px",
  };
  const compUserInfo = () => {
    return (
      <>
        <div className="row">
          <div className="col-lg-3 col-md-4 text-center">{userImage()}</div>
          <div className="col-lg-9 col-md-8">
            <div className="form-group row">
              <label for="email" className="col-sm-2 col-form-label">
                Email
              </label>
              <div class="col-sm-10">
                <Input type="text" id="email" readOnly value={userInfo.email} />
              </div>
            </div>
            <div className="form-group row">
              <label for="name" className="col-sm-2 col-form-label">
                Name
              </label>
              <div class="col-sm-10">
                <Input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    e.preventDefault();
                    setName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-group row">
              <label for="name" className="col-sm-2 col-form-label">
                Catagory Detail
              </label>
              <div class="col-sm-10">
                <Input
                  type="text"
                  id="name"
                  value={katagoriDetail}
                  onChange={(e) => {
                    e.preventDefault();
                    setKatagoriDetail(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-group row">
              <label for="name" className="col-sm-2 col-form-label">
                Phone Number
              </label>
              <div class="col-sm-10">
                <Input
                  type="number"
                  id="number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-group row">
              <label for="name" className="col-sm-2 col-form-label">
                Detail
              </label>
              <div class="col-sm-10">
                <TextArea
                  value={detail}
                  onChange={(e) => {
                    setDetail(e.target.value);
                  }}
                  rows={4}
                />
              </div>
            </div>
            <div className="form-group row">
              <label for="name" className="col-sm-2 col-form-label">
                Active hours
              </label>
              <div class="col-sm-10 mt-1">
                <TimePicker.RangePicker
                  format={"HH:mm"}
                  value={time}
                  onChange={(time) => {
                    console.log(time);
                    setTime(time);
                  }}
                />
              </div>
            </div>
            <div className="form-group row">
              <label for="name" className="col-sm-2 col-form-label">
                Active days
              </label>
              <div class="col-sm-10 mt-1">
                <Checkbox.Group
                  onChange={onChangeCheckBox}
                  options={options}
                  defaultValue={activeDays}
                  value={activeDays}
                />
              </div>
            </div>

            <div className="d-flex justify-content-end mt-2">
              <button
                className="btn btn-success"
                onClick={(e) => {
                  saveOnclick(e);
                }}
              >
                Save
              </button>
            </div>

            {katagoriComp()}
          </div>
        </div>
      </>
    );
  };

  function checkValid() {
    var valid = true;
    if (name == "") {
      valid = false;
      notification.error({
        message: "Error",
        description: "Please set name",
      });
    }
    if (phone == "") {
      valid = false;
      notification.error({
        message: "Error",
        description: "Please set phone number",
      });
    }
    if (detail == "") {
      valid = false;
      notification.error({
        message: "Error",
        description: "Please set detail",
      });
    }
    if (time == undefined) {
      valid = false;
      notification.error({
        message: "Error",
        description: "Please set time",
      });
    }
    if (activeDays.length < 1) {
      valid = false;
      notification.error({
        message: "Error",
        description: "Please set active days",
      });
    }
    if (katagoriDetail == "") {
      valid = false;
      notification.error({
        message: "Error",
        description: "Please set catagory detail",
      });
    }
    return valid;
  }

  const saveOnclick = (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append("token", localStorage.getItem("token"));
    bodyFormData.append("name", name);
    bodyFormData.append("phoneNumber", phone);
    bodyFormData.append("detail", detail);
    bodyFormData.append("timeStart", time[0]);
    bodyFormData.append("timeEnd", time[1]);
    bodyFormData.append("userProfile", image);
    bodyFormData.append("activeDays", activeDays);
    bodyFormData.append("katagoriDetail", katagoriDetail);

    if (checkValid()) {
      axios({
        method: "post",
        url: BackendUrl + "/user/updateInstructor",
        data: bodyFormData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      })
        .then((success) => {
          console.log(success);
          if (success.data.status) {
            notification.success({
              message: "success",
              description: success.data.msg,
            });
          } else {
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-12">
            <div className="card card-shadow mb-5" style={boxStyle}>
              <div className="card-header d-flex justify-content-between">
                <h4 className="mb-0">User Info</h4>
                <UserOutlined style={{ fontSize: "25px" }} />
              </div>
              <div className="card-body">
                <Tabs defaultActiveKey="1">
                  <TabPane tab="User Info" key="1">
                    {compUserInfo()}
                  </TabPane>
                  <TabPane tab="Change Password" key="2">
                    {changePasswordComp()}
                  </TabPane>
                  <TabPane tab="Document" key="3">
                    {compBerkas()}
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorAboutMe;
