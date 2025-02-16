import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  faFacebookF,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import {
  faEnvelope,
  faGlobe,
  faHeadphones,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import appstore from "../../image/appstore.png";
import googlePlay from "../../image/google_play.png";
import "./index.css";
import { getAllCategories } from "../../services/categoryService";

const Footer = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categories = [
    { _id: 1, categoryName: "Ăn uống", images: "https://i.pinimg.com/736x/3b/28/f7/3b28f790c3932f5e9e0ba8d4d55f6722.jpg", link: "/list-service?category=an-uong" },
    { _id: 2, categoryName: "Làm đẹp", images: "https://i.pinimg.com/736x/9a/37/cc/9a37cc95aa4f26ef809e09467bd435ba.jpg", link: "/list-service?category=lam-dep" },
    { _id: 3, categoryName: "Sửa chữa", images: "https://i.pinimg.com/736x/ba/ba/fc/babafc9df4d4f81540a6dc7d99e3b3b7.jpg", link: "/list-service?category=sua-chua" },
    { _id: 4, categoryName: "Thời trang", images: "https://i.pinimg.com/736x/77/43/ac/7743acc9dd9a6e3a7f7e80b1b4972d7c.jpg", link: "/list-service?category=thoi-trang" },
    { _id: 5, categoryName: "Sức khỏe", images: "https://i.pinimg.com/736x/4b/a1/0d/4ba10dac34af987354c8a68785e9d5b0.jpg", link: "/list-service?category=suc-khoe" },
    { _id: 6, categoryName: "Giáo dục", images: "https://i.pinimg.com/736x/f4/9f/6c/f49f6c089c0f506a8630ea06cd98c563.jpg", link: "/list-service?category=giao-duc" },
  ];

  return (
    <footer id="footer">
      <div className="footerContent">
        <div className="footerLogo">
          <h3 className="footerLogoName">DVSG</h3>
          <div className="footerLogoApp">
            <img src={appstore} alt="Download on App Store" />
            <img src={googlePlay} alt="Get it on Google Play" />
          </div>
          <ul className="footerLogoList">
            <li className="footerLogoItem">
              <div className="footerLogoItemBlock">
                <ul className="footerLogoItemContact">
                  <li className="footerLogoItemContactDetail">
                    <FontAwesomeIcon icon={faGlobe} className="icon-item" />
                    <h4 className="footerLogoItemContactDetailText">
                      Việt Nam
                    </h4>
                  </li>
                  <li className="footerLogoItemContactDetail">
                    <FontAwesomeIcon icon={faEnvelope} className="icon-item" />
                    <h4 className="footerLogoItemContactDetailText">Liên hệ</h4>
                  </li>
                </ul>
              </div>
            </li>

            <li className="footerLogoItem">
              <div className="footerLogoItemBlock">
                <ul className="footerLogoItemContact">
                  <li className="footerLogoItemContactDetail">
                    <FontAwesomeIcon
                      icon={faHeadphones}
                      className="icon-item"
                    />
                    <h4 className="footerLogoItemContactDetailText">Hỗ trợ</h4>
                  </li>
                  <li className="footerLogoItemContactDetail">
                    <FontAwesomeIcon icon={faComment} className="icon-item" />
                    <h4 className="footerLogoItemContactDetailText">
                      Khiếu nại
                    </h4>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <div className="footerContainer">
          <h3 className="footerContainerName">Công ty</h3>
          <ul className="footerAboutlist">
            <li className="footerAboutItem">Giới thiệu</li>
            <li className="footerAboutItem">Tuyển dụng</li>
            <li className="footerAboutItem">Chi nhánh</li>
            <li className="footerAboutItem">Điều khoản sử dụng</li>
            <li className="footerAboutItem">Chính sách bảo mật</li>
          </ul>
        </div>

        <div className="footerContainer">
          <h3 className="footerContainerName">Các loại dịch vụ</h3>
          <ul className="footerAboutlist">
            {loading ? (
              <li className="footerAboutItem">Đang tải...</li>
            ) : (
              categories.map((category) => (
                <li
                  key={category._id}
                  className="footerAboutItem"
                  onClick={() =>
                    navigate(`/list-service?categoryId=${category._id}`)
                  }
                >
                  {category.categoryName}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      <div className="socialsCopyright">
        <p className="copyright">DVSG TOGETHER.</p>
        <p className="copyright">FOLLOW US</p>
        <div className="socials-list">
          <FontAwesomeIcon icon={faFacebookF} className="icon-item" />
          <FontAwesomeIcon icon={faInstagram} className="icon-item" />
          <FontAwesomeIcon icon={faTiktok} className="icon-item" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
