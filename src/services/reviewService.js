import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const getToken = () => localStorage.getItem("accessToken");

// Cấu hình header với Authorization
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// API để lấy tất cả đánh giá với phân trang và bộ lọc
export const getAllReviews = async (page = 1, limit = 10, filters = {}) => {
  try {
    const { customerId, userId, serviceId, comment } = filters;
    const params = { page, limit, customerId, userId, serviceId, comment };

    const response = await axios.get(`${API_URL}/review`, {
      params,
      ...authHeader(),
    });
    return response.data.payload;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đánh giá:", error);
    throw error;
  }
};

// API để tạo mới đánh giá với hình ảnh
export const createReview = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/review`, formData, {
      ...authHeader(),
      headers: {
        ...authHeader().headers,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo đánh giá:", error);
    throw error;
  }
};

// API để lấy danh sách đánh giá theo serviceId với phân trang
export const getReviewsByServiceId = async (
  serviceId,
  page = 1,
  limit = 10
) => {
  try {
    const params = { page, limit };
    const response = await axios.get(
      `${API_URL}/review/service/${serviceId}`,
      {
        params,
        ...authHeader(),
      }
    );
    return response.data.payload;
  } catch (error) {
    console.error("Lỗi khi lấy đánh giá theo serviceId:", error);
    throw error;
  }
};

// API để lấy danh sách đánh giá theo adminId (các dịch vụ của admin quản lý)
export const getReviewsByAdminId = async (
  adminId,
  page = 1,
  limit = 10
) => {
  try {
    const params = { page, limit };
    const response = await axios.get(
      `${API_URL}/review/admin/${adminId}`,
      {
        params,
        ...authHeader(),
      }
    );
    return response.data.payload;
  } catch (error) {
    console.error("Lỗi khi lấy đánh giá của admin:", error);
    throw error;
  }
};
