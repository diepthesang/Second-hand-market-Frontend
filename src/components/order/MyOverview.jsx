import {
  Box,
  Button,
  Grid,
  makeStyles,
  Modal,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { formatCash } from "../../helps/common";
import WalletIcon from "@mui/icons-material/Wallet";
import { Divider, Stack, Tab, Tabs, TextField } from "@mui/material";
import MyChart from "./MyChart";
import { getRevenueByUser } from "../../API/user_api";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: 8,
  boxShadow: 24,
  p: 4,
};

const styleTran = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "#F1ECF5",
  // border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 8,
  p: 4,
};

const useStyles = makeStyles((theme) => ({
  row: {
    display: "flex",
    alignItems: "center",
    // justifyContent: "center",
    height: 40,
    alignContent: "center",
    borderRadius: 8,
    marginLeft: 8,
  },
}));

function MyOverview() {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(1);
  const [listRevenue, setListRevenue] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [listTransaction, setListtransaction] = useState([]);

  const [openModalTran, setOpenModalTran] = React.useState(false);
  const handleOpen = () => setOpenModalTran(true);
  const handleClose = () => setOpenModalTran(false);

  // const handleChangeTab = (event, newValue) => {
  //   setTabValue(newValue);
  //   console.log(newValue);
  // };

  const handleViewTransaction = async () => {
    try {
      setOpenModalTran(true);
      await getListTransaction();
    } catch (error) {}
  };

  const handleWithdrewBtn = () => {
    setOpenModal(true);
  };

  const getListTransaction = async () => {
    try {
      const { data } = await axios.get("/user/transaction", {
        headers: {
          Authorization: localStorage["access_token"],
        },
      });
      setListtransaction(data.data);
    } catch (error) {}
  };

  const getRevenue = async () => {
    const _listRevenue = await getRevenueByUser(false);
    const _listValueRevenue = _listRevenue.map((item) => {
      return item.revenue;
    });
    const _revenue = _listValueRevenue.reduce((a, b) => a + b, 0);
    setRevenue(_revenue);
    setListRevenue(_listRevenue);
  };

  useEffect(() => {
    getRevenue();
  }, []);

  return (
    <div>
      <Grid container justifyContent="center" style={{ minHeight: "70vh" }}>
        <Grid
          item
          xs={8}
          style={{ backgroundColor: "#F1ECF5", borderRadius: 12 }}
        >
          <Paper
            style={{
              display: "flex",
              justifyContent: "space-around",
              // width: "100%",
              justifyItems: "center",
              alignContent: "center",
              margin: 20,
            }}
          >
            <div
              style={{
                display: "flex",
              }}
            >
              <p style={{ marginTop: 23 }}>S??? d?? </p>
              <p style={{ color: "#7b35ba", fontSize: 50 }}>
                {formatCash(String(revenue))} ??
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                style={{
                  backgroundColor: "#7b35ba",
                  height: 40,
                  width: 220,
                  textTransform: "none",
                  color: "white",
                  marginRight: 4,
                }}
                onClick={() => {
                  handleViewTransaction();
                }}
              >
                <WalletIcon style={{ color: "white" }} />
                <p style={{ paddingLeft: 8 }}>Xem l???ch s??? giao d???ch</p>
              </Button>
              <Button
                style={{
                  backgroundColor: "#7b35ba",
                  height: 40,
                  width: 220,
                  textTransform: "none",
                  color: "white",
                }}
                onClick={() => {
                  handleWithdrewBtn();
                }}
              >
                <WalletIcon style={{ color: "white" }} />
                <p style={{ paddingLeft: 8 }}>R??t ti???n</p>
              </Button>
            </div>
          </Paper>
          {/* <Paper style={{ margin: 12 }}>
            <Tabs
              TabIndicatorProps={{
                sx: { backgroundColor: "#7b35ba" },
              }}
              size="small"
              sx={{
                // "& button": { backgroundColor: "blue",  },
                // "& button:active": { backgroundColor: "yellow" },
                // "& button:focus": { backgroundColor: "black" },
                "& button:hover": { backgroundColor: "#F1ECF5" },
                "& button.Mui-selected": {
                  backgroundColor: "#7b35ba",
                  color: "white",
                },
              }}
              value={tabValue}
              onChange={handleChangeTab}
              centered
            >
              <Tab
                value={1}
                style={{
                  textTransform: "none",
                }}
                label="Th???ng k??"
              />
              <Tab
                value={2}
                style={{
                  textTransform: "none",
                }}
                label="Item Two"
              />
              <Tab
                value={3}
                style={{
                  textTransform: "none",
                }}
                label="Item Three"
              />
            </Tabs>
          </Paper> */}
          {tabValue === 1 && <MyChart />}
        </Grid>
      </Grid>
      <div>
        {/* <Button onClick={openModal}>Open modal</Button> */}
        <Modal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {/* <Typography id="modal-modal-title" variant="h6" component="h2">
              T??i kho???n ng??n h??ng
            </Typography> */}
            <p style={{ fontSize: 20 }}>T??i kho???n ng??n h??ng</p>
            <Stack direction="column" spacing={2} marginTop={2}>
              <TextField
                color="secondary"
                size="small"
                id="outlined-basic"
                label="T??n t??i kho???n"
                variant="outlined"
              />
              <TextField
                color="secondary"
                size="small"
                id="outlined-basic"
                label="Ng??n h??ng"
                variant="outlined"
              />
              <TextField
                color="secondary"
                size="small"
                id="outlined-basic"
                label="Chi nh??nh"
                variant="outlined"
              />
              <TextField
                color="secondary"
                size="small"
                id="outlined-basic"
                label="S??? t??i kho???n"
                variant="outlined"
              />
              <Button
                style={{
                  textTransform: "none",
                  color: "white",
                  backgroundColor: "#7b35ba",
                }}
              >
                <AccountBalanceWalletIcon style={{ marginRight: 8 }} />
                G???i y??u c???u
              </Button>
            </Stack>
          </Box>
        </Modal>
        <Modal
          open={openModalTran}
          onClose={() => {
            setOpenModalTran(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleTran}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              L???ch s??? giao d???ch
            </Typography>
            <Paper style={{ marginTop: 4 }}>
              <Grid container>
                <Grid item xs={3} className={classes.row}>
                  <div>Ng?????i g???i</div>
                </Grid>
                <Grid item xs={4} className={classes.row}>
                  S??? ti???n
                </Grid>
                <Grid item xs={4} className={classes.row}>
                  Th???i gian g???i
                </Grid>
              </Grid>
            </Paper>
            <Paper style={{ marginTop: 4 }}>
              {listTransaction.map((item) => {
                return (
                  <div>
                    <Grid container>
                      <Grid item xs={3} className={classes.row}>
                        {/* <div>Ng?????i g???i</div> */}
                      </Grid>
                      <Grid item xs={4} className={classes.row}>
                        {formatCash(String(item.revenue))}
                      </Grid>
                      <Grid item xs={4} className={classes.row}>
                        {item.createdAt}
                      </Grid>
                    </Grid>
                    <Divider />
                  </div>
                );
              })}
            </Paper>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default MyOverview;
