import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message, Pagination } from "antd";
import "./index.css";
import { formatCurrency } from "../../utils/formatCurrency";

function StoreDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { store } = location.state || {}; // Store object from the state passed by the navigate
  const [currentImage, setCurrentImage] = useState(store?.storeImages[0]);

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  if (!store) {
    return <p>Không có thông tin cửa hàng.</p>;
  }

  const handleExperienceClick = (service) => {
    if (!isAuthenticated) {
      message.warning("Bạn cần đăng nhập để đặt dịch vụ.");
      navigate("/login");
    } else {
      navigate("/service", { state: { serviceId: service._id } });
    }
  };

  const formatPhoneNumber = (phone) => {
    return phone.slice(0, 3) + "*****" + phone.slice(-2);
  };
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
      {/* Giới thiệu cửa hàng */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", marginBottom: "40px", marginTop: "40px" }}>
        <div style={{ flex: 2 }}>
          <h2 style={{ fontSize: "26px", fontWeight: "bold", color: "#FF6F3C", marginBottom: "10px" }}>Cửa hàng</h2>
          <h3 style={{ fontSize: "34px", fontWeight: "bold", color: "#333", marginBottom: "10px" }}>
            {store.storeName}
          </h3>

          <p style={{ fontSize: "16px", color: "#555", marginBottom: "10px" }}>
            <strong>SĐT:</strong> {store.storePhone}
          </p>
          <p style={{ fontSize: "16px", color: "#555", marginBottom: "10px" }}>
            <strong>Email:</strong> <a href={`mailto:${store.storeEmail}`} style={{ color: "#FF6F3C" }}>{store.storeEmail}</a>
          </p>
          <p style={{ fontSize: "16px", color: "#555", marginBottom: "20px" }}>
            <strong>Địa chỉ:</strong>{" "}
            <a
              href={store.storeMaps}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#FF6F3C", textDecoration: "underline" }}
            >
              {store.storeAddress}
            </a>
          </p>

          <div
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "space-between",
              gap: "20px"
            }}
          >
            {/* Card 1: Thông tin Chủ cửa hàng */}
            <div
              style={{
                flex: 1,
                padding: "20px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                minWidth: "300px"
              }}
            >
              <h3 style={{ fontSize: "22px", color: "#FF6F3C", marginBottom: "15px" }}>Chủ cửa hàng</h3>

              <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                <img
                  src={store.admin.avatar || "https://i.pinimg.com/originals/79/26/63/792663781667c074b1738cb02e914c82.gif"}
                  alt={store.admin.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <div>
                  <div style={{ fontSize: "16px", color: "#555", marginBottom: "10px" }}>
                    <strong>Tên: </strong> {store.admin.name}
                  </div>
                  <div style={{ fontSize: "16px", color: "#555", marginBottom: "10px" }}>
                    <strong>Email: </strong> <a href={`mailto:${store.admin.email}`} style={{ color: "#FF6F3C" }}>{store.admin.email}</a>
                  </div>
                  <div style={{ fontSize: "16px", color: "#555" }}>
                    <strong>SĐT: </strong> {formatPhoneNumber(store.admin.phone)}
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Bản đồ Cửa hàng */}
            <div
              style={{
                flex: 1,
                padding: "10px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                minWidth: "300px"
              }}
            >
              <div style={{
                width: "100%",
                height: "200px",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
              }}>
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: "none", borderRadius: "8px" }}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(store.storeAddress)}&output=embed`}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

        </div>


        <div style={{ flex: 1 }}>
          <img
            src={currentImage}
            alt={store.storeName}
            style={{
              width: "100%",
              height: "300px",
              borderRadius: "10px",
              objectFit: "cover",
              cursor: "pointer",
            }}
            onClick={() => setCurrentImage(store.storeImages[0])} // Hiển thị ảnh lớn khi nhấp vào ảnh chính
          />
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            {store.storeImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Additional image ${index}`}
                style={{
                  width: "100px",
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => setCurrentImage(image)} // Hiển thị ảnh khi nhấp vào ảnh nhỏ
              />
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          marginBottom: "40px",
        }}
      >
        <h3 style={{ fontSize: "22px", color: "#FF6F3C", marginBottom: "15px" }}>Mô tả cửa hàng</h3>
        <div
          style={{ fontSize: "14px", color: "#555", lineHeight: "1.6" }}
          dangerouslySetInnerHTML={{ __html: store.storeDescription }}
        />

      </div>

      {/* Chi tiết đầy đủ của dịch vụ */}
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          marginBottom: "40px",
        }}
      >
        <h3 style={{ fontSize: "22px", color: "#FF6F3C", marginBottom: "15px" }}>Dịch vụ</h3>
        {store.services.map((service) => (
          <div
            key={service._id}
            style={{ marginBottom: "30px", display: "flex", gap: "20px" }}
          >
            {/* Image of the service */}
            <div style={{ flex: 1, maxWidth: "150px" }}>
              <img
                src={service.serviceImages[0]}
                alt={service.title}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/hourly", { state: { service } })}
              />
            </div>

            {/* Service details */}
            <div
              style={{
                flex: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%"
              }}
            >
              <div>
                <h4
                  onClick={() => navigate("/hourly", { state: { service } })}
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#333",
                    cursor: "pointer",
                    marginBottom: "10px",
                    textDecoration: "underline",
                  }}
                >
                  {service.title}
                </h4>
                <p style={{ fontSize: "16px", color: "#555", marginBottom: "5px" }}>
                  {service.shortDescription}
                </p>
                <p style={{ fontSize: "16px", color: "#FF6F3C", marginBottom: "0" }}>
                  Giá trung bình: <strong>{formatCurrency(service.avgPrice)}</strong>
                </p>
              </div>

              {service.availableForBooking && (
                <button
                  onClick={() => handleExperienceClick(service)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#FF6F3C",
                    color: "#fff",
                    borderRadius: "5px",
                    fontSize: "16px",
                    border: "none",
                    cursor: "pointer",
                    whiteSpace: "nowrap", // Đảm bảo button không bị xuống dòng
                  }}
                >
                  Trải nghiệm dịch vụ
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StoreDetail;
