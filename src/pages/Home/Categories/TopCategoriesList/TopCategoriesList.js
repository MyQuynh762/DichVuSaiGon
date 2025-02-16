import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

const categories = [
  { id: 1, title: "Ăn uống", img: "https://i.pinimg.com/736x/3b/28/f7/3b28f790c3932f5e9e0ba8d4d55f6722.jpg", link: "/list-service?category=an-uong" },
  { id: 2, title: "Làm đẹp", img: "https://i.pinimg.com/736x/9a/37/cc/9a37cc95aa4f26ef809e09467bd435ba.jpg", link: "/list-service?category=lam-dep" },
  { id: 3, title: "Sửa chữa", img: "https://i.pinimg.com/736x/ba/ba/fc/babafc9df4d4f81540a6dc7d99e3b3b7.jpg", link: "/list-service?category=sua-chua" },
  { id: 4, title: "Thời trang", img: "https://i.pinimg.com/736x/77/43/ac/7743acc9dd9a6e3a7f7e80b1b4972d7c.jpg", link: "/list-service?category=thoi-trang" },
  { id: 5, title: "Sức khỏe", img: "https://i.pinimg.com/736x/4b/a1/0d/4ba10dac34af987354c8a68785e9d5b0.jpg", link: "/list-service?category=suc-khoe" },
  { id: 6, title: "Giáo dục", img: "https://i.pinimg.com/736x/f4/9f/6c/f49f6c089c0f506a8630ea06cd98c563.jpg", link: "/list-service?category=giao-duc" },
];

const TopCategoriesList = () => {
  return (
    <div className="top-categories-list">
      <div className="row">
        <div className="col-12">
          <div className="section-title">
            <h4>Danh Mục Nổi Bật Trong Tháng</h4>
          </div>
        </div>
      </div>
      <div className="categories-wrapper">
        <Row>
          {categories.map((item) => (
            <Col key={item.id} lg={2} md={4} sm={6} xs={12} className="mb-3">
              <Link to={item.link}>
                <div className="category-item text-center">
                  <div className="category-img">
                    <img
                      src={item.img}
                      alt={item.title}
                      style={{ width: "100%", height: "168px", objectFit: "cover", borderRadius: "8px" }}
                    />
                  </div>
                  <div className="category-title mt-2">
                    <h6>{item.title}</h6>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default TopCategoriesList;
