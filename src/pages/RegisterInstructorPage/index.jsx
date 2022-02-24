import React, { useState } from "react";
import { Select } from "antd";
import { Viewer } from "@react-pdf-viewer/core";
import { Worker } from "@react-pdf-viewer/core";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";

const RegisterInstructorPage = () => {
  const { Option } = Select;
  const [url, setUrl] = useState("");
  const [fileBerkas, setFileBerkas] = useState();
  const [katagori, setKatagori] = useState(1);

  function handleChangeKatagori(value) {
    console.log(`selected ${value}`);
    setKatagori(value);
  }
  const onChange = (e) => {
    const files = e.target.files;
    setFileBerkas(e.target.files[0]);
    files.length > 0 && setUrl(URL.createObjectURL(files[0]));
  };

  const onClickSubmit = (e) => {
    e.preventDefault();
    //console.log(localStorage.getItem("token"));
    console.log("btn submit clicked");
    let bodyFormData = new FormData();
    bodyFormData.append("katagori", katagori);
    bodyFormData.append("berkas", fileBerkas);
    bodyFormData.append("token", localStorage.getItem("token"));
    axios({
      method: "post",
      url: BackendUrl + "/user/registerInstructor",
      data: bodyFormData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((success) => {
        console.log(success);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container myaccount">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h3>Register as instructor</h3>
                <form
                  encType="multipart/form-data"
                  onSubmit={(e) => onClickSubmit(e)}
                >
                  <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Catagories</label>
                    <div class="col-sm-10">
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
                  <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">
                      Upload CV
                    </label>
                    <div class="col-sm-10">
                      <div class="custom-file">
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
