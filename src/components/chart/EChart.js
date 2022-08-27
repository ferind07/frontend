import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import BackendUrl from "../BackendUrl";

function EChart() {
  // useEffect(() => {
  //   getSales();
  // }, []);

  const { Title, Paragraph } = Typography;

  const items = [
    {
      Title: "3,6K",
      user: "Users",
    },
    {
      Title: "2m",
      user: "Clicks",
    },
    {
      Title: "$772",
      user: "Sales",
    },
    {
      Title: "82",
      user: "Items",
    },
  ];

  // const chart = () => {
  //   if (eChart == undefined) {
  //     return (
  //       <>
  //         <p>No chart</p>
  //       </>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <ReactApexChart
  //           className="bar-chart"
  //           options={eChart.options}
  //           series={eChart.series}
  //           type="bar"
  //           height={220}
  //         />
  //       </>
  //     );
  //   }
  // };

  return (
    <>
      {/* <div id="chart">{eChart == undefined ? "Not Available" : chart()}</div> */}
      <div className="chart-vistior">
        <Title level={5}>Active Users</Title>
        <Paragraph className="lastweek">
          than last week <span className="bnb2">+30%</span>
        </Paragraph>
        <Paragraph className="lastweek">
          We have created multiple options for you to put together and customise
          into pixel perfect pages.
        </Paragraph>
        <Row gutter>
          {items.map((v, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="chart-visitor-count">
                <Title level={4}>{v.Title}</Title>
                <span>{v.user}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default EChart;
