import React from "react";
import { Input, Select } from "antd";

const RegisterInstructorPage = () => {
  const { Option } = Select;
  function handleChangeKatagori(value) {
    console.log(`selected ${value}`);
  }
  return (
    <>
      <div className="container myaccount">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h3>Register as instructor</h3>
                <form encType="multipart/form-data">
                  <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Catagories</label>
                    <div class="col-sm-10">
                      <Select
                        defaultValue="language"
                        style={{ width: "100%" }}
                        onChange={handleChangeKatagori}
                      >
                        <Option value="language">Language</Option>
                        <Option value="cooking">Cooking</Option>
                        <Option value="sports">Sports</Option>
                        <Option value="design">Design</Option>
                        <Option value="programming">Programming</Option>
                      </Select>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">
                      Upload CV
                    </label>
                    <div class="col-sm-10">
                      <div class="custom-file">
                        <input type="file" accept="application/pdf" />
                        <p className="text-danger">Only pdf file</p>
                      </div>
                    </div>
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
