import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import Banner from "./Banner/Banner";
import Advantages from "./Advantages/Advantages";
import HomeAds1 from "./Ads/HomeAds1";
import Categories from "./Categories/Categories";
import HomeAds2 from "./Ads/HomeAds2";
import { useNavigate } from "react-router-dom";
import SampleSlider from "./SampleSlider";
import Procedure from "./Procedure";
import "./index.css";
import ChatBox from "./Chat/ChatBox";
import { getAllBanners } from "../../services/bannerService";

const Home = () => {
  const [banners, setBanners] = useState({
    mainBanner: [],
    rightMainBanner: [],
    ads1: [],
    ads2: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getAllBanners(1, 100); // Fetch first page with 10 banners per page
        const mainBanner = data.filter(banner => banner.type === "main_banner");
        const rightMainBanner = data.filter(banner => banner.type === "right_main_banner");
        const ads1 = data.filter(banner => banner.type === "ads1");
        const ads2 = data.filter(banner => banner.type === "ads2");

        setBanners({
          mainBanner,
          rightMainBanner,
          ads1,
          ads2,
        });
        console.log(banners.mainBanner)
      } catch (error) {
        message.error("Lỗi khi tải banner.");
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const [showChatBox, setShowChatBox] = useState(false);
  const toggleChatBox = async () => {
    setShowChatBox(!showChatBox);
  };
  const closeChatBox = () => {
    setShowChatBox(false);
  };

  return (
    <div className="home-content">
      <div className="main">
        <Banner mainBanner={banners.mainBanner} rightMainBanner={banners.rightMainBanner} />
        <Advantages />
        <HomeAds1 banners={banners.ads1} />
        <Categories />
        <div className="container">
          <div className="top-categories-list">
            <div className="row">
              <div className="col-12">
                <div className="section-title">
                  <h4>Các dịch vụ nổi bật</h4>
                </div>
              </div>
            </div>
          </div>
          <SampleSlider />
        </div>
        <Button
          type="primary"
          shape="circle"
          icon={<MessageOutlined size={25} />}
          size="large"
          style={styles.chatButton}
          onClick={toggleChatBox}
        />
        {/* Hiển thị ChatBox khi người dùng nhấp vào icon */}
        {showChatBox && <ChatBox onClose={closeChatBox} />}
        <HomeAds2 banners={banners.ads2} />
        <Procedure />
        {/* startUse */}
        <div className="startList">
          <div className="startDes">
            <h3 className="startName">Trải nghiệm ngay hôm nay</h3>
            <h3 className="startDescription">
              Bạn đã sẵn sàng sử dụng dịch vụ của DVSG chưa? Bắt đầu ngay
              với việc đặt lịch đầu tiên của bạn
            </h3>
          </div>
          <a href="/service" className="startButton">
            Trải nghiệm dịch vụ
          </a>
        </div>
      </div>
    </div>
  );
};

const styles = {
  chatButton: {
    position: "fixed",
    bottom: "50px",
    right: "90px",
    zIndex: 1000,
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    color: "#ffffff",
    backgroundColor: "#FF6F3C",
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default Home;
