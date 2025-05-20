import React, { useState, useRef } from "react";
import { Input, Button, message, Form } from "antd";
import { registerSupplier } from "../../services/authService";

function Employee() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    businessLicense: null, // To store the business license file
    role: "supplier", // Setting role as 'supplier'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Add loading state
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
    ];

    if (file && allowedTypes.includes(file.type)) {
      setFormData((prevData) => ({
        ...prevData,
        businessLicense: file,
      }));
    } else {
      message.error("Chỉ chấp nhận các file pdf, doc, docx, jpg, jpeg, png.");
    }
  };

  const validateForm = () => {
    let validationErrors = {};

    if (!formData.fullName.trim()) {
      validationErrors.fullName = "Vui lòng nhập họ tên.";
    }
    if (!formData.phone.trim()) {
      validationErrors.phone = "Vui lòng nhập số điện thoại.";
    } else if (!/^\d{10,11}$/.test(formData.phone)) {
      validationErrors.phone = "Số điện thoại không hợp lệ.";
    }
    if (!formData.email.trim()) {
      validationErrors.email = "Vui lòng nhập email.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      validationErrors.email = "Email không hợp lệ.";
    }
    if (!formData.businessLicense) {
      validationErrors.businessLicense = "Vui lòng tải lên giấy phép kinh doanh.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true); // Set loading to true when the form starts submitting

    const formDataToSend = new FormData();
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("businessLicense", formData.businessLicense); // Append business license file
    formDataToSend.append("role", formData.role); // Set role as supplier

    try {
      const response = await registerSupplier(formDataToSend);

      if (response.success) {
        message.success("Đăng ký thành công. Vui lòng chờ duyệt.");
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          password: "",
          businessLicense: null,
          role: "supplier", // Reset role
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        message.error(response.message || "Đăng ký thất bại.");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Đăng ký thất bại.");
    } finally {
      setLoading(false); // Set loading to false after the submission process is complete
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: "50px 20px",
      }}
    >
      {/* Phần text bên trái */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          marginRight: "40px",
          maxWidth: "500px",
        }}
      >
        <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "#ff6f3c" }}>
          Cung cấp dịch vụ cho khách hàng
        </h1>
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "#ff6f3c",
            marginBottom: "20px",
          }}
        >
          Trở thành đối tác của chúng tôi
        </h2>
        <p style={{ fontSize: "18px", color: "#555", lineHeight: "1.6" }}>
          Bạn là chủ cửa hàng cung cấp dịch vụ và muốn gia nhập vào hệ thống của chúng tôi? Hãy đăng ký ngay để
          tiếp cận khách hàng tiềm năng qua nền tảng của chúng tôi.
        </p>
        <p style={{ fontSize: "18px", color: "#555", lineHeight: "1.6" }}>
          Cung cấp các dịch vụ của bạn và nhận được nhiều cơ hội hợp tác và phát triển hơn nữa!
        </p>
      </div>

      {/* Form bên phải */}
      <div
        style={{
          flex: 1,
          maxWidth: "450px", // Thu nhỏ chiều rộng của form
          padding: "30px",
          borderRadius: "8px",
          backgroundColor: "#fff",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#ff6f3c",
            marginBottom: "20px",
          }}
        >
          Đăng ký làm đối tác
        </h2>

        <Form layout="vertical">
          <Form.Item
            label="Họ tên"
            required
            validateStatus={errors.fullName ? "error" : "success"}
            help={errors.fullName}
          >
            <Input
              name="fullName"
              value={formData.fullName}
              style={{ height: "40px" }}
              onChange={handleInputChange}
              placeholder="Nhập họ tên"
            />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            required
            validateStatus={errors.phone ? "error" : "success"}
            help={errors.phone}
          >
            <Input
              style={{ height: "40px" }}
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Nhập số điện thoại"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            required
            validateStatus={errors.email ? "error" : "success"}
            help={errors.email}
          >
            <Input
              name="email"
              style={{ height: "40px" }}
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Nhập email"
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu tài khoản"
            required
          >
            <Input.Password
              style={{ height: "40px" }}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Nhập mật khẩu"
            />
          </Form.Item>

          <Form.Item
            label="Upload Giấy phép kinh doanh"
            required
            validateStatus={errors.businessLicense ? "error" : "success"}
            help={errors.businessLicense}
          >
            <Input
              ref={fileInputRef}
              style={{ height: "40px" }}
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              placeholder="Tải lên giấy phép kinh doanh"
            />

          </Form.Item>

          <Button
            type="primary"
            style={{
              width: "100%",
              height: "45px",
              backgroundColor: "#ff6f3c",
              borderColor: "#ff6f3c",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "6px",
            }}
            onClick={handleRegister}
            loading={loading} // Show loading spinner when submitting
          >
            Đăng ký nhận việc
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Employee;
