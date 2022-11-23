import { Button, Divider, Grid, Paper, TextField } from "@material-ui/core";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
function MyCheckoutPage() {
  const [userInfo, setUserInfo] = useState({});
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [email, setEmail] = useState('');
  // const [phone, setPhone] = useState('');
  const [message, setMessage] = useState("");
  const [listPost, setListPost] = useState([]);
  const [amount, setAmount] = useState();
  const [listMsg, setListMsg] = useState([]);

  const navigate = useNavigate();

  // const handlePayment = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log(data);
  //   console.log({
  //     firstName: data.get("firstName"),
  //     lastName: data.get("lastName"),
  //     email: data.get("email"),
  //     phone: data.get("phone"),
  //     address: data.get("address"),
  //     changePassword: data.get("changePassword"),
  //   });
  // };

  const getListPostChecked = async () => {
    try {
      const { data } = await axios.get("/user/postCart/checked/1", {
        headers: {
          Authorization: localStorage["access_token"],
        },
      });

      console.log("getListPostBychecked:::", data.data);
      setListPost(data.data);
      const listAmount = [];
      data.data.forEach((item) => {
        if (item.Post.price === -1) {
          listAmount.push(item.PostAuction.priceEnd);
        } else {
          listAmount.push(item.Post.price);
        }
      });
      const amount = listAmount.reduce((a, b) => a + b, 0);
      console.log("amount:::", amount);
      setAmount(amount);
    } catch (error) {
      console.log("error_getListPostChecked:::", error);
    }
  };

  // GET USER ACCOUNT
  const getUserInfo = async () => {
    try {
      const { data } = await axios.get("/user/userInfo", {
        headers: {
          Authorization: localStorage["access_token"],
        },
      });
      console.log("getUserInfor:::", data.data);
      setUserInfo(data.data);
    } catch (error) {
      console.log("error_getUserInfo:::", error);
    }
  };

  const hanleChangeTextField = (event) => {
    console.log(event.target.value);
    setMessage(event.target.value);
    let arrMsg = [];
    arrMsg.push(event.target.value);
    setListMsg(arrMsg);
  };

  // HANDLE PAYMENT
  const handlePayment = async () => {
    try {
      const { data } = await axios.post(
        "/user/payment",
        {
          message,
          status: 0,
        },
        {
          headers: {
            Authorization: localStorage["access_token"],
          },
        }
      );
      console.log("url_payment", data.url);
      window.location.replace(data.url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
    getListPostChecked();
  }, []);

  return (
    <Grid container justifyContent="center" style={{ minHeight: "70vh" }}>
      <Grid item xs={6} style={{ backgroundColor: "#F1ECF5" }}>
        <div style={{ display: "inline-flex", alignItems: "center" }}>
          <NoteAltIcon
            style={{
              width: 30,
              height: 30,
              margin: 12,
            }}
          />
          <p>Đặt hàng</p>
          {listMsg}
        </div>
        <div>
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <div style={{ margin: 8, marginTop: 8 }}>
                <Stack
                  spacing={2}
                  justifyContent="space-between"
                  justifyItems="center"
                >
                  <Paper>
                    <Stack direction="column" margin={2} spacing={2}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <LocationOnIcon style={{ fill: "#7b35ba" }} />
                        <p style={{ color: "#7b35ba" }}>Địa chỉ nhận hàng</p>
                      </Stack>
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Stack direction="column">
                          <Stack direction="row" alignItems="center">
                            <AccountBoxIcon style={{ fill: "#7b35ba" }} />
                            <p style={{ marginLeft: 8 }}>
                              {userInfo.firstName + " " + userInfo.lastName}{" "}
                            </p>
                          </Stack>
                          <Stack direction="row" alignItems="center">
                            <PhoneIphoneIcon style={{ fill: "#7b35ba" }} />
                            <p style={{ marginLeft: 8 }}>{userInfo.phone}</p>
                          </Stack>
                          <Stack direction="row" alignItems="center">
                            <PersonPinCircleIcon style={{ fill: "#7b35ba" }} />
                            <p style={{ marginLeft: 8 }}>{userInfo.address}</p>
                          </Stack>
                        </Stack>
                        <Button
                          variant="outlined"
                          size="small"
                          style={{ backgroundColor: "#7b35ba" }}
                          onClick={() => {
                            navigate("/editProfile");
                          }}
                        >
                          <p style={{ color: "white" }}>Thay đổi</p>
                        </Button>
                      </Stack>
                    </Stack>
                  </Paper>
                  <Paper style={{ backgroundColor: "#7b35ba" }}>
                    <Stack
                      direction="row"
                      spacing={2}
                      padding={1}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <div style={{ marginLeft: 40, color: "white" }}>
                        Tên sản phẩm
                      </div>
                      <div
                        style={{
                          display: "inline-flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <div style={{ marginRight: 50, color: "white" }}>
                          giá
                        </div>
                      </div>
                    </Stack>
                  </Paper>
                  <Stack direction="column">
                    {listPost.map((item) => {
                      return (
                        <Paper key={item.id} style={{ marginBottom: 8 }}>
                          <p style={{ marginLeft: 8 }}>
                            {item.Post.User.firstName +
                              " " +
                              item.Post.User.lastName}
                          </p>
                          <Divider></Divider>
                          <Stack
                            direction="row"
                            spacing={2}
                            padding={0.5}
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Stack direction="row" spacing={2}>
                              <img
                                src={item.image.imagePath}
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  navigate(`/post/`);
                                }}
                                alt=""
                                width={40}
                                height={40}
                              ></img>
                              <Stack
                                direction="column"
                                spacing={1}
                                justifyContent="center"
                              >
                                <p>{item.Post.title}</p>
                                {/* <p>{item.Post.createdAt}</p> */}
                              </Stack>
                            </Stack>
                            <div
                              style={{
                                display: "inline-flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <div style={{ marginRight: 24 }}>
                                <p>
                                  {item.Post.price === -1
                                    ? item.PostAuction.priceEnd
                                    : item.Post.price}{" "}
                                  đ
                                </p>
                              </div>
                            </div>
                          </Stack>
                          <div style={{ margin: 8, width: 250 }}>
                            <TextField
                              fullWidth
                              size="small"
                              name="msg"
                              label="Tin nhắn cho người bán"
                              onChange={hanleChangeTextField}
                            />
                          </div>
                        </Paper>
                      );
                    })}
                    {/* <Divider /> */}
                    <Stack direction="column">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginRight: 12,
                        }}
                      >
                        <div style={{ width: 400 }}></div>
                        <div>
                          <p>Tổng Thanh toán: </p>
                        </div>
                        <div style={{ marginRight: 16 }}>
                          <p>{amount} đ</p>
                        </div>
                      </div>
                    </Stack>

                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Button
                        form="payment_form"
                        type="submit"
                        style={{ backgroundColor: "#002F86", color: "white" }}
                        variant="contained"
                        size="large"
                        fullWidth
                      >
                        Thanh toán
                      </Button>
                      {/* <button form='payment_form' type='submit'>
            submit
          </button> */}

                      <img
                        form="payment_form"
                        type="submit"
                        width={250}
                        height={70}
                        src="paypal.png"
                        alt=""
                        style={{
                          cursor: "pointer",
                          objectFit: "cover",
                          // boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                        }}
                        onClick={handlePayment}
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </div>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}

export default MyCheckoutPage;
