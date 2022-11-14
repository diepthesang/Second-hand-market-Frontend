import { Button, Divider, Grid } from "@material-ui/core";
import axios from "axios";

import React, { useEffect, useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import useWindowDimensions from "../../helps/useWindowDimensions";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Box, Rating, Stack } from "@mui/material";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../redux/cartSlice";
import io from "socket.io-client";
import MyListUserBid from "./MyListUserBid";
import MyBidFeature from "./MyBidFeature";
import MyLike from "../common/MyLike";
const socket = io();
function MyBodyDetail() {
  console.log("**rerender");
  const { width } = useWindowDimensions();
  const [listPost, setListPost] = useState([]);
  const [value, setValue] = React.useState(2);
  const [images, setImages] = React.useState([]);
  const [time, setTime] = useState("");
  const { _postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postAuction, setPostAuction] = useState(false);
  const [listUserBid, setListUserBid] = useState([]);
  const [isBid, setIsBid] = useState(0);
  const [priceUserBid, setPriceUserBid] = useState("");
  const [bidOrderId, setBidOrderId] = useState("");
  const [isRemove, setIsRemove] = useState(true);
  const [postAuctionId, setPostAutionId] = useState("");

  // const _postId = useSelector((state) => state.postId.postId)
  // const categoryChildId = useSelector((state) => state.categoryChildId.categoryChildId)
  const _timeOver = useSelector((state) => state.timeOver.timeOver);
  console.log("timeOver:::", _timeOver);

  const getPostByPostId = async () => {
    try {
      const { data } = await axios.get(`/common/post/${_postId}`);
      console.log("data.data", data.data);
      const _listPost = [];
      _listPost.push(data.data);
      console.log("listPost:::", _listPost[0]);
      setListPost(_listPost);
      setValue(_listPost[0].User.starRating);
      const _listImage = _listPost[0].listImage.map((item) => {
        return {
          url: item.imagePath,
        };
      });
      setImages(_listImage);
      var d = new Date(data.data.createdAt);
      const _time = d.toUTCString();
      setTime(_time);
      setPostAutionId(data.data.PostAuction.id);
      await getListUserBid(data.data.PostAuction.id);
      if (data.data.price === -1) {
        setPostAuction(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //  MUA
  const handleBuy = async () => {
    if (!localStorage["access_token"]) {
      localStorage.setItem("page_url", window.location.href);
      navigate("/login");
    }

    try {
      const { data } = await axios.post(
        "/user/addPostToCart",
        {
          postId: _postId,
        },
        {
          headers: {
            Authorization: localStorage["access_token"],
          },
        }
      );
      console.log("data_handlebuy", data.data);
      if (data.data) {
        dispatch(getCart());
      } else {
      }
    } catch (error) {
      console.log("Err_handle_buy:::", error);
    }
  };

  const getListUserBid = async (postAuctionId) => {
    try {
      const { data } = await axios.get(
        `/common/listBidPrice/postId/${_postId}/postAuctionId/${postAuctionId}`
      );

      data.data.forEach((item) => {
        if (item.userId === localStorage["userId"]) {
          setPriceUserBid(item.priceBid);
          setBidOrderId(item.id);
          setIsRemove(true);
        }
      });
      setListUserBid(data.data);
    } catch (error) {
      console.log("error_getListPostUserBid:::", error);
    }
  };

  // GET HIGHEST BIDDER PRICE
  // const getHighestBidder = async (postId, postAuctionId) => {
  //   try {
  //     const { data } = await axios.get(
  //       `/user/highestBidder/postId/${postId}}/postAuctionId/${postAuctionId}`,
  //       {
  //         headers: {
  //           Authorization: localStorage["access_token"],
  //         },
  //       }
  //     );
  //     return data.data.priceBid;
  //   } catch (error) {
  //     console.log("error_getHighestBidder:::", error);
  //   }
  // };

  //REMOVE MONEY AUTION
  // const removeMoneyAution = async () => {
  //   console.log("bidorderID...", bidOrderId);
  //   try {
  //     const { data } = await axios.delete(`/user/moneyAution/${bidOrderId}`, {
  //       headers: {
  //         Authorization: localStorage["access_token"],
  //       },
  //     });
  //     setRemove(!remove);
  //   } catch (error) {
  //     console.log("err_removeMoneyAution", error);
  //   }
  // };

  // const bidSoket = async (bid) => {
  //   try {
  //     await axios.post("/createBid", {
  //       bid,
  //     });
  //   } catch (error) {}
  // };

  useEffect(() => {
    getPostByPostId();
    getListUserBid();
  }, []);

  // useEffect(() => {
  //   getListUserBid();
  // }, [isBid]);

  useEffect(() => {
    socket.on("userBid", (bid) => {
      console.log("biddddddd*******", bid);
      getPostByPostId();
      getListUserBid();
    });
    return () => {
      socket.off("userBid");
    };
  }, []);

  return listPost.map((item) => {
    return (
      <div key={item.id}>
        <Grid container justifyContent="center">
          <Grid item xs={8} style={{ backgroundColor: "#F1ECF5" }}>
            <Grid container justifyContent="center" style={{ padding: 30 }}>
              <Grid item xs={8}>
                <div>
                  <div style={{ position: "relative" }}>
                    <SimpleImageSlider
                      autoPlay="true"
                      width={(width * 5) / 15}
                      height={(width * 4) / 15}
                      images={images}
                      showBullets={false}
                      showNavs={true}
                    />
                    <div
                      style={{ position: "absolute", bottom: 10, right: 180 }}
                    >
                      {time}
                    </div>
                  </div>

                  <div style={{ marginTop: 20 }}>
                    <Stack spacing={2}>
                      <div
                        style={{
                          display: "inline-flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ marginRight: 20 }}>
                          <p
                            style={{
                              color: "blue",
                              fontSize: 20,
                              fontWeight: "bold",
                            }}
                          >
                            {item.title}
                          </p>
                        </div>
                        <div style={{ marginRight: 150, cursor: "pointer" }}>
                          <MyLike postId={item.id}></MyLike>
                        </div>
                      </div>
                      <p style={{ color: "#C90927", fontWeight: "bold" }}>
                        {item.price} đ
                      </p>
                      <p style={{ color: "blue" }}>
                        {item.description}
                        <br />
                      </p>
                      <Stack direction="row" spacing={12}>
                        <Stack direction="row" spacing={1}>
                          <BuildCircleIcon style={{ fill: "#7b35ba" }} />
                          <p style={{ color: "blue" }}>
                            Tình trạng: {item.PostCondition.status}
                          </p>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                          <VerifiedUserIcon style={{ fill: "#7b35ba" }} />
                          <p style={{ color: "blue" }}>
                            Bảo hành: {item.Warranty.status}
                          </p>
                        </Stack>
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        <ApartmentIcon style={{ fill: "#7b35ba" }} />
                        <p style={{ color: "blue" }}>
                          Sản xuất tại: {item.Origin.countryName}
                        </p>
                      </Stack>
                      <Divider style={{ backgroundColor: "#7b35ba" }} />
                      <Stack direction="row" spacing={1}>
                        <LocationOnIcon style={{ fill: "#7b35ba" }} />
                        <p style={{ color: "blue" }}>
                          {item.street} - {item.ward} - {item.district} -{" "}
                          {item.province}
                        </p>
                      </Stack>
                    </Stack>
                  </div>
                </div>
              </Grid>
              <Grid item xs={4}>
                <Divider
                  style={{ marginBottom: 12, backgroundColor: "#7b35ba" }}
                />
                <div>
                  <div style={{ cursor: "pointer", color: "red" }}>
                    <Stack direction="column" spacing={2}>
                      <div
                        style={{
                          display: "inline-flex",
                          justifyContent: "space-around",
                        }}
                      >
                        {/* <div style={{ width: 12, height: 12, marginTop: -4 }}> */}
                        <div>
                          <Avatar
                            alt="Remy Sharp"
                            src={item.User.avatarImg}
                            sx={{ width: 48, height: 48 }}
                          />
                        </div>

                        <div>
                          <p
                            style={{
                              marginLeft: -8,
                              marginTop: 10,
                              color: "blue",
                            }}
                          >
                            {item.User.firstName} {item.User.lastName}
                          </p>
                        </div>

                        <div style={{ marginTop: 10 }}>
                          <Button
                            style={{ fill: "red" }}
                            variant="outlined"
                            size="small"
                            sx={{ width: 50 }}
                            onClick={() => {
                              navigate(`/profile/user/${item.User.userId}`);
                              console.log("..... alo ", item.User.userId);
                            }}
                          >
                            Xem trang
                          </Button>
                        </div>
                      </div>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Rating
                          size="large"
                          name="simple-controlled"
                          value={value}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                          }}
                        />
                      </div>

                      <Stack
                        direction="row"
                        spacing={2}
                        style={{
                          display: "inline-flex",
                          justifyContent: "start",
                          border: "1px solid #33A837",
                          borderRadius: 4,
                          backgroundColor: "white",
                        }}
                      >
                        <PhoneIphoneIcon
                          style={{
                            marginTop: 2,
                            marginLeft: 8,
                            fill: "#33A837",
                          }}
                        />
                        <p
                          style={{
                            fontSize: 20,
                            color: "#33A837",
                            fontWeight: "bolder",
                          }}
                        >
                          {item.User.phone}
                        </p>
                      </Stack>
                      {/* </div> */}
                      <Button
                        size="small"
                        style={{
                          backgroundColor: "#33A837",
                          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        }}
                      >
                        <QuestionAnswerIcon style={{ marginRight: 8 }} />
                        Chat voi nguoi ban
                      </Button>

                      {postAuction ? (
                        <Stack direction="column" spacing={2}>
                          <MyBidFeature
                            isRemove={isRemove}
                            bidOrderId={bidOrderId}
                            postId={item.id}
                            postAuctionId={item.PostAuction.id}
                            priceStart={item.PostAuction.priceStart}
                            priceUserBid={priceUserBid}
                            isBid={isBid}
                          ></MyBidFeature>
                          <Divider />
                          <MyListUserBid
                            listUserBid={listUserBid}
                          ></MyListUserBid>
                        </Stack>
                      ) : (
                        <Button
                          fullWidth
                          size="small"
                          style={{
                            backgroundColor: "#FFD600",
                            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                          }}
                          onClick={handleBuy}
                        >
                          MUA
                        </Button>
                      )}
                    </Stack>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  });
}

export default MyBodyDetail;
