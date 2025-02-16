import React, { useState } from "react";
import { Card, Row, Col, Typography, Divider } from "antd";
import checkmarkImage from "../../image/success.png"; // Đường dẫn đến ảnh xác nhận
import calendarImage from "../../image/calendar.png"; // Đường dẫn đến ảnh lịch
import { formatCurrency } from "../../utils/formatCurrency";

const { Title, Text } = Typography;

// Dữ liệu giả định cho lịch hẹn
const rawBookingData = {
  bookingId: "123456",
  bookingTime: "2024-02-20T14:30:00",
  service: {
    serviceName: "Sửa máy lạnh",
  },
  preferredStaff: {
    name: "Nguyễn Văn A",
  },
  customer: {
    name: "Trần Minh B",
    address: "123 Đường Lê Lợi, Quận 1, TP. HCM",
  },
  totalCost: 350000,
};

const BookingSuccess = () => {
  const [bookingData] = useState(rawBookingData);

  // Format ngày và giờ từ bookingTime
  const bookingDate = new Date(bookingData.bookingTime);
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

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
      <Card
        style={{
          width: "100%",
          maxWidth: "600px",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <img
          src={checkmarkImage}
          alt="Xác nhận thành công"
          style={{ width: "48px", height: "48px" }}
        />
        <Title level={2} style={{ marginTop: 10 }}>
          Đặt lịch hẹn thành công!
        </Title>
        <Text style={{ fontSize: "16px", color: "#555" }}>
          Chúng tôi đã gửi thông tin chi tiết của bạn qua email.
        </Text>

        <Divider />

        {/* Chi tiết lịch hẹn */}
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

        {/* Thông tin chi tiết */}
        <Row
          gutter={[16, 16]}
          style={{ marginBottom: "16px", textAlign: "center" }}
        >
          <Col span={8}>
            <Text style={{ fontSize: "16px", fontWeight: "bold" }}>Dịch vụ</Text>
            <br />
            <Text style={{ fontSize: "16px", color: "#555" }}>
              {bookingData.service.serviceName}
            </Text>
          </Col>
          <Col span={8}>
            <Text style={{ fontSize: "16px", fontWeight: "bold" }}>Nhân viên</Text>
            <br />
            <Text style={{ fontSize: "16px", color: "#555" }}>
              {bookingData.preferredStaff.name}
            </Text>
          </Col>
          <Col span={8}>
            <Text style={{ fontSize: "16px", fontWeight: "bold" }}>Khách hàng</Text>
            <br />
            <Text style={{ fontSize: "16px", color: "#555" }}>
              {bookingData.customer.name}
            </Text>
          </Col>
        </Row>

        {/* Chi phí dự kiến */}
        <Row
          justify="center"
          style={{ marginTop: "16px", textAlign: "center" }}
        >
          <Col>
            <Text style={{ fontSize: "16px", fontWeight: "bold" }}>
              Chi phí dự kiến:
            </Text>
            <br />
            <Text style={{ fontSize: "18px", color: "#4CAF50" }}>
              {formatCurrency(bookingData.totalCost)}
            </Text>
          </Col>
        </Row>

        {/* Địa chỉ khách hàng */}
        <Row
          justify="center"
          style={{ marginTop: "16px", textAlign: "center" }}
        >
          <Col>
            <Text style={{ fontSize: "16px", fontWeight: "bold" }}>
              Địa chỉ khách hàng:
            </Text>
            <br />
            <Text style={{ fontSize: "16px", color: "#555" }}>
              {bookingData.customer.address}
            </Text>
          </Col>
        </Row>

        <Divider />

        <Text style={{ fontSize: "16px", color: "#555" }}>
          Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!
        </Text>
      </Card>
    </div>
  );
};

export default BookingSuccess;
