import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { Alert, Divider, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../redux/cartSlice";
import MyCountdownTimer from "../test/MyCountdownTimer";
import MyListUserBid from "./MyListUserBid";
import ClearIcon from "@mui/icons-material/Clear";
import { getCurrentBidPrice } from "../../redux/currentBidPriceSice";

function MyBidFeature({
  priceStart,
  postId,
  postAuctionId,
  priceUserBid,
  bidOrderId,
  isBid,
  bidEndTime,
}) {
  console.log("render><><><><><<><><><><><><><>");
  console.log({
    priceStart,
    postId,
    postAuctionId,
    priceUserBid,
    bidOrderId,
    isBid,
  });
  // const highestPriceBid = useSelector(
  //   (state) => state.highestPriceBid.highestPriceBid
  // );
  const [valueBid, setValueBid] = useState("");
  const [errMsg, setErrMsg] = useState(null);
  const [highestPriceBid, setHighestPriceBid] = useState(0);
  const dispatch = useDispatch();
  const currentBidPrice = useSelector((state) => state.currentBidPrice);
  // xu li nhap tien dau gia
  const handleChangeValueBid = (event) => {
    try {
      if (event.target.value <= priceStart) {
        setErrMsg("Số tiền trả phải lớn hơn giá khởi điểm");
        if (event.target.value === "") {
          setErrMsg(null);
        } else {
          return;
        }
        return;
      } else {
        setErrMsg(null);
      }
      if (isNaN(parseFloat(event.target.value))) {
        setErrMsg("Tiền phải là số");
        return;
      } else {
        setErrMsg(null);
      }
      setValueBid(event.target.value);
    } catch (error) {
      console.log("err_handleChangeValueBid:::", error);
    }
  };

  // xu li button dau gia
  const handleBid = async () => {
    try {
      if (valueBid <= (await getHighestBidder())) {
        setErrMsg("Số tiền bạn trả phải lớn hơn người đứng đầu!");
        return;
      }
      const { data } = await axios.post(
        "/user/createPriceBid",
        {
          postId,
          postAuctionId,
          priceBid: valueBid,
        },
        {
          headers: {
            Authorization: localStorage["access_token"],
          },
        }
      );
      bidSoket();
      getHighestBidder();
      console.log("createBidPrice:::", data.data);
      await getHighestBidder();
    } catch (error) {
      console.log("err_handleBid:::", handleBid);
    }
  };

  // create bid socket
  const bidSoket = async () => {
    try {
      await axios.post("/user/createBid", {
        isBid: !isBid,
      });
    } catch (error) {
      console.log("err_bidSocket:::", error);
    }
  };

  // remove bid money

  const removePriceBid = async () => {
    console.log("bidorderID...", bidOrderId);
    try {
      const { data } = await axios.delete(
        `/user/moneyAution/${currentBidPrice.bidOrderId}`,
        {
          headers: {
            Authorization: localStorage["access_token"],
          },
        }
      );
      if (data.data === 1) {
        bidSoket();
        dispatch(getCurrentBidPrice(false));
        return;
      } else {
        return;
      }
    } catch (error) {
      console.log("err_removeMoneyAution", error);
    }
  };

  const getHighestBidder = async () => {
    try {
      const { data } = await axios.get(
        `/user/highestBidder/postId/${postId}}/postAuctionId/${postAuctionId}`,
        {
          headers: {
            Authorization: localStorage["access_token"],
          },
        }
      );
      localStorage.setItem("highest_bid_user", data.data.userId);
      localStorage.setItem("highest_bid_price", data.data.priceBid);
      setHighestPriceBid(data.data.priceBid);
      console.log("highes_bid_user:::", data.data.userId);
      return data.data.priceBid;
    } catch (error) {
      console.log("error_getHighestBidder:::", error);
    }
  };

  // // get list user bid
  // const getListUserBid = async (postAuctionId) => {
  //   try {
  //     const { data } = await axios.get(
  //       `/common/listBidPrice/postId/${_postId}/postAuctionId/${postAuctionId}`
  //     );

  //     data.data.forEach((item) => {
  //       if (item.userId === localStorage["userId"]) {
  //         setPriceUserBid(item.priceBid);
  //         setBidOrderId(item.id);
  //         setIsRemove(true);
  //       }
  //     });
  //     setListUserBid(data.data);
  //   } catch (error) {
  //     console.log("error_getListPostUserBid:::", error);
  //   }
  // };

  useEffect(() => {
    getHighestBidder();
  }, []);

  return (
    <Stack direction="column" spacing={2}>
      <div
        style={{
          display: "flex",
          direction: "column",
          justifyContent: "center",
          alignItem: "center",
        }}
      >
        <MyCountdownTimer
          time={bidEndTime}
          highestPriceBid={highestPriceBid}
          postId={postId}
        />
      </div>
      <p>Giá khởi điểm: {priceStart} đ</p>
      <TextField
        size="small"
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        fullWidth
        // value={priceBid}
        id="outlined-adornment-amount"
        name="description"
        label="Tôi trả"
        variant="outlined"
        onChange={(event) => {
          handleChangeValueBid(event);
        }}
      />

      <p
        style={{
          color: "gray",
          fontSize: 12,
          marginTop: -1,
        }}
      >
        Số tiền bạn trả phải trên: {priceStart} đ
      </p>
      {errMsg && (
        <Alert variant="filled" severity="warning">
          {errMsg}
        </Alert>
      )}
      {currentBidPrice.currentBidPrice !== false && (
        <Stack direction="row" alignItems="center" spacing={2}>
          <p>Bạn đã ra giá: {currentBidPrice.currentBidPrice}</p>
          <IconButton
            onClick={() => {
              removePriceBid();
            }}
          >
            <ClearIcon></ClearIcon>
          </IconButton>
        </Stack>
      )}
      <Button
        fullWidth
        size="small"
        style={{
          backgroundColor: "#33A837",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          // cursor: `${cursor}`,
        }}
        onClick={() => {
          handleBid();
        }}
      >
        Đấu giá
      </Button>
      {/* DANH SACH USER DANG DAU GIA */}
      <Divider />
      <MyListUserBid
        postId={postId}
        postAuctionId={postAuctionId}
      ></MyListUserBid>
    </Stack>
  );
}

export default MyBidFeature;