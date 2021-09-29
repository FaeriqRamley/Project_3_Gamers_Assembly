import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "antd/dist/antd.css";
import components from "./assets/components.png";
import dashboard from "./assets/dashboard.png";
import schedule from "./assets/dashboard.png";
import search from "./assets/searchPage.png";
function MyCarousel() {
  const arrowStyles = {
    position: "absolute",
    zIndex: 2,
    top: "calc(35% )",
    width: 70,
    height: 130,
  };

  return (
    <React.Fragment>
      <div>
        <Carousel
          dynamicHeight={true}
          autoPlay
          infiniteLoop
          showStatus={false}
          showArrows={true}
          stopOnHover={false}
          showThumbs={false}
          style={{ ...arrowStyles }}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                style={{
                  ...arrowStyles,
                  left: 15,
                  fontSize: "50px",
                }}
              >
                {`<`}
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                style={{ ...arrowStyles, right: 15, fontSize: "50px" }}
              >
                {`>`}
              </button>
            )
          }
        >
          <div>
            <img
              style={{ height: "500px", objectFit: "contain" }}
              src={components}
              alt=""
            />
          </div>
          <div>
            <img
              style={{ height: "500px", objectFit: "contain" }}
              src={search}
              alt=""
            />
          </div>
          <div>
            <img
              style={{ height: "500px", objectFit: "contain" }}
              src={dashboard}
              alt=""
            />
          </div>
          <div>
            <img
              style={{ height: "500px", objectFit: "contain" }}
              src={schedule}
              alt=""
            />
          </div>
        </Carousel>
      </div>
    </React.Fragment>
  );
}
export default MyCarousel;
