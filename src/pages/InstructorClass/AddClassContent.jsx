import React, { useState } from "react";
import { Input, notification } from "antd";
import ReactQuill from "react-quill";
import "./index.css";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";

const AddClassContent = (props) => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [classCount, setClassCount] = useState(1);
  const [image, setImage] = useState();

  const onSubmit = (e) => {
    e.preventDefault();

    let bodyFormData = new FormData();
    bodyFormData.append("token", localStorage.getItem("token"));
    bodyFormData.append("title", title);
    bodyFormData.append("detail", value);
    bodyFormData.append("duration", duration);
    bodyFormData.append("price", price);
    bodyFormData.append("classCount", classCount);
    bodyFormData.append("classImage", image);

    axios({
      method: "post",
      url: BackendUrl + "/user/addClass",
      data: bodyFormData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((success) => {
        //console.log(success);
        if (success.data.status == true) {
          notification.success({
            message: "Success",
            description: success.data.msg,
          });
          setValue("");
          setTitle("");
          setDuration("");
          setPrice("");
          setImage();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <>
      <div style={{ height: "100%", minHeight: "75vh" }}>
        <h3 className="mb-0">Add Class</h3>
        <p className="text-muted">Create new class</p>
        <hr className="mt-0" />
        <form encType="multipart/form-data">
          <Input
            type="text"
            placeholder="Class title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Duration"
            className="mt-2"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Price"
            className="mt-2 mb-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <ReactQuill theme="snow" value={value} onChange={setValue} />
          <p className="mb-0 mt-2">Class Count</p>
          <Input
            type="number"
            placeholder="Price"
            className="mt-1 mb-2"
            value={classCount}
            onChange={(e) => setClassCount(e.target.value)}
            min={1}
          />
          <input
            type="file"
            name="classImage"
            className="mt-2"
            onChange={(e) => handleImageChange(e)}
          />
          <br />
          {image && (
            <div>
              <p className="mb-0 mt-2">Image Preview</p>
              <img
                src={URL.createObjectURL(image)}
                alt="Thumb"
                style={{ width: "30vw", aspectRatio: "16 / 9" }}
                className="mt-2"
              />
            </div>
          )}
          <br />
          <button onClick={(e) => onSubmit(e)}>Submit</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              props.functionGetClass();
            }}
          >
            load class
          </button>
        </form>
      </div>
    </>
  );
};

export default AddClassContent;
