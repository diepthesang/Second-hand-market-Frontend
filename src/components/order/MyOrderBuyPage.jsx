import {
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import MyModalBill from "./MyModalBill";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function MyOrderBuyPage() {
  const [value, setValue] = React.useState("CONFIRM");
  const [listPost, setListPost] = useState([]);
  const [tapButton, setTapButton] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const getListOrderBuyPost = async () => {
    try {
      const { data } = await axios.get(`/user/orderBuyPost/${value}`, {
        headers: {
          Authorization: localStorage["access_token"],
        },
      });
      console.log("listPost:::", data.data);
      setListPost(data.data);
    } catch (error) {
      console.log("err_getListOrderBuyPost:::", error);
    }
  };

  const handleChangeStatusOrderPost = async (id, status) => {
    try {
      const { data } = await axios.put(
        "/user/updateConfirmOrderPost",
        {
          id,
          status,
        },
        {
          headers: {
            Authorization: localStorage["access_token"],
          },
        }
      );
      setTapButton(data.data);
    } catch (error) {
      console.log("err_handleConfirm:::", error);
    }
  };

  const hanlePending = async () => {
    try {
      setOpenModal(true);
    } catch (error) {}
  };

  useEffect(() => {
    getListOrderBuyPost();
  }, [value, tapButton]);

  return (
    <Grid container justifyContent="center" style={{ minHeight: "70vh" }}>
      <Grid item xs={8} style={{ backgroundColor: "#F1ECF5" }}>
        <Tabs
          centered
          style={{ color: "yellow" }}
          value={value}
          onChange={handleChangeTab}
          textColor="secondary"
          indicatorColor="secondary"
          // aria-label="secondary tabs example"
        >
          <Tab value="CONFIRM" label="Chờ xác nhận" />
          <Tab value="PENDING" label="Đang xử lí" />
          <Tab value="DELIVERING" label="Đang giao" />
          <Tab value="DELIVERED" label="Đã giao" />
          <Tab value="CANCEL" label="Hoàn tiền/đã huỷ" />
        </Tabs>

        <Paper style={{ padding: 12, marginTop: 8, marginBottom: 8 }}>
          {/* <Stack direction="row" display="flex" justifyContent="space-around">
            <div style={{ minWidth: 300 }}>Sản phẩm</div>
            <div>Tổng đơn hàng</div>
            <div>Trạng thái</div>
            <div>Vận chuyển</div>
            <div style={{ marginRight: 60 }}>Thao tác</div>
          </Stack> */}
          <Grid container justifyContent="center">
            <Grid
              item
              xs={4}
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Sản phẩm
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Tổng đơn hàng
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Trạng thái
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Vận chuyển
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Thao tác
            </Grid>
          </Grid>
        </Paper>

        {listPost.map((item) => {
          return (
            <Paper key={item.id} style={{ padding: 8, marginTop: 4 }}>
              <div>
                {item.Transaction.User.firstName +
                  " " +
                  item.Transaction.User.lastName}
              </div>
              <Divider></Divider>
              <Grid container justifyContent="center">
                <Grid
                  item
                  xs={4}
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    alt=""
                    src={item.Post.PostImages[0].imagePath}
                    width={80}
                    height={80}
                  ></img>
                  <p style={{ marginLeft: 8 }}>{item.Post.title}</p>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <p> {item.Post.price}</p>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {item.status === "CONFIRM" && "Chờ xác nhận"}
                  {item.status === "PENDING" && "Đang đóng gói"}
                  {item.status === "DELIVERING" && "Đang giao"}
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Vận chuyển
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {item.status === "CONFIRM" && (
                    <Button
                      size="small"
                      style={{
                        backgroundColor: "#F50057",
                        textTransform: "none",
                      }}
                      onClick={() => {
                        handleChangeStatusOrderPost(item.id, "PENDING");
                      }}
                    >
                      Xác nhận
                    </Button>
                  )}
                  {item.status === "PENDING" && (
                    <Button
                      size="small"
                      style={{
                        backgroundColor: "#F50057",
                        textTransform: "none",
                        color: "white",
                      }}
                      onClick={() => {
                        hanlePending();
                      }}
                    >
                      <AirportShuttleIcon />
                      Chuẩn bị hàng
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Paper>
          );
        })}
      </Grid>
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Chi tiết
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </Grid>
  );
}

export default MyOrderBuyPage;
