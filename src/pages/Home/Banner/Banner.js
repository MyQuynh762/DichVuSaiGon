import React from "react";
import Slider from "./Slider"; // Giả sử Slider là component hiển thị mainBanner
import { Link } from "react-router-dom";

const Banner = ({ mainBanner, rightMainBanner }) => {
  return (
    <section id="home-banner">
      <div className="container">
        <div className="home-banner-content">
          {/* Hiển thị mainBanner trong Slider */}
          <div className="banner-slider-wrapper banner-left">
            <Slider banners={mainBanner} /> {/* Truyền mainBanner vào Slider */}
          </div>

          {/* Hiển thị rightMainBanner */}
          <div className="banner-right-imgs">
            {rightMainBanner.map((item) => (
              <div key={item._id} className="banner-img-wrapper">
                <Link to="/list-service">
                  {item.images.map((image, index) => (
                    <img
                      key={index}
                      src={image} // Hiển thị tất cả ảnh trong mảng images
                      alt={`banner-img-${index + 1}`}
                      style={{
                        width: "390px",
                        height: "193px",
                        objectFit: "cover",
                        marginBottom: "10px", // Tạo khoảng cách giữa các ảnh
                      }}
                    />
                  ))}
                </Link>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;
