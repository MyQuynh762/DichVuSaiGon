import React from "react";
import { BiRocket } from "react-icons/bi";
import { AiOutlineSync } from "react-icons/ai";
import { GoCreditCard } from "react-icons/go";
import { ImBubbles3, ImGift } from "react-icons/im";

const Advantages = () => {
  const AdvantagesData = [
    {
      id: 1,
      icon: <BiRocket />,
      title: "Dịch Vụ Nhanh Chóng",
      paragraph: "Tra cứu dịch vụ gần bạn dễ dàng, trong tích tắc",
    },
    {
      id: 2,
      icon: <AiOutlineSync />,
      title: "Đổi Lịch Linh Hoạt",
      paragraph: "Tùy chọn ngày giờ sử dụng dịch vụ theo ý bạn",
    },
    {
      id: 3,
      icon: <GoCreditCard />,
      title: "Thông Tin Minh Bạch",
      paragraph: "Mô tả dịch vụ rõ ràng, đánh giá thật từ người dùng",
    },
    {
      id: 4,
      icon: <ImBubbles3 />,
      title: "Hỗ Trợ Khách Hàng 24/7",
      paragraph: "Luôn sẵn sàng giúp bạn mọi lúc",
    },
    {
      id: 5,
      icon: <ImGift />,
      title: "Dịch Vụ Đa Dạng",
      paragraph: "Từ vệ sinh, sửa chữa đến làm đẹp – đủ hết cho Sài Gòn",
    },
  ];

  return (
    <section id="advantages">
      <div className="container">
        <div className="advantages-items-wrapper">
          <ul>
            {AdvantagesData.map((item) => (
              <li key={item.id}>
                <div className="advantages-item">
                  <div className="icon-wrapper">
                    <span>{item.icon}</span>
                  </div>
                  <div className="text-wrapper">
                    <h5>{item.title}</h5>
                    <p>{item.paragraph}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
