import React from "react";
import { Carousel } from "antd";
import "antd/dist/antd.css";
// import { LeftOutlined, RightOutlined } from "@ant-design/icons";
function MyCarousel() {
  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
  };

  // const RightArrow = () => {
  //   return <Button icon={<RightOutlined />} size="middle" />;
  // };

  // const LeftArrow = () => {
  //   return <Button icon={<LeftOutlined />} size="middle" />;
  // };

  return (
    <React.Fragment>
      <Carousel autoplay effect="fade">
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </React.Fragment>
  );
}

export default MyCarousel;
