import React from "react";
import stepOne from "../../image/step1.jpg";
import stepTwo from "../../image/step2.jpg";
import stepThree from "../../image/step3.jpg";
import stepFour from "../../image/step4.jpg";

function Procedure() {
  return (
    <div
      style={{
        marginTop: "30px",
        padding: "30px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "28px", color: "#333", fontWeight: "bold" }}>
          Quy trình đăng dịch vụ lên nền tảng
        </h1>
      </div>

      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          listStyleType: "none",
          padding: 0,
          gap: "30px",
        }}
      >
        <li
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "240px",
            padding: "15px",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.1)";
          }}
        >
          <div style={{ padding: "15px" }}>
            <img
              src={stepOne}
              alt="step1"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
                marginBottom: "15px",
                objectFit: "cover",
              }}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <h3
              style={{
                fontSize: "18px",
                color: "#ff6f3c",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Đăng ký tài khoản cửa hàng
            </h3>
            <p style={{ fontSize: "16px", color: "#666", margin: 0 }}>
              Để bắt đầu, cửa hàng của bạn cần tạo một tài khoản và đăng ký trên nền tảng.
            </p>
          </div>
        </li>

        <li
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "240px",
            padding: "15px",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.1)";
          }}
        >
          <div style={{ padding: "15px" }}>
            <img
              src={stepTwo}
              alt="step2"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
                marginBottom: "15px",
                objectFit: "cover",
              }}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <h3
              style={{
                fontSize: "18px",
                color: "#ff6f3c",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Đăng tải dịch vụ và thông tin
            </h3>
            <p style={{ fontSize: "16px", color: "#666", margin: 0 }}>
              Thêm các dịch vụ của bạn, bao gồm mô tả, hình ảnh và giá cả, để khách hàng dễ dàng tìm thấy và chọn lựa.
            </p>
          </div>
        </li>

        <li
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "240px",
            padding: "15px",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.1)";
          }}
        >
          <div style={{ padding: "15px" }}>
            <img
              src={stepThree}
              alt="step3"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
                marginBottom: "15px",
                objectFit: "cover",
              }}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <h3
              style={{
                fontSize: "18px",
                color: "#ff6f3c",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Xác nhận và kích hoạt dịch vụ
            </h3>
            <p style={{ fontSize: "16px", color: "#666", margin: 0 }}>
              Sau khi dịch vụ đã được đăng tải, chúng tôi sẽ xác nhận và kích hoạt để khách hàng có thể dễ dàng đặt dịch vụ.
            </p>
          </div>
        </li>

        <li
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "240px",
            padding: "15px",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.1)";
          }}
        >
          <div style={{ padding: "15px" }}>
            <img
              src={stepFour}
              alt="step4"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
                marginBottom: "15px",
                objectFit: "cover",
              }}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <h3
              style={{
                fontSize: "18px",
                color: "#ff6f3c",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Theo dõi và đánh giá dịch vụ
            </h3>
            <p style={{ fontSize: "16px", color: "#666", margin: 0 }}>
              Quản lý các dịch vụ đã đăng và nhận phản hồi từ khách hàng để nâng cao chất lượng dịch vụ.
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Procedure;
