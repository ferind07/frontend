import React, { useState, useEffect } from "react";
import { DatePicker, Button } from "antd";

const TopUserComp = () => {
  const [time, setTime] = useState([]);

  const { RangePicker } = DatePicker;

  return (
    <>
      <div className="w-100">
        <h3 className="mb-2">Top user</h3>
        <hr className="mt-0" />
        <div className="d-flex" style={{ gap: "20px" }}>
          <div className="center">
            <p className="mb-0">Filter</p>
          </div>

          <RangePicker
            value={time}
            onChange={(value) => {
              setTime(value);
            }}
          />

          <Button type="primary">Filter</Button>
        </div>
      </div>
    </>
  );
};

export default TopUserComp;
