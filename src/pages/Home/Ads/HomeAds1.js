import React from "react";
import { Link } from "react-router-dom";

const HomeAds1 = ({ banners }) => {

  return (
    <section id="ads-1">
      <div className="container">
        <div className="row">
          {banners[0]?.images.map((item) => (
            <div key={item.id} className="col-lg-4">
              <div className="ads-img">
                <Link to="/list-service">
                  <img
                    src={item}
                    alt="ads-img"
                    style={{
                      width: "416px",
                      height: "224px",
                      objectFit: "cover",
                    }}
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeAds1;
