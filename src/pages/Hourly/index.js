import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message, Pagination } from "antd";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faHandPointUp,
  faClock,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import Task from "./Task";
import { formatCurrency } from "../../utils/formatCurrency";
import { getFeedbackByServiceId } from "../../services/feedbackService";

function Hourly() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);
  const feedbackLimit = 5;
  const feedbacks = [
    {
      "_id": "6723e8e72f6ff8ddbd5cf503",
      "customerId": {
        "_id": "6723a0483a7c3bc4959e239e",
        "name": "Nguyễn Văn A",
        "email": "admin123@gmail.com",
        "password": "$2b$10$mOGNYKNqFyZAwEkzzuhcIuuR648IZdmAb8Q7jvdZ/ThJRzrH4lVUi",
        "phone": "0967626483",
        "address": "Hà Nội",
        "role": "admin",
        "active": true,
        "__v": 2,
        "age": 22,
        "discountPercentage": 0,
        "serviceIds": []
      },
      "userId": {
        "_id": "67226cf677455a11c708afcb",
        "name": "Trần Văn B",
        "email": "tranvanb@gmail.com",
        "phone": "0987654321",
        "address": "Hà Nội",
        "role": "staff",
        "serviceIds": [
          "67215b47af2f2eb702d14e83",
          "67215a85af2f2eb702d14e7f",
          "67215adaaf2f2eb702d14e81",
          "67215c4caf2f2eb702d14e8d",
          "67215bffaf2f2eb702d14e8b",
          "67215ccdaf2f2eb702d14e8f",
          "67215d5caf2f2eb702d14e91",
          "67215dd0af2f2eb702d14e97",
          "67215ee6d8e3ac2055e84438",
          "67215ebcd8e3ac2055e84436"
        ],
        "active": true,
        "age": 25,
        "__v": 1,
        "password": "$2b$10$mOGNYKNqFyZAwEkzzuhcIuuR648IZdmAb8Q7jvdZ/ThJRzrH4lVUi",
        "discountPercentage": 25
      },
      "serviceId": {
        "_id": "67215a85af2f2eb702d14e7f",
        "serviceName": "Dọn Dẹp Nhà Theo Giờ",
        "categoryId": "67214f6d8c4b963d83b42345",
        "shortDescription": "Dịch vụ giúp việc nhà theo giờ cung cấp sự hỗ trợ linh hoạt trong việc dọn dẹp, nấu nướng và chăm sóc nhà cửa, giúp tiết kiệm thời gian cho gia đình bận rộn.",
        "fullDescription": "<p>Dịch vụ dọn dẹp nhà theo giờ với nhân viên chuyên nghiệp, thời gian linh hoạt theo yêu cầu...</p><ul><li>Quét dọn và lau chùi tất cả các bề mặt.</li><li>Vệ sinh phòng bếp, nhà tắm, phòng ngủ và phòng khách.</li><li>Hút bụi và làm sạch thảm, rèm cửa, đồ nội thất.</li><li>Làm sạch các khu vực thường tiếp xúc như tay nắm cửa, công tắc đèn.</li></ul><p>Dịch vụ này phù hợp cho các gia đình bận rộn, không có thời gian để dọn dẹp hàng ngày và chỉ cần dọn dẹp trong vài giờ mỗi tuần.</p>",
        "basePrice": 300000,
        "images": [
          "https://firebasestorage.googleapis.com/v0/b/shop-a080e.appspot.com/o/images%2F8cc0dda0-c031-4202-b5dc-671d518f928c-clean_house.jpg?alt=media",
          "https://firebasestorage.googleapis.com/v0/b/shop-a080e.appspot.com/o/images%2Ff02c230b-f8f9-49d5-b64a-1e845b12e948-c55281eddd349436b08a7d94c44bb709.jpg?alt=media",
          "https://firebasestorage.googleapis.com/v0/b/shop-a080e.appspot.com/o/images%2F1d0cbc6a-2699-4925-9fa5-7567c3b3ca39-af57a1af9a56814b5c943fc863052a87.jpg?alt=media"
        ],
        "address": "Hà Nội, Đà Nẵng, Thành phố Hồ Chí Minh",
        "__v": 0,
        "tasks": [
          {
            "image": null,
            "title": "Quét dọn và lau sàn nhà",
            "taskList": [
              "Quét dọn rác và bụi.",
              "Hút bụi toàn bộ sàn nhà.",
              "Lau sàn bằng dung dịch vệ sinh."
            ],
            "_id": "672e45943d72686c7da8f043"
          },
          {
            "image": null,
            "title": "Lau chùi cửa sổ, cửa ra vào",
            "taskList": [
              "Lau sạch kính cửa sổ.",
              "Lau khung cửa và cửa ra vào.",
              "Loại bỏ vết bẩn và bụi bám."
            ],
            "_id": "672e45943d72686c7da8f044"
          },
          {
            "image": null,
            "title": "Dọn dẹp và làm sạch phòng khách",
            "taskList": [
              "Lau chùi và sắp xếp gọn gàng ghế, bàn, kệ.",
              "Hút bụi trên thảm và sàn phòng khách.",
              "Lau các bề mặt bàn, tủ, và kệ TV."
            ],
            "_id": "672e45943d72686c7da8f045"
          },
          {
            "image": null,
            "title": "Vệ sinh nhà bếp",
            "taskList": [
              "Lau chùi bề mặt bếp, tủ bếp.",
              "Rửa và lau sạch bồn rửa chén.",
              "Làm sạch lò vi sóng, tủ lạnh (bên ngoài)."
            ],
            "_id": "672e45943d72686c7da8f046"
          }
        ]
      },
      "bookingId": "6722f5de28d47e458c079a9b",
      "rating": 5,
      "comment": "Nhân việt nhiệt tình dọn dẹp sạch sẽ đúng giờ",
      "images": [
        "https://firebasestorage.googleapis.com/v0/b/shop-a080e.appspot.com/o/images%2F15dc63a8-d4c4-416f-9761-f615d400ab66-clean_house1.jpg?alt=media",
        "https://firebasestorage.googleapis.com/v0/b/shop-a080e.appspot.com/o/images%2Fe83fac58-4713-46e6-9df4-e9d68b2bb965-cleansofa.png?alt=media"
      ],
      "date": "2025-02-14T14:49:18.448Z",
      "__v": 0
    },
    {
      "_id": "67278d6e3c626fa164c3c70c",
      "customerId": {
        "_id": "6722eed20456055add9b925c",
        "name": "Nguyễn Văn A",
        "email": "nguyenkhanhvinh2002@gmail.com",
        "password": "$2b$10$JdykVqFLW1fc/CaOUNkYaObHqeadQSoE3JoWOu6bzmtRVxP7DziHy",
        "phone": "0987654123",
        "address": "Hà Nội",
        "role": "admin",
        "serviceIds": [],
        "active": true,
        "__v": 0,
        "age": 20,
        "discountPercentage": 0,
        "resetPasswordExpires": "2024-12-14T08:18:52.966Z",
        "resetPasswordToken": "$2b$10$QxXeDjXdXxWT1jLliX.MauqxuUKvxOQt.olQmKmmEMTYoXsVdGQiy"
      },
      "userId": {
        "_id": "67250b1b1158996d0e039005",
        "name": "Nguyễn Thị C",
        "email": "nguyenthic@gmail.com",
        "password": "$2b$10$SJ9fRmR5X6gir0JOknV6jOlz/i4A5RkwT18dbtZGyTszYmnGcsM/.",
        "phone": "0987654321",
        "address": "Hà Nội",
        "role": "staff",
        "serviceIds": [
          "67215a85af2f2eb702d14e7f",
          "67215adaaf2f2eb702d14e81",
          "67215b47af2f2eb702d14e83",
          "67215bffaf2f2eb702d14e8b",
          "67215c4caf2f2eb702d14e8d",
          "67215ccdaf2f2eb702d14e8f",
          "67215d5caf2f2eb702d14e91",
          "67215dd0af2f2eb702d14e97",
          "67215ebcd8e3ac2055e84436",
          "67215ee6d8e3ac2055e84438"
        ],
        "active": true,
        "age": 35,
        "__v": 0,
        "discountPercentage": 20
      },
      "serviceId": {
        "_id": "67215a85af2f2eb702d14e7f",
        "serviceName": "Dọn Dẹp Nhà Theo Giờ",
        "categoryId": "67214f6d8c4b963d83b42345",
        "shortDescription": "Dịch vụ giúp việc nhà theo giờ cung cấp sự hỗ trợ linh hoạt trong việc dọn dẹp, nấu nướng và chăm sóc nhà cửa, giúp tiết kiệm thời gian cho gia đình bận rộn.",
        "fullDescription": "<p>Dịch vụ dọn dẹp nhà theo giờ với nhân viên chuyên nghiệp, thời gian linh hoạt theo yêu cầu...</p><ul><li>Quét dọn và lau chùi tất cả các bề mặt.</li><li>Vệ sinh phòng bếp, nhà tắm, phòng ngủ và phòng khách.</li><li>Hút bụi và làm sạch thảm, rèm cửa, đồ nội thất.</li><li>Làm sạch các khu vực thường tiếp xúc như tay nắm cửa, công tắc đèn.</li></ul><p>Dịch vụ này phù hợp cho các gia đình bận rộn, không có thời gian để dọn dẹp hàng ngày và chỉ cần dọn dẹp trong vài giờ mỗi tuần.</p>",
        "basePrice": 300000,
        "images": [
          "https://firebasestorage.googleapis.com/v0/b/shop-a080e.appspot.com/o/images%2F8cc0dda0-c031-4202-b5dc-671d518f928c-clean_house.jpg?alt=media",
          "https://firebasestorage.googleapis.com/v0/b/shop-a080e.appspot.com/o/images%2Ff02c230b-f8f9-49d5-b64a-1e845b12e948-c55281eddd349436b08a7d94c44bb709.jpg?alt=media",
          "https://firebasestorage.googleapis.com/v0/b/shop-a080e.appspot.com/o/images%2F1d0cbc6a-2699-4925-9fa5-7567c3b3ca39-af57a1af9a56814b5c943fc863052a87.jpg?alt=media"
        ],
        "address": "Hà Nội, Đà Nẵng, Thành phố Hồ Chí Minh",
        "__v": 0,
        "tasks": [
          {
            "image": null,
            "title": "Quét dọn và lau sàn nhà",
            "taskList": [
              "Quét dọn rác và bụi.",
              "Hút bụi toàn bộ sàn nhà.",
              "Lau sàn bằng dung dịch vệ sinh."
            ],
            "_id": "672e45943d72686c7da8f043"
          },
          {
            "image": null,
            "title": "Lau chùi cửa sổ, cửa ra vào",
            "taskList": [
              "Lau sạch kính cửa sổ.",
              "Lau khung cửa và cửa ra vào.",
              "Loại bỏ vết bẩn và bụi bám."
            ],
            "_id": "672e45943d72686c7da8f044"
          },
          {
            "image": null,
            "title": "Dọn dẹp và làm sạch phòng khách",
            "taskList": [
              "Lau chùi và sắp xếp gọn gàng ghế, bàn, kệ.",
              "Hút bụi trên thảm và sàn phòng khách.",
              "Lau các bề mặt bàn, tủ, và kệ TV."
            ],
            "_id": "672e45943d72686c7da8f045"
          },
          {
            "image": null,
            "title": "Vệ sinh nhà bếp",
            "taskList": [
              "Lau chùi bề mặt bếp, tủ bếp.",
              "Rửa và lau sạch bồn rửa chén.",
              "Làm sạch lò vi sóng, tủ lạnh (bên ngoài)."
            ],
            "_id": "672e45943d72686c7da8f046"
          }
        ]
      },
      "bookingId": "67278cd53c626fa164c3c5d7",
      "rating": 5,
      "comment": "dịch vụ chuyên nghiệp",
      "images": [],
      "date": "2025-02-14T14:49:18.448Z",
      "__v": 0
    },
    {
      "_id": "673223a464e19a8a6e928e13",
      "customerId": {
        "_id": "6722eed20456055add9b925c",
        "name": "Nguyễn Văn A",
        "email": "nguyenkhanhvinh2002@gmail.com",
        "password": "$2b$10$JdykVqFLW1fc/CaOUNkYaObHqeadQSoE3JoWOu6bzmtRVxP7DziHy",
        "phone": "0987654123",
        "address": "Hà Nội",
        "role": "admin",
        "serviceIds": [],
        "active": true,
        "__v": 0,
        "age": 20,
        "discountPercentage": 0,
        "resetPasswordExpires": "2024-12-14T08:18:52.966Z",
        "resetPasswordToken": "$2b$10$QxXeDjXdXxWT1jLliX.MauqxuUKvxOQt.olQmKmmEMTYoXsVdGQiy"
      },
      "userId": {
        "_id": "67226cf677455a11c708afcb",
        "name": "Trần Văn B",
        "email": "tranvanb@gmail.com",
        "phone": "0987654321",
        "address": "Hà Nội",
        "role": "staff",
        "serviceIds": [
          "67215b47af2f2eb702d14e83",
          "67215a85af2f2eb702d14e7f",
          "67215adaaf2f2eb702d14e81",
          "67215c4caf2f2eb702d14e8d",
          "67215bffaf2f2eb702d14e8b",
          "67215ccdaf2f2eb702d14e8f",
          "67215d5caf2f2eb702d14e91",
          "67215dd0af2f2eb702d14e97",
          "67215ee6d8e3ac2055e84438",
          "67215ebcd8e3ac2055e84436"
        ],
        "active": true,
        "age": 25,
        "__v": 1,
        "password": "$2b$10$mOGNYKNqFyZAwEkzzuhcIuuR648IZdmAb8Q7jvdZ/ThJRzrH4lVUi",
        "discountPercentage": 25
      },
      "serviceId": {
        "_id": "67215a85af2f2eb702d14e7f",
        "serviceName": "Dọn Dẹp Nhà Theo Giờ",
        "categoryId": "67214f6d8c4b963d83b42345",
        "shortDescription": "Dịch vụ giúp việc nhà theo giờ cung cấp sự hỗ trợ linh hoạt trong việc dọn dẹp, nấu nướng và chăm sóc nhà cửa, giúp tiết kiệm thời gian cho gia đình bận rộn.",
        "fullDescription": "<p>Dịch vụ dọn dẹp nhà theo giờ với nhân viên chuyên nghiệp, thời gian linh hoạt theo yêu cầu...</p><ul><li>Quét dọn và lau chùi tất cả các bề mặt.</li><li>Vệ sinh phòng bếp, nhà tắm, phòng ngủ và phòng khách.</li><li>Hút bụi và làm sạch thảm, rèm cửa, đồ nội thất.</li><li>Làm sạch các khu vực thường tiếp xúc như tay nắm cửa, công tắc đèn.</li></ul><p>Dịch vụ này phù hợp cho các gia đình bận rộn, không có thời gian để dọn dẹp hàng ngày và chỉ cần dọn dẹp trong vài giờ mỗi tuần.</p>",
        "basePrice": 300000,
        "images": [
          "https://firebasestorage.googleapis.com/v0/b/shop-a080e.appspot.com/o/images%2F8cc0dda0-c031-4202-b5dc-671d518f928c-clean_house.jpg?alt=media",
          "https://firebasestorage.googleapis.com/v0/b/shop-a080e.appspot.com/o/images%2Ff02c230b-f8f9-49d5-b64a-1e845b12e948-c55281eddd349436b08a7d94c44bb709.jpg?alt=media",
          "https://firebasestorage.googleapis.com/v0/b/shop-a080e.appspot.com/o/images%2F1d0cbc6a-2699-4925-9fa5-7567c3b3ca39-af57a1af9a56814b5c943fc863052a87.jpg?alt=media"
        ],
        "address": "Hà Nội, Đà Nẵng, Thành phố Hồ Chí Minh",
        "__v": 0,
        "tasks": [
          {
            "image": null,
            "title": "Quét dọn và lau sàn nhà",
            "taskList": [
              "Quét dọn rác và bụi.",
              "Hút bụi toàn bộ sàn nhà.",
              "Lau sàn bằng dung dịch vệ sinh."
            ],
            "_id": "672e45943d72686c7da8f043"
          },
          {
            "image": null,
            "title": "Lau chùi cửa sổ, cửa ra vào",
            "taskList": [
              "Lau sạch kính cửa sổ.",
              "Lau khung cửa và cửa ra vào.",
              "Loại bỏ vết bẩn và bụi bám."
            ],
            "_id": "672e45943d72686c7da8f044"
          },
          {
            "image": null,
            "title": "Dọn dẹp và làm sạch phòng khách",
            "taskList": [
              "Lau chùi và sắp xếp gọn gàng ghế, bàn, kệ.",
              "Hút bụi trên thảm và sàn phòng khách.",
              "Lau các bề mặt bàn, tủ, và kệ TV."
            ],
            "_id": "672e45943d72686c7da8f045"
          },
          {
            "image": null,
            "title": "Vệ sinh nhà bếp",
            "taskList": [
              "Lau chùi bề mặt bếp, tủ bếp.",
              "Rửa và lau sạch bồn rửa chén.",
              "Làm sạch lò vi sóng, tủ lạnh (bên ngoài)."
            ],
            "_id": "672e45943d72686c7da8f046"
          }
        ]
      },
      "bookingId": "673222b564e19a8a6e928d8d",
      "rating": 5,
      "comment": "chuyên nghiệp, sạch sẽ, đáng tin",
      "images": [],
      "date": "2025-02-14T15:32:52.150Z",
      "__v": 0
    },
    {
      "_id": "6756765d84e703945fca7873",
      "customerId": {
        "_id": "6722eed20456055add9b925c",
        "name": "Nguyễn Văn A",
        "email": "nguyenkhanhvinh2002@gmail.com",
        "password": "$2b$10$JdykVqFLW1fc/CaOUNkYaObHqeadQSoE3JoWOu6bzmtRVxP7DziHy",
        "phone": "0987654123",
        "address": "Hà Nội",
        "role": "admin",
        "serviceIds": [],
        "active": true,
        "__v": 0,
        "age": 20,
        "discountPercentage": 0,
        "resetPasswordExpires": "2024-12-14T08:18:52.966Z",
        "resetPasswordToken": "$2b$10$QxXeDjXdXxWT1jLliX.MauqxuUKvxOQt.olQmKmmEMTYoXsVdGQiy"
      },
      "userId": {
        "_id": "67250b1b1158996d0e039005",
        "name": "Nguyễn Thị C",
        "email": "nguyenthic@gmail.com",
        "password": "$2b$10$SJ9fRmR5X6gir0JOknV6jOlz/i4A5RkwT18dbtZGyTszYmnGcsM/.",
        "phone": "0987654321",
        "address": "Hà Nội",
        "role": "staff",
        "serviceIds": [
          "67215a85af2f2eb702d14e7f",
          "67215adaaf2f2eb702d14e81",
          "67215b47af2f2eb702d14e83",
          "67215bffaf2f2eb702d14e8b",
          "67215c4caf2f2eb702d14e8d",
          "67215ccdaf2f2eb702d14e8f",
          "67215d5caf2f2eb702d14e91",
          "67215dd0af2f2eb702d14e97",
          "67215ebcd8e3ac2055e84436",
          "67215ee6d8e3ac2055e84438"
        ],
        "active": true,
        "age": 35,
        "__v": 0,
        "discountPercentage": 20
      },
      "serviceId": {
        "_id": "67215a85af2f2eb702d14e7f",
        "serviceName": "Dọn Dẹp Nhà Theo Giờ",
        "categoryId": "67214f6d8c4b963d83b42345",
        "shortDescription": "Dịch vụ giúp việc nhà theo giờ cung cấp sự hỗ trợ linh hoạt trong việc dọn dẹp, nấu nướng và chăm sóc nhà cửa, giúp tiết kiệm thời gian cho gia đình bận rộn.",
        "fullDescription": "<p>Dịch vụ dọn dẹp nhà theo giờ với nhân viên chuyên nghiệp, thời gian linh hoạt theo yêu cầu...</p><ul><li>Quét dọn và lau chùi tất cả các bề mặt.</li><li>Vệ sinh phòng bếp, nhà tắm, phòng ngủ và phòng khách.</li><li>Hút bụi và làm sạch thảm, rèm cửa, đồ nội thất.</li><li>Làm sạch các khu vực thường tiếp xúc như tay nắm cửa, công tắc đèn.</li></ul><p>Dịch vụ này phù hợp cho các gia đình bận rộn, không có thời gian để dọn dẹp hàng ngày và chỉ cần dọn dẹp trong vài giờ mỗi tuần.</p>",
        "basePrice": 300000,
        "images": [
          "https://firebasestorage.googleapis.com/v0/b/shop-a080e.appspot.com/o/images%2F8cc0dda0-c031-4202-b5dc-671d518f928c-clean_house.jpg?alt=media",
          "https://firebasestorage.googleapis.com/v0/b/shop-a080e.appspot.com/o/images%2Ff02c230b-f8f9-49d5-b64a-1e845b12e948-c55281eddd349436b08a7d94c44bb709.jpg?alt=media",
          "https://firebasestorage.googleapis.com/v0/b/shop-a080e.appspot.com/o/images%2F1d0cbc6a-2699-4925-9fa5-7567c3b3ca39-af57a1af9a56814b5c943fc863052a87.jpg?alt=media"
        ],
        "address": "Hà Nội, Đà Nẵng, Thành phố Hồ Chí Minh",
        "__v": 0,
        "tasks": [
          {
            "image": null,
            "title": "Quét dọn và lau sàn nhà",
            "taskList": [
              "Quét dọn rác và bụi.",
              "Hút bụi toàn bộ sàn nhà.",
              "Lau sàn bằng dung dịch vệ sinh."
            ],
            "_id": "672e45943d72686c7da8f043"
          },
          {
            "image": null,
            "title": "Lau chùi cửa sổ, cửa ra vào",
            "taskList": [
              "Lau sạch kính cửa sổ.",
              "Lau khung cửa và cửa ra vào.",
              "Loại bỏ vết bẩn và bụi bám."
            ],
            "_id": "672e45943d72686c7da8f044"
          },
          {
            "image": null,
            "title": "Dọn dẹp và làm sạch phòng khách",
            "taskList": [
              "Lau chùi và sắp xếp gọn gàng ghế, bàn, kệ.",
              "Hút bụi trên thảm và sàn phòng khách.",
              "Lau các bề mặt bàn, tủ, và kệ TV."
            ],
            "_id": "672e45943d72686c7da8f045"
          },
          {
            "image": null,
            "title": "Vệ sinh nhà bếp",
            "taskList": [
              "Lau chùi bề mặt bếp, tủ bếp.",
              "Rửa và lau sạch bồn rửa chén.",
              "Làm sạch lò vi sóng, tủ lạnh (bên ngoài)."
            ],
            "_id": "672e45943d72686c7da8f046"
          }
        ]
      },
      "bookingId": "675675f084e703945fca77f1",
      "rating": 5,
      "comment": "chuyen nghiep",
      "images": [],
      "date": "2025-02-14T04:47:25.483Z",
      "__v": 0
    }
  ]
  const service = {
    "_id": "67215a85af2f2eb702d14e7f",
    "serviceName": "Dọn Dẹp Nhà Theo Giờ",
    "categoryId": {
      "_id": "67214f6d8c4b963d83b42345",
      "categoryName": "Giúp việc",
      "description": "Giúp việc",
      "images": "https://firebasestorage.googleapis.com/v0/b/shop-a080e.appspot.com/o/images%2Fd5dcdccc-6250-4f2e-bdba-672894c77463-clean_house.jpg?alt=media"
    },
    "shortDescription": "Dịch vụ giúp việc nhà theo giờ cung cấp sự hỗ trợ linh hoạt trong việc dọn dẹp, nấu nướng và chăm sóc nhà cửa, giúp tiết kiệm thời gian cho gia đình bận rộn.",
    "fullDescription": "<p>Dịch vụ dọn dẹp nhà theo giờ với nhân viên chuyên nghiệp, thời gian linh hoạt theo yêu cầu...</p><ul><li>Quét dọn và lau chùi tất cả các bề mặt.</li><li>Vệ sinh phòng bếp, nhà tắm, phòng ngủ và phòng khách.</li><li>Hút bụi và làm sạch thảm, rèm cửa, đồ nội thất.</li><li>Làm sạch các khu vực thường tiếp xúc như tay nắm cửa, công tắc đèn.</li></ul><p>Dịch vụ này phù hợp cho các gia đình bận rộn, không có thời gian để dọn dẹp hàng ngày và chỉ cần dọn dẹp trong vài giờ mỗi tuần.</p>",
    "basePrice": 300000,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/shop-a080e.appspot.com/o/images%2F8cc0dda0-c031-4202-b5dc-671d518f928c-clean_house.jpg?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/shop-a080e.appspot.com/o/images%2Ff02c230b-f8f9-49d5-b64a-1e845b12e948-c55281eddd349436b08a7d94c44bb709.jpg?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/shop-a080e.appspot.com/o/images%2F1d0cbc6a-2699-4925-9fa5-7567c3b3ca39-af57a1af9a56814b5c943fc863052a87.jpg?alt=media"
    ],
    "address": "Hà Nội, Đà Nẵng, Thành phố Hồ Chí Minh",
    "__v": 0,
    "tasks": [
      {
        "image": null,
        "title": "Quét dọn và lau sàn nhà",
        "taskList": [
          "Quét dọn rác và bụi.",
          "Hút bụi toàn bộ sàn nhà.",
          "Lau sàn bằng dung dịch vệ sinh."
        ],
        "_id": "672e45943d72686c7da8f043"
      },
      {
        "image": null,
        "title": "Lau chùi cửa sổ, cửa ra vào",
        "taskList": [
          "Lau sạch kính cửa sổ.",
          "Lau khung cửa và cửa ra vào.",
          "Loại bỏ vết bẩn và bụi bám."
        ],
        "_id": "672e45943d72686c7da8f044"
      },
      {
        "image": null,
        "title": "Dọn dẹp và làm sạch phòng khách",
        "taskList": [
          "Lau chùi và sắp xếp gọn gàng ghế, bàn, kệ.",
          "Hút bụi trên thảm và sàn phòng khách.",
          "Lau các bề mặt bàn, tủ, và kệ TV."
        ],
        "_id": "672e45943d72686c7da8f045"
      },
      {
        "image": null,
        "title": "Vệ sinh nhà bếp",
        "taskList": [
          "Lau chùi bề mặt bếp, tủ bếp.",
          "Rửa và lau sạch bồn rửa chén.",
          "Làm sạch lò vi sóng, tủ lạnh (bên ngoài)."
        ],
        "_id": "672e45943d72686c7da8f046"
      }
    ]
  }

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  if (!service) {
    return <p>Không có thông tin dịch vụ.</p>;
  }

  const handleExperienceClick = (service) => {
    navigate("/service", { state: { serviceId: service._id } });
  };

  const formatPhoneNumber = (phone) => {
    return phone.slice(0, 3) + "*****" + phone.slice(-2);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
      {/* Giới thiệu dịch vụ */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <div style={{ flex: 1 }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#FF6F3C",
              marginBottom: "10px",
            }}
          >
            Dịch vụ
          </h2>
          <h3
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              color: "#333",
              marginBottom: "10px",
            }}
          >
            {service.serviceName}
          </h3>
          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.5",
              color: "#555",
              marginBottom: "20px",
            }}
          >
            {service.shortDescription}
          </p>
          <button
            onClick={() => handleExperienceClick(service)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#FF6F3C",
              color: "#fff",
              borderRadius: "5px",
              fontSize: "16px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Trải nghiệm dịch vụ
          </button>
        </div>
        <img
          src={service.images[0]}
          alt={service.serviceName}
          style={{
            width: "400px",
            height: "auto",
            borderRadius: "10px",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Chi tiết đầy đủ của dịch vụ */}
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          marginBottom: "40px",
        }}
      >
        <h3
          style={{ fontSize: "22px", color: "#FF6F3C", marginBottom: "15px" }}
        >
          Mô tả dịch vụ
        </h3>
        <div
          style={{ fontSize: "14px", color: "#555", lineHeight: "1.6" }}
          dangerouslySetInnerHTML={{ __html: service.fullDescription }}
        />
        <p style={{ fontSize: "16px", color: "#333", marginTop: "15px" }}>
          Giá bắt đầu từ:{" "}
          <strong style={{ color: "#FF6F3C" }}>
            {formatCurrency(service.basePrice)}
          </strong>
        </p>
        <p style={{ fontSize: "16px", color: "#333", marginTop: "5px" }}>
          Địa chỉ: <strong>{service.address}</strong>
        </p>
      </div>

      {/* Lý do chọn dịch vụ */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h3
          style={{
            fontSize: "24px",
            color: "#FF6F3C",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Lý do chọn {service.serviceName}:
        </h3>
        <img
          src={service.images[1] || service.images[0]}
          alt="Lý do đặt dịch vụ"
          style={{
            width: "100%",
            maxWidth: "800px",
            marginBottom: "30px",
            borderRadius: "10px",
          }}
        />
        {/* Các lý do chọn dịch vụ */}
      </div>

      {/* Phần hiển thị các Feedback */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          marginTop: "40px",
          marginBottom: "30px",
        }}
      >
        <h3
          style={{
            fontSize: "22px",
            color: "#FF6F3C",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Đánh giá của khách hàng
        </h3>
        {feedbacks.length === 0 ? (
          <p style={{ color: "#555", fontSize: "16px" }}>
            Hiện tại chưa có đánh giá nào cho dịch vụ này.
          </p>
        ) : (
          feedbacks.map((feedback, index) => (
            <div
              key={index}
              style={{
                borderBottom: "1px solid #e0e0e0",
                paddingBottom: "20px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <img
                    src={
                      feedback.customerId.avatar ||
                      "https://i.pinimg.com/originals/94/e4/cb/94e4cb5ae194975f6dc84d1495c3abcd.gif"
                    }
                    alt={feedback.customerId.name}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <h4
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        margin: 0,
                      }}
                    >
                      {feedback.customerId.name} -{" "}
                      {formatPhoneNumber(feedback.customerId.phone)}
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          style={{
                            color: i < feedback.rating ? "#FFD700" : "#e0e0e0", // Màu vàng cho sao được chọn, xám cho sao không chọn
                            fontSize: "16px",
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#000000",
                    fontWeight: "500",
                  }}
                >
                  {new Date(feedback.date).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div style={{ marginTop: "10px" }}>
                <div style={{ fontSize: "16px", color: "#333" }}>
                  {feedback.comment}
                </div>
                <div style={{ marginTop: "10px" }}>
                  {feedback.images.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      alt={`Feedback image ${imgIndex + 1}`}
                      style={{
                        width: "80px",
                        height: "80px",
                        marginRight: "10px",
                        borderRadius: "5px",
                        objectFit: "cover",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))
        )}

        {/* Phân trang Feedback */}
        <Pagination
          current={currentPage}
          pageSize={feedbackLimit}
          total={totalFeedbacks}
          onChange={(page) => setCurrentPage(page)}
          style={{ textAlign: "center", marginTop: "20px" }}
        />
      </div>

      {/* Các công việc của dịch vụ */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          marginBottom: "30px",
        }}
      >
        <h3
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            color: "#FF6F3C",
            marginBottom: "15px",
          }}
        >
          Cộng tác viên {service?.serviceName} sẽ làm những gì?
        </h3>
        <Task tasks={service.tasks} />
      </div>
    </div>
  );
}

export default Hourly;
