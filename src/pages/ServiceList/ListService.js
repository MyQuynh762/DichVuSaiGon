import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "../../services/serviceService";
import { getAllCategories } from "../../services/categoryService";
import { Pagination, List, Button, Card, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { formatCurrency } from "../../utils/formatCurrency";
import { useNavigate } from "react-router-dom";
import { AddToWishlist } from "../../redux/actions/wishlistActions"; // Import action để thêm vào wishlist

const { Meta } = Card;

function ListService() {
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
  const [totalServices, setTotalServices] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = [
    { _id: 1, categoryName: "Ăn uống", images: "https://i.pinimg.com/736x/3b/28/f7/3b28f790c3932f5e9e0ba8d4d55f6722.jpg", link: "/list-service?category=an-uong" },
    { _id: 2, categoryName: "Làm đẹp", images: "https://i.pinimg.com/736x/9a/37/cc/9a37cc95aa4f26ef809e09467bd435ba.jpg", link: "/list-service?category=lam-dep" },
    { _id: 3, categoryName: "Sửa chữa", images: "https://i.pinimg.com/736x/ba/ba/fc/babafc9df4d4f81540a6dc7d99e3b3b7.jpg", link: "/list-service?category=sua-chua" },
    { _id: 4, categoryName: "Thời trang", images: "https://i.pinimg.com/736x/77/43/ac/7743acc9dd9a6e3a7f7e80b1b4972d7c.jpg", link: "/list-service?category=thoi-trang" },
    { _id: 5, categoryName: "Sức khỏe", images: "https://i.pinimg.com/736x/4b/a1/0d/4ba10dac34af987354c8a68785e9d5b0.jpg", link: "/list-service?category=suc-khoe" },
    { _id: 6, categoryName: "Giáo dục", images: "https://i.pinimg.com/736x/f4/9f/6c/f49f6c089c0f506a8630ea06cd98c563.jpg", link: "/list-service?category=giao-duc" },
  ];
  // Lấy danh sách wishlist từ Redux để kiểm tra xem sản phẩm đã có trong wishlist chưa
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async (categoryId = "", page = 1) => {
    setTotalServices(services.length || 0);
    setCurrentPage(1 || 1);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchServices(categoryId);
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    fetchServices(selectedCategory, page);
  };

  const handleAddToWishlist = (service) => {
    // Kiểm tra với `service._id` thay vì `service.id`
    if (!wishlist.find((item) => item._id === service._id)) {
      dispatch(AddToWishlist(service));
      message.success("Đã thêm vào danh sách yêu thích!");
    } else {
      message.info("Dịch vụ đã có trong danh sách yêu thích.");
    }
  };

  return (
    <div
      className="container"
      style={{ marginTop: "20px", marginBottom: "20px" }}
    >
      <div
        className="main-form"
        style={{ display: "flex", gap: "20px", padding: "0 40px" }}
      >
        {/* SideBar */}
        <div className="sidebar" style={{ width: "20%" }}>
          <h3 style={{ fontWeight: "bold", fontSize: "18px", color: "#333" }}>
            Các loại dịch vụ
          </h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li
              style={{
                padding: "10px 0",
                cursor: "pointer",
                fontWeight: selectedCategory ? "normal" : "bold",
              }}
              onClick={() => handleCategorySelect("")}
            >
              Tất cả dịch vụ
            </li>
            {categories.map((category) => (
              <li
                key={category._id}
                style={{
                  padding: "10px 0",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => handleCategorySelect(category._id)}
              >
                <img
                  src={category.images}
                  alt={category.categoryName}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    marginRight: "10px",
                  }}
                />
                <span
                  style={{
                    fontWeight:
                      selectedCategory === category._id ? "bold" : "normal",
                  }}
                >
                  {category.categoryName}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Service List */}
        <div className="service-list" style={{ width: "80%" }}>
          <h3 style={{ fontWeight: "bold", fontSize: "18px", color: "#333" }}>
            Danh sách dịch vụ
          </h3>
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={services}
            renderItem={(service) => {
              // Kiểm tra dựa trên service._id để chỉ đổi màu cho từng mục
              const isInWishlist = wishlist.some(
                (item) => item._id === service._id
              );
              return (
                <List.Item key={service._id}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={service.serviceName}
                        src={service.images ? service.images[0] : ""}
                        style={{ height: "180px", objectFit: "cover" }}
                      />
                    }
                    actions={[
                      <Button
                        type="primary"
                        style={{
                          backgroundColor: "#FF6F3C",
                          borderColor: "#FF6F3C",
                        }}
                        onClick={() =>
                          navigate("/hourly", { state: { service } })
                        }
                      >
                        Chi tiết dịch vụ
                      </Button>,
                      <FontAwesomeIcon
                        icon={isInWishlist ? faSolidHeart : faRegularHeart}
                        onClick={() => handleAddToWishlist(service)}
                        style={{
                          cursor: "pointer",
                          color: isInWishlist ? "#FF6F3C" : "gray",
                          fontSize: "24px", // Tăng kích thước lên
                        }}
                      />,
                    ]}
                  >
                    <Meta
                      title={service.serviceName}
                      description={
                        <>
                          <p>{service.shortDescription}</p>
                          <p style={{ color: "#FF6F3C", fontWeight: "bold" }}>
                            Giá dự tính: {formatCurrency(service.basePrice)}
                          </p>
                        </>
                      }
                    />
                  </Card>
                </List.Item>
              );
            }}
          />

          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalServices}
            onChange={handlePageChange}
            style={{ textAlign: "center", marginTop: "20px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default ListService;
