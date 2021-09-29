import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "antd/dist/antd.css";
function MyCarousel() {
  return (
    <React.Fragment>
      <div>
        <Carousel
          dynamicHeight={true}
          autoPlay
          infiniteLoop
          showArrows={true}
          stopOnHover={false}
          showThumbs={false}
        >
          <div>
            <img
              style={{ height: "500px", objectFit: "cover" }}
              src="https://venturebeat.com/wp-content/uploads/2020/12/discord.jpg?w=1200&strip=all"
              alt=""
            />
          </div>
          <div>
            <img
              style={{ height: "500px", objectFit: "cover" }}
              src="https://techcrunch.com/wp-content/uploads/2021/03/Invited.png?w=680"
              alt=""
            />
          </div>
          <div>
            <img
              style={{ height: "500px", objectFit: "cover" }}
              src="https://preview.redd.it/x9vsiutqh2z51.png?width=2880&format=png&auto=webp&s=9c3c788db30a718f0a2c11a3eb048457daf422e1"
              alt=""
            />
          </div>
          <div>
            <img
              style={{ height: "500px", objectFit: "cover" }}
              src="https://www.gannett-cdn.com/presto/2019/08/09/USAT/b1d25399-ae60-498c-b959-7e778ea30fa0-DISCORD-go-live-spectating.png"
              alt=""
            />
          </div>
        </Carousel>
      </div>
    </React.Fragment>
  );
}
export default MyCarousel;
