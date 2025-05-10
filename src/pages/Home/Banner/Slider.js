import React, { useState } from "react";
import { VscChevronRight, VscChevronLeft } from "react-icons/vsc";
import { Link } from "react-router-dom";

const Slider = ({ banners }) => {
  const [tabIndex, setTabIndex] = useState(1);

  // Kiểm tra và khởi tạo mặc định banners.images nếu không có dữ liệu
  const images = banners[0]?.images || []; // Nếu banners hoặc banners.images không có, gán mảng rỗng

  const handleRightBtnClick = () => {
    setTabIndex(tabIndex + 1);
    if (tabIndex >= images.length) setTabIndex(1); // Quay lại slide đầu tiên nếu tới cuối
  };

  const handleLeftBtnClick = () => {
    setTabIndex(tabIndex - 1);
    if (tabIndex <= 1) setTabIndex(images.length); // Quay lại slide cuối nếu đi trước slide đầu tiên
  };

  return (
    <div className="banner-slider">
      {/* ======= Slide item ======= */}
      {images.map((item, index) => (
        <div
          key={index} // Dùng index làm key khi không có _id duy nhất
          className={index + 1 === tabIndex ? "slide-item" : "d-none"}
        >
          <Link to="/list-service">
            <img
              src={item} // Lấy ảnh từ mảng images
              alt={`Banner ${index + 1}`}
              style={{
                width: "876px",
                height: "415px",
                objectFit: "cover",
              }}
            />
          </Link>
        </div>
      ))}

      {/* ======= Slider buttons ======= */}
      <div className="slider-btns">
        <button onClick={handleLeftBtnClick} className="left-btn">
          <VscChevronLeft />
        </button>
        <button onClick={handleRightBtnClick} className="right-btn">
          <VscChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Slider;
