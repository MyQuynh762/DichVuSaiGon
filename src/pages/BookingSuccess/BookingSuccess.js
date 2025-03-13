import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Card, Row, Col, Typography, Divider, Spin, Button } from "antd";
import { getBookingById } from "../../services/bookingService";
import checkmarkImage from "../../image/success.png";
import calendarImage from "../../image/calendar.png";
import { formatCurrency } from "../../utils/formatCurrency";

const { Title, Text } = Typography;

const BookingSuccess = () => {
  const location = useLocation();
  const { bookingId } = useParams();
  const navigate = useNavigate(); // Sử dụng useNavigate thay cho useHistory
  const [bookingData, setBookingData] = useState(location.state || null);
  const [loading, setLoading] = useState(!location.state);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        setLoading(true);
        const data = await getBookingById(bookingId);
        setBookingData(data);
      } catch (error) {
        console.error("Không thể lấy thông tin lịch hẹn:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingData();
  }, []);

  if (loading) {
    return (
      <Spin
        size="large"
        style={{ display: "flex", justifyContent: "center", padding: "40px" }}
      />
    );
  }

  if (!bookingData) {
    return <p>Không tìm thấy thông tin lịch hẹn.</p>;
  }

  const service = bookingData.serviceId;
  const store = bookingData.storeId;
  const user = bookingData.userId;

  const bookingDate = new Date(bookingData.bookingDate);
  const day = bookingDate.toLocaleDateString("vi-VN", { weekday: "long" });
  const dateFormatted = bookingDate.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const startTime = bookingDate.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Hàm để điều hướng đến các trang khác
  const navigateToServices = () => {
    navigate("/list-service"); // Sử dụng navigate thay cho history.push
  };

  const navigateToBookingHistory = () => {
    navigate("/booking-history"); // Sử dụng navigate thay cho history.push
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
      <Card
        style={{
          width: "100%",
          maxWidth: "800px",
          borderRadius: "10px",
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <img
          src={checkmarkImage}
          alt="Xác nhận thành công"
          style={{
            width: "60px",
            height: "60px",
            marginBottom: "20px",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <Title level={2} style={{ marginTop: 10 }}>
          Đặt lịch hẹn thành công!
        </Title>
        <Text style={{ fontSize: "16px", color: "#555" }}>
          Chúng tôi đã gửi thông tin chi tiết của bạn qua email.
        </Text>

        <Divider />

        <Row justify="center" align="middle">
          <Col style={{ textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={calendarImage}
                alt="Lịch"
                style={{
                  width: "60px",
                  height: "60px",
                  marginRight: "15px",
                }}
              />
              <div style={{ textAlign: "left" }}>
                <Text style={{ fontSize: "16px", fontWeight: "bold" }}>
                  Thời gian: {startTime}
                </Text>
                <br />
                <Text style={{ fontSize: "16px", color: "#555" }}>
                  Ngày: {day}, {dateFormatted}
                </Text>
              </div>
            </div>
          </Col>
        </Row>

        <Divider />

        <Row gutter={[16, 16]} style={{ marginBottom: "16px", textAlign: "center" }}>
          <Col span={12}>
            <Text style={{ fontSize: "16px", fontWeight: "bold" }}>Khách hàng</Text>
            <br />
            <Text style={{ fontSize: "16px", color: "#555" }}>{user.fullName}</Text>
          </Col>
          <Col span={12}>
            <Text style={{ fontSize: "16px", fontWeight: "bold" }}>Email</Text>
            <br />
            <Text style={{ fontSize: "16px", color: "#555" }}>{user.email}</Text>
          </Col>
        </Row>

        <Divider />

        <Row gutter={[16, 16]} style={{ marginBottom: "16px", textAlign: "center" }}>
          <Col span={12}>
            <Text style={{ fontSize: "16px", fontWeight: "bold" }}>Dịch vụ</Text>
            <br />
            <Text style={{ fontSize: "16px", color: "#555" }}>{service.title}</Text>
          </Col>
          <Col span={12}>
            <Text style={{ fontSize: "16px", fontWeight: "bold" }}>Chi phí dự kiến</Text>
            <br />
            <Text style={{ fontSize: "16px", color: "#555" }}>
              {formatCurrency(service.avgPrice)}
            </Text>
          </Col>
        </Row>

        <Divider />

        <Row gutter={[16, 16]} style={{ marginBottom: "16px", textAlign: "center" }}>
          <Col span={12}>
            <Text style={{ fontSize: "16px", fontWeight: "bold" }}>Cửa hàng</Text>
            <br />
            <Text style={{ fontSize: "16px", color: "#555" }}>{store.storeName}</Text>
          </Col>
          <Col span={12}>
            <Text style={{ fontSize: "16px", fontWeight: "bold" }}>Địa chỉ</Text>
            <br />
            <Text style={{ fontSize: "16px", color: "#555" }}>{store.storeAddress}</Text>
          </Col>
        </Row>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(store.storeAddress)}&output=embed`}
            width="100%"
            height="300px"
            style={{
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        <Divider />

        <Text style={{ fontSize: "16px", color: "#555" }}>
          Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!
        </Text>

        {/* Thêm 2 nút điều hướng */}
        <div style={{ marginTop: "20px" }}>
          <Button
            type="primary"
            style={{
              marginRight: "10px",
              backgroundColor: "#FF6F3C", // Đặt màu chủ đạo cho nền nút
              borderColor: "#FF6F3C", // Đặt màu viền nút cho đồng bộ
              color: "#fff", // Màu chữ trắng để dễ đọc
            }}
            onClick={navigateToServices}
          >
            Các dịch vụ khác
          </Button>
          <Button
            type="default"
            style={{
              backgroundColor: "#FFFFFF", // Đặt màu chủ đạo cho nền nút
              borderColor: "#FF6F3C", // Đặt màu viền nút cho đồng bộ
              color: "#000000", // Màu chữ trắng để dễ đọc
            }}
            onClick={navigateToBookingHistory}
          >
            Lịch sử đặt lịch
          </Button>
        </div>

      </Card>
    </div>
  );
};

export default BookingSuccess;
