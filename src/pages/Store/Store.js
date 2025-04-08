import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStores } from "../../services/storeService";
import { Pagination, List, Button, Card, message, Input, Select, Col, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { AddToWishlist } from "../../redux/actions/wishlistActions";
import { getProvinces, getDistricts, getWards } from "../../services/addressService";
import { DeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;

function Store() {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalStores, setTotalStores] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  // Fetch initial data: provinces and stores
  useEffect(() => {
    const fetchProvinces = async () => {
      const data = await getProvinces();
      setProvinces(data || []);

      // Find and set the default province to Thành phố Hồ Chí Minh
      const hoChiMinhProvince = data.find(province => province.name === "Thành phố Hồ Chí Minh");
      if (hoChiMinhProvince) {
        setSelectedProvince(hoChiMinhProvince.name);  // Set default province
        const districts = await getDistricts(hoChiMinhProvince.code);  // Fetch districts for Thành phố Hồ Chí Minh
        setDistricts(districts || []);
      }
    };

    const fetchStores = async () => {
      setLoading(true);
      const data = await getAllStores(); // Fetch all stores initially
      setStores(data.stores || []);
      setFilteredStores(data.stores || []);
      setTotalStores(data.stores.length); // Set total stores count
      setLoading(false);
    };

    fetchProvinces();
    fetchStores(); // Automatically fetch stores on load
  }, []);

  // Fetch stores based on filters
  useEffect(() => {
    fetchFilteredStores();  // Trigger filtering whenever the selected province, district, or ward changes
  }, [search, selectedProvince, selectedDistrict, selectedWard]);

  const fetchFilteredStores = async () => {
    setLoading(true);
    const storeAddressSearch = [selectedWard, selectedDistrict, selectedProvince]
      .filter(Boolean)
      .join(', ');

    // Filter stores based on address and search filters
    const filteredData = stores.filter(store => {
      const matchesSearch = store.storeName.toLowerCase().includes(search.toLowerCase());
      const matchesAddress = store.storeAddress.toLowerCase().includes(storeAddressSearch.toLowerCase());
      return matchesSearch && matchesAddress;
    });

    setFilteredStores(filteredData);
    setTotalStores(filteredData.length); // Set total stores count
    setLoading(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleProvinceChange = async (provinceName) => {
    const selectedProvince = provinces.find((province) => province.name === provinceName);
    setSelectedProvince(provinceName); // Update selected province
    setDistricts([]); // Reset districts when province changes
    setWards([]); // Reset wards when province changes
    const districts = await getDistricts(selectedProvince.code); // Fetch districts for province
    setDistricts(districts || []);
  };

  const handleDistrictChange = async (districtCode) => {
    const selectedDistrict = districts.find(district => district.code === districtCode);
    setSelectedDistrict(selectedDistrict ? selectedDistrict.name : ''); // Update district
    setWards([]); // Reset wards when district changes
    const wards = await getWards(districtCode); // Fetch wards for district
    setWards(wards || []);
  };

  const handleWardChange = (wardCode) => {
    const selectedWard = wards.find(ward => ward.code === wardCode);
    setSelectedWard(selectedWard ? selectedWard.name : ''); // Update ward
  };

  const handleAddToWishlist = (store) => {
    if (!wishlist.find((item) => item._id === store._id)) {
      dispatch(AddToWishlist(store));
      message.success("Đã thêm vào danh sách yêu thích!");
    } else {
      message.info("Cửa hàng đã có trong danh sách yêu thích.");
    }
  };

  const clearFilters = () => {
    setSelectedDistrict("");
    setSelectedWard("");
    setSearch("");
  };

  // Pagination logic
  const paginatedStores = filteredStores.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleAddressClick = (store) => {
    // Open Google Maps URL in a new tab
    window.open(store.storeMaps, "_blank");
  };

  const handleStoreDetailClick = (store) => {
    // Navigate to the store detail page
    navigate("/store-detail", { state: { store } })
  };

  return (
    <div className="container" style={{ marginTop: "20px", marginBottom: "20px" }}>
      <div className="main-form" style={{ display: "flex", gap: "20px", padding: "0 40px" }}>
        {/* Sidebar with Filters */}
        <div className="sidebar" style={{ width: "20%" }}>
          <h3 style={{ fontWeight: "bold", fontSize: "18px", color: "#FF6F3C" }}>Chọn địa điểm</h3>

          {/* Province Select */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontSize: "14px", color: "#555", display: "block", marginBottom: "5px" }}>Chọn tỉnh</label>
            <Select
              placeholder="Chọn tỉnh"
              value={selectedProvince}
              onChange={handleProvinceChange}
              style={{ width: '100%', height: '40px' }}
              disabled
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
          <Button icon={<DeleteOutlined />} onClick={clearFilters} style={{ width: '100%', height: '40px', marginTop: '10px' }}>
            Xóa bộ lọc
          </Button>
        </div>

        {/* Store List */}
        <div className="store-list" style={{ width: "80%" }}>
          <h3 style={{ fontWeight: "bold", fontSize: "18px", color: "#FF6F3C" }}>Danh sách cửa hàng</h3>

          {/* Search Input */}
          <Row gutter={24} style={{ marginBottom: '20px' }}>
            <Col span={12}>
              <Input
                placeholder="Tìm kiếm cửa hàng"
                allowClear
                value={search}
                onChange={handleSearchChange}
                style={{ width: '100%', height: '40px' }}
              />
            </Col>
          </Row>

          {/* Store List */}
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={paginatedStores}
            loading={loading}
            renderItem={(store) => {
              const isInWishlist = wishlist.some((item) => item._id === store._id);
              return (
                <List.Item key={store._id}>
                  <Card
                    hoverable
                    cover={<img alt={store.storeName} src={store.storeImages[0]} style={{ height: "180px", objectFit: "cover" }} />}
                    actions={[
                      <Button
                        type="primary"
                        onClick={() => handleStoreDetailClick(store)}
                        style={{ backgroundColor: "#FF6F3C", borderColor: "#FF6F3C", width: "90%" }}
                      >
                        Chi tiết cửa hàng
                      </Button>,
                    ]}
                  >
                    <Meta
                      title={store.storeName}
                      description={
                        <>
                          <p style={{ fontWeight: "bold" }}>SĐT: {store.storePhone}</p>
                          <p style={{ fontWeight: "bold" }}>Email: {store.storeEmail}</p>
                          <p style={{ color: "#FF6F3C", fontSize: "13px", fontWeight: "bold", cursor: "pointer" }} onClick={() => handleAddressClick(store)}>
                            {store.storeAddress}
                          </p>
                        </>
                      }
                    />
                  </Card>
                </List.Item>
              );
            }}
          />

          {/* Pagination */}
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalStores}
            onChange={handlePageChange}
            style={{ textAlign: "center", marginTop: "20px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Store;
