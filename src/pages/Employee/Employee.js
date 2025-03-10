import React, { useEffect, useState } from "react";
import { Select, Input, Button, message } from "antd";
import { getAllServices } from "../../services/serviceService";
import { registerStaff } from "../../services/authService";

const onSearch = (value) => {
  console.log("search:", value);
};

function Employee() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    age: "",
    serviceIds: [],
    address: "",
    agreeToContact: false,
    cvFile: null, // Lưu file CV tải lên
  });
  const [errors, setErrors] = useState({});
  // useEffect(() => {
  //   const fetchServices = async () => {
  //     const data = await getAllServices(1, 50);
  //     setServices(
  //       data.services.map((service) => ({
  //         value: service._id,
  //         label: service.serviceName,
  //       }))
  //     );
  //   };
  //   fetchServices();
  // }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (value, fieldName) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      agreeToContact: e.target.checked,
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
        cvFile: file,
      }));
    } else {
      message.error("Chỉ chấp nhận các file pdf, doc, docx, jpg, jpeg, png.");
    }
  };
  const validateForm = () => {
    let validationErrors = {};

    if (!formData.fullname.trim()) {
      validationErrors.fullname = "Vui lòng nhập họ tên.";
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
    if (!formData.age.trim()) {
      validationErrors.age = "Vui lòng nhập tuổi.";
    } else if (
      !/^\d+$/.test(formData.age) ||
      formData.age < 18 ||
      formData.age > 65
    ) {
      validationErrors.age = "Tuổi không hợp lệ (18-65).";
    }
    if (formData.serviceIds.length === 0) {
      validationErrors.serviceIds = "Vui lòng chọn ít nhất một dịch vụ.";
    }
    if (!formData.address.trim()) {
      validationErrors.address = "Vui lòng chọn thành phố.";
    }
    if (!formData.cvFile) {
      validationErrors.cvFile = "Vui lòng tải lên CV.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.fullname);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("age", formData.age);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("cv", formData.cvFile);
    formData.serviceIds.forEach((id) =>
      formDataToSend.append("serviceIds", id)
    );

    try {
      const response = await registerStaff(formDataToSend);

      if (response.success) {
        message.success("Đăng ký thành công. Vui lòng chờ duyệt.");
        setFormData({
          fullname: "",
          phone: "",
          email: "",
          age: "",
          serviceIds: [],
          address: "",
          agreeToContact: false,
          cvFile: null,
        });
      } else {
        message.error(response.message || "Đăng ký thất bại.");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Đăng ký thất bại.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: "50px 20px", // Margin bên ngoài
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
          Cơ hội thu nhập hấp dẫn.
        </h1>
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            color: "#ff6f3c",
            marginBottom: "20px",
          }}
        >
          Làm chủ thời gian của bạn.
        </h1>
        <p style={{ fontSize: "18px", color: "#555", lineHeight: "1.6" }}>
          Trở thành đối tác cung cấp dịch vụ và tận hưởng cơ hội kiếm thêm thu nhập
          với lịch làm việc linh hoạt, phù hợp với nhu cầu cá nhân của bạn.
        </p>
        <p
          style={{
            fontSize: "18px",
            color: "#555",
            lineHeight: "1.6",
            marginTop: "20px",
          }}
        >
          Chúng tôi luôn chào đón những cá nhân năng động, có tâm huyết và mong muốn
          mang lại trải nghiệm tốt nhất cho khách hàng.
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
          Đăng ký đối tác cung cấp dịch vụ
        </h2>
        <label>Tên đối tác</label>
        <Input
          name="fullname"
          style={{ borderRadius: "4px", height: "40px" }}
          placeholder="Nhập tên"
          value={formData.fullname}
          onChange={handleInputChange}
        />
        {errors.fullname && (
          <p style={{ marginBottom: "15px", color: "red" }}>
            {errors.fullname}
          </p>
        )}
        <label>Số điện thoại</label>
        <Input
          name="phone"
          style={{ borderRadius: "4px", height: "40px" }}
          placeholder="Nhập số điện thoại"
          value={formData.phone}
          onChange={handleInputChange}
        />
        {errors.phone && (
          <p style={{ marginBottom: "15px", color: "red" }}>{errors.phone}</p>
        )}

        <label>Email</label>
        <Input
          name="email"
          style={{ borderRadius: "4px", height: "40px" }}
          placeholder="Nhập email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && (
          <p style={{ marginBottom: "15px", color: "red" }}>{errors.email}</p>
        )}

        <label>Tuổi</label>
        <Input
          name="age"
          type="number"
          style={{ borderRadius: "4px", height: "40px" }}
          placeholder="Nhập tuổi"
          value={formData.age}
          onChange={handleInputChange}
        />
        {errors.age && (
          <p style={{ marginBottom: "15px", color: "red" }}>{errors.age}</p>
        )}
        <label>Địa chỉ</label>
        <Input
          name="address"
          type="text"
          style={{ borderRadius: "4px", height: "40px" }}
          placeholder="Nhập địa chỉ"
          value={formData.address}
          onChange={handleInputChange}
        />
        {errors.address && (
          <p style={{ marginBottom: "15px", color: "red" }}>{errors.address}</p>
        )}
        <div style={{ margin: "15px 0" }}>
          <input
            type="checkbox"
            checked={formData.agreeToContact}
            onChange={handleCheckboxChange}
            style={{ marginRight: "10px" }}
          />
          <span style={{ fontSize: "14px", color: "#555" }}>
            Tôi đồng ý việc đại diện từ DVSG liên lạc với tôi thông qua số
            điện thoại mà tôi đăng ký.
          </span>
        </div>
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
        >
          Đăng ký
        </Button>
      </div>
    </div>
  );
}

export default Employee;
