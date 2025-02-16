import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllServices } from "../../services/serviceService";
import { formatCurrency } from "../../utils/formatCurrency";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        backgroundColor: "#FF6F3C",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        textAlign: "center",
        lineHeight: "50px",
        marginRight: "70px",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        backgroundColor: "#FF6F3C",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        textAlign: "center",
        lineHeight: "50px",
        marginLeft: "70px",
      }}
      onClick={onClick}
    />
  );
}

function SampleSlider() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const services = [
    {
      _id: "1",
      serviceName: "Sửa máy lạnh",
      shortDescription: "Dịch vụ sửa chữa và bảo dưỡng máy lạnh tại nhà.",
      basePrice: 300000,
      images: ["https://i.pinimg.com/736x/6b/98/af/6b98afbc476469c994e265b370a47c85.jpg"],
    },
    {
      _id: "2",
      serviceName: "Dạy tiếng Anh",
      shortDescription: "Gia sư tiếng Anh cho trẻ em và người lớn theo giờ tại nhà hoặc online.",
      basePrice: 500000,
      images: ["https://i.pinimg.com/736x/c0/dd/57/c0dd57783ed27510197f61ec2b3bdace.jpg"],
    },
    {
      _id: "3",
      serviceName: "Làm nail",
      shortDescription: "Chăm sóc móng chuyên nghiệp, trang trí sáng tạo.",
      basePrice: 200000,
      images: ["https://i.pinimg.com/736x/e7/a1/53/e7a153819fb9bda4319cad0d468c1bf9.jpg"],
    },
    {
      _id: "4",
      serviceName: "Cắt tóc nam",
      shortDescription: "Tạo kiểu tóc nam thời thượng, chuyên nghiệp uốn, nhuộm, v.v.",
      basePrice: 150000,
      images: ["https://i.pinimg.com/736x/3c/60/06/3c600668fcfcff6544e52058176c3835.jpg"],
    },
    {
      _id: "5",
      serviceName: "Vệ sinh máy giặt",
      shortDescription: "Làm sạch, bảo trì máy giặt giúp tăng tuổi thọ thiết bị.",
      basePrice: 350000,
      images: ["https://i.pinimg.com/736x/1a/25/97/1a2597586cb9c6663281d1a503f3631d.jpg"],
    },
    {
      _id: "6",
      serviceName: "Massage thư giãn",
      shortDescription: "Dịch vụ massage tại nhà giúp giảm căng thẳng, mệt mỏi.",
      basePrice: 600000,
      images: ["https://i.pinimg.com/736x/54/a7/f2/54a7f238c63dd1da7dc53b7789a74685.jpg"],
    },
  ];


  const handleBookingClick = (service) => {
    navigate("/service", { state: { serviceId: service._id } });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div style={{ padding: "20px" }}>
      <Slider {...settings}>
        {services.map((service) => (
          <div
            key={service._id}
            style={{
              padding: "0 15px", // Add horizontal padding between cards
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "15px",
                overflow: "hidden",
                padding: "15px",
                position: "relative",
                textAlign: "left",
              }}
            >
              <img
                src={service.images[0]}
                alt={service.serviceName}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
                onClick={() => handleBookingClick(service)}
              />
              <div style={{ padding: "10px 0" }}>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#333",
                    cursor: "pointer",
                  }}
                  onClick={() => handleBookingClick(service)}
                >
                  {service.serviceName}
                </h3>
                <p style={{ color: "#888", fontSize: "14px", margin: "5px 0" }}>
                  {service.shortDescription.slice(0, 60) + "..."}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#333",
                      marginRight: "10px",
                    }}
                  >
                    <strong>Giá dự tính:</strong>{" "}
                    {formatCurrency(service.basePrice)}
                  </span>
                </div>
                <button
                  style={{
                    marginTop: "10px",
                    padding: "10px 20px",
                    backgroundColor: "#ff6f3c",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                  onClick={() => handleBookingClick(service)}
                >
                  Đặt Ngay
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SampleSlider;
