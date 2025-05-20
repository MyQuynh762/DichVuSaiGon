import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, message, Steps, DatePicker, Select, Checkbox, Card } from "antd";
import { getAllServices } from "../../services/serviceService";
import { createBooking } from "../../services/bookingService"; // Import API createBooking
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
const { Option } = Select;
const App = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user.userInfo);
  const serviceId = location.state?.serviceId;
  const [current, setCurrent] = useState(0);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(serviceId);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [storeOptions, setStoreOptions] = useState([]); // Stores related to the selected service
  const [isChecked, setIsChecked] = useState(false); // Checkbox state
  const navigate = useNavigate();

  // Fetch services data
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getAllServices(1, 100);
        const availableServices = data.services.filter(service => service.availableForBooking);
        setServices(availableServices || []);
        if (serviceId) {
          const selectedService = availableServices.find(service => service._id === serviceId);
          if (selectedService && selectedService.storeIds) {
            setStoreOptions(selectedService.storeIds); // Set storeIds based on the selected service
            setSelectedService(selectedService._id);
          }
        }
      } catch (error) {
        console.error("Lỗi khi lấy dịch vụ:", error);
        message.error("Không thể tải danh sách dịch vụ.");
      }
    };
    fetchServices();
  }, [serviceId]);

  // Handle service change and update store options based on the selected service
  const handleServiceChange = (serviceId) => {
    setSelectedService(serviceId);
    const selectedService = services.find(service => service._id === serviceId);
    if (selectedService && selectedService.storeIds) {
      setStoreOptions(selectedService.storeIds); // Set store options based on the selected service
    }
  };

  const handleStoreChange = (storeId) => {
    setSelectedStore(storeId);
  };

  const handleBookingSubmit = async () => {
    if (!selectedService || !selectedStore || !selectedDateTime) {
      message.warning("Vui lòng điền đầy đủ thông tin đặt lịch.");
      return;
    }
    if (!isChecked) {
      message.warning("Vui lòng xác nhận thông tin cá nhân.");
      return;
    }

    try {
      setIsLoading(true);
      const bookingData = {
        userId: user._id,
        serviceId: selectedService,
        storeId: selectedStore,
        bookingDate: selectedDateTime,
      };

      const response = await createBooking(bookingData); // Call the createBooking API

      if (response) {
        console.log(response.payload)
        message.success("Đặt lịch thành công!");
        setIsLoading(false);

        // Navigate to the BookingSuccess page with bookingId
        navigate(`/booking-success/${response.payload._id}`);
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      message.error("Có lỗi xảy ra khi đặt lịch. Vui lòng thử lại.");
      setIsLoading(false);
    }
  };

  const next = () => {
    if (current === 0 && !selectedService) {
      message.warning("Vui lòng chọn dịch vụ trước khi tiếp tục.");
      return;
    }
    if (current === 1 && (!selectedStore || !selectedDateTime)) {
      message.warning("Vui lòng chọn cửa hàng và thời gian.");
      return;
    }
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const disabledDate = (currentDate) => {
    const today = dayjs().startOf("day");
    const maxDate = dayjs().add(10, "day").endOf("day");
    return currentDate && (currentDate < today || currentDate > maxDate);
  };

  const disabledTime = (date) => {
    const hours = Array.from(Array(24).keys());
    return {
      disabledHours: () => hours.filter((hour) => hour < 8 || hour >= 21),
    };
  };

  const steps = [
    {
      title: "Dịch vụ",
      content: (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h3 style={{ color: "#FF6F3C", fontSize: "24px" }}>
            Tất cả các dịch vụ tiện ích của DVSG
          </h3>
          <Select
            showSearch
            placeholder="Chọn dịch vụ"
            optionFilterProp="label"
            style={{
              width: "100%",
              maxWidth: "500px",
              margin: "20px auto",
              display: "block",
              borderRadius: "5px",
              height: "80px",
              border: "1px solid #FF6F3C",
              fontSize: "16px",
            }}
            onChange={handleServiceChange}
            value={selectedService || undefined}
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
          >
            {services.map((service) => (
              <Option
                key={service._id}
                value={service._id}
                label={service.title}
              >
                {/* Custom rendering */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={service.serviceImages[0] || "/default-service.png"}
                    alt={service.title}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      marginRight: "10px",
                      borderRadius: "4px",
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: "bold" }}>{service.title}</div>
                    <div style={{ fontSize: "12px", color: "#888" }}>
                      {`Chi phí dự tính: ${formatCurrency(service.avgPrice)}`}
                    </div>
                  </div>
                </div>
              </Option>
            ))}
          </Select>
        </div>
      ),
    },
    {
      title: "Chọn cửa hàng và thời gian",
      content: (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h3 style={{ color: "#FF6F3C", fontSize: "24px", fontWeight: "bold" }}>
            Chọn cửa hàng và thời gian
          </h3>

          <Select
            showSearch
            placeholder="Chọn cửa hàng"
            style={{
              width: "100%",
              maxWidth: "600px",
              margin: "20px auto",
              display: "block",
              borderRadius: "5px",
              height: "80px",
              border: "1px solid #FF6F3C",
              fontSize: "16px",
            }}
            onChange={handleStoreChange}
            value={selectedStore || undefined}
            options={storeOptions.map((store) => ({
              value: store._id,
              label: (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={store.storeImages[0] || "/default-store.png"}
                    alt={store.storeName}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%", // Circular image
                      marginRight: "10px",
                    }}
                  />
                  <div>
                    <span>{store.storeName}</span>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#888",
                        marginTop: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      {store.storeAddress}
                    </div>
                  </div>
                </div>
              ),
            }))}

          />

          {/* Date picker */}
          <DatePicker
            showTime
            onChange={(dateTime) => setSelectedDateTime(dateTime)}
            style={{
              borderRadius: "5px",
              border: "1px solid #FF6F3C",
              height: "40px",
              fontSize: "16px",
              width: "100%",
              maxWidth: "600px",
              marginTop: "15px", // Space between the date picker and button
            }}
            format="YYYY-MM-DD HH:mm"
            placeholder="Chọn ngày và giờ"
            disabledDate={disabledDate}
            disabledTime={disabledTime}
          />

          {/* Checkbox and Text */}
          <div style={{ marginTop: "20px" }}>
            <Checkbox
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            >
              Lưu ý: Thông tin cá nhân của bạn sẽ là thông tin sử dụng để đặt lịch.{" "}
              <a
                href="/profile"
                style={{
                  color: "#FF6F3C",
                  textDecoration: "underline",
                }}
              >
                Thay đổi thông tin tại đây
              </a>
            </Checkbox>
          </div>

          {/* User Personal Information */}
          <Card
            style={{
              marginTop: "20px",
              textAlign: "center",
              fontSize: "16px",
              color: "#555",
              width: "80%",
              maxWidth: "300px", // Limit the max width of the card
              marginLeft: "auto", // Center the card horizontally
              marginRight: "auto",
            }}
            title="Thông tin đặt lịch"
            bordered={false}
          >
            <p><strong>Họ tên:</strong> {user.fullName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Số điện thoại:</strong> {user.phone}</p>
          </Card>
        </div>
      ),
    }
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <Steps current={current} items={items} />
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f9f9f9",
          marginTop: "16px",
          borderRadius: "8px",
        }}
      >
        {steps[current].content}
      </div>
      <div style={{ marginTop: 24, textAlign: "center" }}>
        {current < steps.length - 1 && (
          <Button
            type="primary"
            onClick={next}
            style={{
              backgroundColor: "#FF6F3C",
              borderRadius: "5px",
              fontSize: "16px",
              padding: "10px 20px",
            }}
          >
            Tiếp tục
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={handleBookingSubmit}
            style={{
              backgroundColor: "#FF6F3C",
              borderRadius: "5px",
              fontSize: "16px",
              padding: "10px 20px",
            }}
            loading={isLoading}
          >
            Hoàn tất
          </Button>
        )}
        {current > 0 && (
          <Button
            onClick={prev}
            style={{
              margin: "0 8px",
              borderRadius: "5px",
              fontSize: "16px",
              padding: "10px 20px",
            }}
          >
            Quay lại
          </Button>
        )}
      </div>
    </div>
  );
};

export default App;
