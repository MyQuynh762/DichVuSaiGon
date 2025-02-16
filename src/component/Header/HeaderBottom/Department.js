import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChevronRight } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { ShowSidebarCategories } from "../../../redux/actions/primaryActions";
import { getAllCategories } from "../../../services/categoryService";

const Department = () => {
  const dispatch = useDispatch();
  const categories = [
    { _id: 1, categoryName: "Ăn uống", images: "https://i.pinimg.com/736x/3b/28/f7/3b28f790c3932f5e9e0ba8d4d55f6722.jpg", link: "/list-service?category=an-uong" },
    { _id: 2, categoryName: "Làm đẹp", images: "https://i.pinimg.com/736x/9a/37/cc/9a37cc95aa4f26ef809e09467bd435ba.jpg", link: "/list-service?category=lam-dep" },
    { _id: 3, categoryName: "Sửa chữa", images: "https://i.pinimg.com/736x/ba/ba/fc/babafc9df4d4f81540a6dc7d99e3b3b7.jpg", link: "/list-service?category=sua-chua" },
    { _id: 4, categoryName: "Thời trang", images: "https://i.pinimg.com/736x/77/43/ac/7743acc9dd9a6e3a7f7e80b1b4972d7c.jpg", link: "/list-service?category=thoi-trang" },
    { _id: 5, categoryName: "Sức khỏe", images: "https://i.pinimg.com/736x/4b/a1/0d/4ba10dac34af987354c8a68785e9d5b0.jpg", link: "/list-service?category=suc-khoe" },
    { _id: 6, categoryName: "Giáo dục", images: "https://i.pinimg.com/736x/f4/9f/6c/f49f6c089c0f506a8630ea06cd98c563.jpg", link: "/list-service?category=giao-duc" },
  ];
  const [loading, setLoading] = useState(false);


  const handleCloseCategories = (e) => {
    dispatch(ShowSidebarCategories(false));
  };

  if (loading) {
    return <div>Đang tải danh mục...</div>;
  }

  return (
    <div className="department d-flex">
      <div className="icon">
        <span>
          <GiHamburgerMenu color="#ffffff" />
        </span>
      </div>

      <div className="text" style={{ color: "#ffffff" }}>
        <h6>Danh mục dịch vụ</h6>
      </div>
      <div className="title" style={{ color: "#ffffff" }}>
        <h6>Danh mục dịch vụ</h6>
        <button type="button" onClick={handleCloseCategories}>
          ✕
        </button>
      </div>
      {/* ===== Departments ===== */}
      <ul
        className="departments"
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#cccccc transparent",
        }}
      >
        {categories.map((item) =>
          item.submenu ? (
            <li key={item._id}>
              <Link
                to="/list-service"
                onClick={handleCloseCategories}
                className="d-flex justify-content-between"
              >
                <p className="m-0 p-0">
                  <span>
                    <img
                      src={item.images}
                      alt={item.categoryName}
                      style={{ width: "24px", height: "24px" }}
                    />
                  </span>{" "}
                  {item.categoryName}
                </p>
                <span className="right-arrow">
                  <VscChevronRight />
                </span>
              </Link>
            </li>
          ) : (
            <li key={item._id}>
              <Link to="/list-service" onClick={handleCloseCategories}>
                <span>
                  <img
                    src={item.images}
                    alt={item.categoryName}
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "5px",
                    }}
                  />
                </span>{" "}
                {item.categoryName}
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Department;
