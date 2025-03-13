import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Image, message, Pagination } from "antd";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { formatCurrency } from "../../utils/formatCurrency";
import { getReviewsByServiceId } from "../../services/reviewService";

function Hourly() {
  const location = useLocation();
  const navigate = useNavigate();
  const { service } = location.state || {};
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);
  const feedbackLimit = 5;
  const [currentImage, setCurrentImage] = useState(service.serviceImages[0]);

  const handleImageClick = (image) => {
    setCurrentImage(image); // Cập nhật ảnh hiển thị lớn
  };
  useEffect(() => {
    if (service?._id) {
      fetchFeedbacks(service._id, currentPage, feedbackLimit);
    }
  }, [service, currentPage]);

  const fetchFeedbacks = async (serviceId, page, limit) => {
    try {
      const response = await getReviewsByServiceId(serviceId, page, limit);
      setFeedbacks(response.reviews);
      setTotalFeedbacks(response.totalReviews);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  if (!service) {
    return <p>Không có thông tin dịch vụ.</p>;
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

  const handleStoreClick = (storeMapUrl) => {
    window.open(storeMapUrl, "_blank");
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
      {/* Giới thiệu dịch vụ */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", marginBottom: "40px", marginTop: "40px" }}>
        {/* Phần tên dịch vụ */}
        <div style={{ flex: 2 }}>
          <h2 style={{ fontSize: "26px", fontWeight: "bold", color: "#FF6F3C", marginBottom: "10px" }}>
            Dịch vụ
          </h2>
          <h3 style={{ fontSize: "34px", fontWeight: "bold", color: "#333", marginBottom: "10px" }}>
            {service.title}
          </h3>
          <p style={{ fontSize: "16px", lineHeight: "1.5", color: "#555", marginBottom: "20px" }}>
            {service.shortDescription}
          </p>
          {service.availableForBooking && <button
            onClick={() => handleExperienceClick(service)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#FF6F3C",
              color: "#fff",
              borderRadius: "5px",
              fontSize: "16px",
              border: "none",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Trải nghiệm dịch vụ
          </button>}
        </div>

        {/* Phần ảnh dịch vụ */}
        <div style={{ flex: 1 }}>
          <img
            src={currentImage}
            alt={service.serviceName}
            style={{
              width: "100%",
              height: "300px",
              borderRadius: "10px",
              objectFit: "cover",
              cursor: "pointer",
            }}
            onClick={() => handleImageClick(service.serviceImages[0])} // Hiển thị ảnh lớn khi nhấp vào ảnh chính
          />
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            {service.serviceImages.map((image, index) => (
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
                onClick={() => handleImageClick(image)} // Hiển thị ảnh khi nhấp vào ảnh nhỏ
              />
            ))}
          </div>
        </div>
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
        <h3 style={{ fontSize: "22px", color: "#FF6F3C", marginBottom: "15px" }}>Mô tả dịch vụ</h3>
        <div
          style={{ fontSize: "14px", color: "#555", lineHeight: "1.6" }}
          dangerouslySetInnerHTML={{ __html: service.fullDescription }}
        />
        <p style={{ fontSize: "16px", color: "#333", marginTop: "15px" }}>
          Giá trung bình từ:{" "}
          <strong style={{ color: "#FF6F3C" }}>
            {formatCurrency(service.avgPrice)}
          </strong>
        </p>
      </div>

      {/* Phần hiển thị các Feedback */}
      <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px", marginBottom: "30px" }}>
        <h3 style={{ fontSize: "22px", fontWeight: "bold", color: "#FF6F3C", marginBottom: "15px" }}>
          Danh sách cửa hàng
        </h3>
        {service.storeIds.map((store) => (
          store._id && <div
            key={store._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              marginBottom: "20px",
              gap: "20px",
            }}
          >
            {/* Hiển thị ảnh cửa hàng */}
            <div style={{ width: "150px", height: "150px", overflow: "hidden", borderRadius: "8px" }}>
              <img
                src={store.storeImages[0]}
                alt={store.storeName}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>

            {/* Thông tin cửa hàng */}
            <div style={{ flex: 1 }}>
              <h4 style={{ fontWeight: "bold", color: "#333", marginBottom: "5px" }}>{store.storeName}</h4>
              <p style={{ color: "#555", marginBottom: "5px" }}>Địa chỉ: {store.storeAddress}</p>
              <p style={{ color: "#555", marginBottom: "5px" }}>
                <strong>SĐT:</strong> {store.storePhone}
              </p>
              <p style={{ color: "#555" }}>
                <strong>Email:</strong> {store.storeEmail}
              </p>
            </div>

            {/* Nút Xem bản đồ */}
            <button
              onClick={() => handleStoreClick(store.storeMaps)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#FF6F3C",
                color: "#fff",
                borderRadius: "5px",
                fontSize: "14px",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
                display: "flex",
                alignItems: "center", // Để căn giữa biểu tượng và văn bản
                gap: "10px", // Khoảng cách giữa biểu tượng và văn bản
              }}
            >
              {/* Biểu tượng chỉ đường */}
              <FontAwesomeIcon
                icon={faMapMarkedAlt} // Sử dụng biểu tượng chỉ đường
                style={{ fontSize: "16px", color: "#fff" }} // Đặt màu và kích thước biểu tượng
              />
              <span>Chỉ đường</span>
            </button>

          </div>
        ))}
      </div>
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          marginTop: "40px",
          marginBottom: "30px",
        }}
      >
        <h3
          style={{
            fontSize: "22px",
            color: "#FF6F3C",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Đánh giá của khách hàng
        </h3>
        {feedbacks.length === 0 ? (
          <p style={{ color: "#555", fontSize: "16px" }}>
            Hiện tại chưa có đánh giá nào cho dịch vụ này.
          </p>
        ) : (
          feedbacks.map((feedback, index) => (
            <div
              key={index}
              style={{
                borderBottom: "1px solid #e0e0e0",
                paddingBottom: "20px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <img
                    src={feedback.userId.avatar || "https://i.pinimg.com/originals/94/e4/cb/94e4cb5ae194975f6dc84d1495c3abcd.gif"}
                    alt={feedback.userId.fullName}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <h4
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        margin: 0,
                      }}
                    >
                      {feedback.userId.fullName} -{" "}
                      {formatPhoneNumber(feedback.userId.phone)}
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          style={{
                            color: i < feedback.rating ? "#FFD700" : "#e0e0e0", // Màu vàng cho sao được chọn, xám cho sao không chọn
                            fontSize: "16px",
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#000000",
                    fontWeight: "500",
                  }}
                >
                  {new Date(feedback.created_at).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div style={{ marginTop: "10px" }}>
                <div style={{ fontSize: "16px", color: "#333" }}>
                  {feedback.comment}
                </div>
                <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                  {feedback.images.map((image, imgIndex) => (
                    <Image
                      width={70}
                      height={70}
                      src={image}
                      alt={`Review Image ${imgIndex + 1}`}
                      style={{ borderRadius: "8px" }}
                    />
                  ))}
                </div>

              </div>
              <Pagination
                current={currentPage}
                pageSize={feedbackLimit}
                total={totalFeedbacks}
                onChange={(page) => setCurrentPage(page)}
                style={{ textAlign: "center", marginTop: "20px" }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Hourly;
