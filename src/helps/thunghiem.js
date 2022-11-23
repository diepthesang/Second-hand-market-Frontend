
const _ = require('lodash')

const list =
  [
    {
      "id": 90,
      "postId": 292,
      "userId": "ba2896d3-f1da-4c7c-a2bd-35b62fa956d5",
      "checked": 1,
      "createdAt": "2022-11-18T08:40:00.000Z",
      "updatedAt": "2022-11-20T08:10:06.000Z",
      "Post": {
        "id": 292,
        "cateId": 3,
        "title": "Bàn phím cơ rgb",
        "statusId": 2,
        "warrantyId": 2,
        "originId": 2,
        "description": "hang con moi chat luong tot",
        "price": 1,
        "province": "Thành phố Đà Nẵng",
        "district": "Quận Ngũ Hành Sơn",
        "ward": "Phường Hoà Hải",
        "street": "trường chinh",
        "activeId": 1,
        "userId": "3613c165-842d-46d9-92e9-10defcac0921",
        "likeCount": null,
        "createdAt": "2022-11-17T09:33:17.000Z",
        "updatedAt": "2022-11-17T09:33:17.000Z",
        "User": {
          "userId": "3613c165-842d-46d9-92e9-10defcac0921",
          "firstName": "hoang",
          "lastName": "hai dang"
        }
      },
      "PostAuction": {
        "id": null,
        "postId": null,
        "bidEndTime": null,
        "priceStart": null,
        "priceEnd": null,
        "createdAt": null,
        "updatedAt": null
      },
      "image": {
        "id": 74,
        "imagePath": "/upload/1668677597055-829797818-dsc00190-16425649898611997297308.webp",
        "postId": 292,
        "userId": "3613c165-842d-46d9-92e9-10defcac0921",
        "createdAt": "2022-11-17T09:33:17.000Z",
        "updatedAt": "2022-11-17T09:33:17.000Z"
      }
    },
    {
      "id": 92,
      "postId": 254,
      "userId": "ba2896d3-f1da-4c7c-a2bd-35b62fa956d5",
      "checked": 1,
      "createdAt": "2022-11-20T05:59:28.000Z",
      "updatedAt": "2022-11-20T08:10:05.000Z",
      "Post": {
        "id": 254,
        "cateId": 3,
        "title": "macbook Pro 2022",
        "statusId": 2,
        "warrantyId": 2,
        "originId": 1,
        "description": "hang moi ve con nguyen seal",
        "price": 999999,
        "province": "Thành phố Đà Nẵng",
        "district": "cau giay",
        "ward": "ba dinh",
        "street": "thai phien",
        "activeId": 1,
        "userId": "ba2896d3-f1da-4c7c-a2bd-35b62fa956d5",
        "likeCount": null,
        "createdAt": "2022-11-05T02:16:20.000Z",
        "updatedAt": "2022-11-05T02:16:20.000Z",
        "User": {
          "userId": "ba2896d3-f1da-4c7c-a2bd-35b62fa956d5",
          "firstName": "diep",
          "lastName": "the sang"
        }
      },
      "PostAuction": {
        "id": null,
        "postId": null,
        "bidEndTime": null,
        "priceStart": null,
        "priceEnd": null,
        "createdAt": null,
        "updatedAt": null
      },
      "image": {
        "id": 26,
        "imagePath": "/upload/1667614580866-663304532-logo-login.jpg",
        "postId": 254,
        "userId": "ba2896d3-f1da-4c7c-a2bd-35b62fa956d5",
        "createdAt": "2022-11-05T02:16:20.000Z",
        "updatedAt": "2022-11-05T02:16:20.000Z"
      }
    },
    {
      "id": 93,
      "postId": 251,
      "userId": "ba2896d3-f1da-4c7c-a2bd-35b62fa956d5",
      "checked": 1,
      "createdAt": "2022-11-20T09:49:27.000Z",
      "updatedAt": "2022-11-20T09:49:27.000Z",
      "Post": {
        "id": 251,
        "cateId": 3,
        "title": "macbook Pro 2022",
        "statusId": 2,
        "warrantyId": 2,
        "originId": 1,
        "description": "hang moi ve con nguyen seal",
        "price": 999999,
        "province": "Thành phố Đà Nẵng",
        "district": "cau giay",
        "ward": "ba dinh",
        "street": "thai phien",
        "activeId": 1,
        "userId": "ba2896d3-f1da-4c7c-a2bd-35b62fa956d5",
        "likeCount": null,
        "createdAt": "2022-11-05T01:34:22.000Z",
        "updatedAt": "2022-11-11T13:05:26.000Z",
        "User": {
          "userId": "ba2896d3-f1da-4c7c-a2bd-35b62fa956d5",
          "firstName": "diep",
          "lastName": "the sang"
        }
      },
      "PostAuction": {
        "id": null,
        "postId": null,
        "bidEndTime": null,
        "priceStart": null,
        "priceEnd": null,
        "createdAt": null,
        "updatedAt": null
      },
      "image": {
        "id": 19,
        "imagePath": "/upload/1667612062257-389442857-logo-login.jpg",
        "postId": 251,
        "userId": "ba2896d3-f1da-4c7c-a2bd-35b62fa956d5",
        "createdAt": "2022-11-05T01:34:22.000Z",
        "updatedAt": "2022-11-05T01:34:22.000Z"
      }
    }
  ]



const listUserId = list.map(item => {
  return (
    {
      userId: item.Post.User.userId,
      shopeName: item.Post.User.firstName + " " + item.Post.User.lastName
    }
  )
});

const _list = _.uniqBy(listUserId, function (item) {
  return item.userId;
});

console.log(_list);