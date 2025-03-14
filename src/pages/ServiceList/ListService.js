import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "../../services/serviceService";
import { getAllCategories } from "../../services/categoryService";
import { getAllStores } from "../../services/storeService"; // Import getAllStores
import { Pagination, List, Button, Card, message, Input, Select, Col, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { formatCurrency } from "../../utils/formatCurrency";
import { useNavigate } from "react-router-dom";
import { AddToWishlist } from "../../redux/actions/wishlistActions";
import { DeleteOutlined } from '@ant-design/icons';
import { getProvinces, getDistricts, getWards } from "../../services/addressService";


const { Meta } = Card;

function ListService() {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalServices, setTotalServices] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const [search, setSearch] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [stores, setStores] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedProvinceCode, setSelectedProvinceCode] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedStores, setSelectedStores] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlist = useSelector((state) => state.wishlist.wishlist);

  // Fetch initial data: categories, provinces, stores
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategories();
      setCategories(data.categories || []);
    };

    const fetchProvinces = async () => {
      const data = await getProvinces();
      setProvinces(data || []);
    };

    const fetchStores = async () => {
      const data = await getAllStores();
      setStores(data.stores || []);
    };

    fetchCategories();
    fetchProvinces();
    fetchStores();
  }, []);

  // Fetch services and apply filters
  useEffect(() => {
    fetchServices();
  }, [
    selectedCategory,
    search,
    selectedProvince,
    selectedDistrict,
    selectedWard,
    selectedStores,
  ]);

  const fetchServices = async () => {
    setLoading(true);
    const storeId = selectedStores;
    // Tạo chuỗi địa chỉ tìm kiếm theo tỉnh, quận, phường
    const storeAddressSearch = [selectedWard, selectedDistrict, selectedProvince]
      .filter(Boolean)
      .join(', ');

    const data = await getAllServices(
      1, // Page 1
      1000, // Không phân trang ở backend, lấy toàn bộ
      search,
      selectedCategory,
      storeAddressSearch, // Truyền vào chuỗi địa chỉ tìm kiếm
      storeId
    );

    const allServices = data.services || [];
    setTotalServices(allServices.length);  // Set total services count

    // Filter services based on the selected filters
    let filteredData = [...allServices];

    // Filter by search
    if (search) {
      filteredData = filteredData.filter((service) =>
        service.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filteredData = filteredData.filter(
        (service) => service.categoryId === selectedCategory
      );
    }

    // Filter by store selection
    if (selectedStores?.length > 0) {
      filteredData = filteredData.filter((service) =>
        service.storeIds.some(store => selectedStores.includes(store._id))
      );
    }

    // Filter by store address (province, district, and ward)
    if (storeAddressSearch) {
      filteredData = filteredData.filter(service => {
        return service.storeIds.some(store => {
          return store.storeAddress.toLowerCase().includes(storeAddressSearch.toLowerCase());
        });
      });
    }

    setFilteredServices(filteredData);
    setTotalServices(filteredData.length);
    setLoading(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleProvinceChange = async (provinceName) => {
    const selectedProvince = provinces.find((province) => province.name === provinceName);
    setSelectedProvince(provinceName); // Cập nhật tỉnh
    setSelectedProvinceCode(selectedProvince.code); // Lưu mã tỉnh để lọc
    setDistricts([]); // Reset các quận/huyện khi tỉnh thay đổi
    setWards([]); // Reset các phường/xã khi tỉnh thay đổi
    const districts = await getDistricts(selectedProvince.code); // Fetch các quận/huyện cho tỉnh
    setDistricts(districts || []);
  };

  const handleDistrictChange = async (districtCode) => {
    const selectedDistrict = districts.find(district => district.code === districtCode);
    setSelectedDistrict(selectedDistrict ? selectedDistrict.name : ''); // Cập nhật quận/huyện
    setWards([]); // Reset phường/xã khi quận thay đổi
    const wards = await getWards(districtCode); // Fetch các phường/xã cho quận
    setWards(wards || []);
  };

  const handleWardChange = (wardCode) => {
    const selectedWard = wards.find(ward => ward.code === wardCode);
    setSelectedWard(selectedWard ? selectedWard.name : ''); // Cập nhật phường/xã
  };

  const handleAddToWishlist = (service) => {
    if (!wishlist.find((item) => item._id === service._id)) {
      dispatch(AddToWishlist(service));
      message.success("Đã thêm vào danh sách yêu thích!");
    } else {
      message.info("Dịch vụ đã có trong danh sách yêu thích.");
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleStoreChange = (storeIds) => {
    setSelectedStores(storeIds);
  };

  const clearFilters = () => {
    setSelectedProvince("");
    setSelectedDistrict("");
    setSelectedWard("");
    setSearch("");
    setSelectedStores([]);
  };

  // Pagination logic
  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="container" style={{ marginTop: "20px", marginBottom: "20px" }}>
      <div className="main-form" style={{ display: "flex", gap: "20px", padding: "0 40px" }}>
        {/* Sidebar with Filters */}
        <div className="sidebar" style={{ width: "20%" }}>
          <h3 style={{ fontWeight: "bold", fontSize: "18px", color: "#FF6F3C" }}>Các loại dịch vụ</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li
              style={{ padding: "10px 0", cursor: "pointer", fontWeight: selectedCategory ? "normal" : "bold" }}
              onClick={() => handleCategorySelect("")}
            >
              Tất cả dịch vụ
            </li>
            {categories.map((category) => (
              <li
                key={category._id}
                style={{ padding: "10px 0", cursor: "pointer", display: "flex", alignItems: "center" }}
                onClick={() => handleCategorySelect(category._id)}
              >
                <img
                  src={category.images}
                  alt={category.categoryName}
                  style={{ width: "30px", height: "30px", borderRadius: "5px", marginRight: "10px" }}
                />
                <span style={{ fontWeight: selectedCategory === category._id ? "bold" : "normal" }}>
                  {category.categoryName}
                </span>
              </li>
            ))}
          </ul>

          {/* Filter by Location */}
          <div style={{ marginTop: "20px" }}>
            <h3 style={{ fontWeight: "bold", fontSize: "18px", color: "#FF6F3C", marginBottom: "15px" }}>
              Chọn địa điểm
            </h3>

            {/* Province Select */}
            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontSize: "14px", color: "#555", display: "block", marginBottom: "5px" }}>Chọn tỉnh</label>
              <Select
                placeholder="Chọn tỉnh"
                value={selectedProvince}
                onChange={handleProvinceChange}
                style={{ width: '100%', height: '40px' }}
              >
                {provinces.map((province) => (
                  <Select.Option key={province.name} value={province.name}>
                    {province.name}
                  </Select.Option>
                ))}
              </Select>
            </div>

            {/* District Select */}
            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontSize: "14px", color: "#555", display: "block", marginBottom: "5px" }}>Chọn quận/huyện</label>
              <Select
                placeholder="Chọn quận/huyện"
                value={selectedDistrict}
                onChange={handleDistrictChange}
                style={{ width: '100%', height: '40px' }}
                disabled={!selectedProvince}
              >
                {districts.map((district) => (
                  <Select.Option key={district.code} value={district.code}>
                    {district.name}
                  </Select.Option>
                ))}
              </Select>
            </div>

            {/* Ward Select */}
            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontSize: "14px", color: "#555", display: "block", marginBottom: "5px" }}>Chọn phường/xã</label>
              <Select
                placeholder="Chọn phường/xã"
                value={selectedWard}
                onChange={handleWardChange}
                style={{ width: '100%', height: '40px' }}
                disabled={!selectedDistrict}
              >
                {wards.map((ward) => (
                  <Select.Option key={ward.code} value={ward.code}>
                    {ward.name}
                  </Select.Option>
                ))}
              </Select>
            </div>

            {/* Clear Filters Button */}
            <Row>
              <Col span={24}>
                <Button
                  onClick={clearFilters}
                  style={{ width: '100%', height: '40px', marginTop: '10px' }}
                  icon={<DeleteOutlined />}
                >
                  Xóa bộ lọc
                </Button>
              </Col>
            </Row>
          </div>
        </div>

        {/* Service List */}
        <div className="service-list" style={{ width: "80%" }}>
          <h3 style={{ fontWeight: "bold", fontSize: "18px", color: "#FF6F3C" }}>Danh sách dịch vụ</h3>

          <Row gutter={24} style={{ marginBottom: '20px' }}>
            <Col span={12}>
              <Input
                placeholder="Tìm kiếm dịch vụ"
                allowClear
                value={search}
                onChange={handleSearchChange}
                style={{ width: '100%', height: '40px' }}
              />
            </Col>
            <Col span={12}>
              <Select
                placeholder="Chọn cửa hàng"
                value={selectedStores}
                allowClear
                onChange={handleStoreChange}
                style={{ width: '100%', height: '40px' }}
              >
                {stores.map((store) => (
                  <Select.Option key={store._id} value={store._id}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={store.storeImages[0]} // Assuming category.categoryImage contains the image URL
                        alt={store.storeName}
                        style={{
                          width: "30px", // Resize image to fit nicely
                          height: "30px",
                          borderRadius: "50%", // Optional: makes the image circular
                          marginRight: "10px",
                        }}
                      />
                      <span>{store.storeName}</span>
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={paginatedServices}
            renderItem={(service) => {
              const isInWishlist = wishlist.some((item) => item._id === service._id);
              return (
                <List.Item key={service._id}>
                  <Card
                    hoverable
                    cover={<img alt={service.title} src={service.serviceImages[0]} style={{ height: "180px", objectFit: "cover" }} />}
                    actions={[
                      <Button
                        type="primary"
                        onClick={() => navigate("/hourly", { state: { service } })}
                        style={{ backgroundColor: "#FF6F3C", borderColor: "#FF6F3C" }}
                      >
                        Chi tiết dịch vụ
                      </Button>,
                      <FontAwesomeIcon
                        icon={isInWishlist ? faSolidHeart : faRegularHeart}
                        onClick={() => handleAddToWishlist(service)}
                        style={{ cursor: "pointer", color: isInWishlist ? "#FF6F3C" : "gray", fontSize: "24px" }}
                      />,
                    ]}
                  >
                    <Meta
                      onClick={() => navigate("/hourly", { state: { service } })}
                      title={service.title}
                      description={
                        <>
                          <p>{service.shortDescription.slice(0, 60) + "..."}</p>
                          <p style={{ color: "#FF6F3C", fontWeight: "bold" }}>Giá dự tính: {formatCurrency(service.avgPrice)}</p>
                        </>
                      }
                    />
                  </Card>
                </List.Item>
              );
            }}
            loading={loading}
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
