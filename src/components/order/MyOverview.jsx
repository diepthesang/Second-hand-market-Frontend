import { Box, Button, Grid, Modal, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { formatCash } from "../../helps/common";
import WalletIcon from "@mui/icons-material/Wallet";
import { Tab, Tabs } from "@mui/material";
import MyChart from "./MyChart";
import { getRevenueByUser } from "../../API/user_api";

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

function MyOverview() {
  const [tabValue, setTabValue] = useState(1);
  const [listRevenue, setListRevenue] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
    console.log(newValue);
  };

  const handleWithdrewBtn = () => {
    setOpenModal(true);
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
              margin: 12,
            }}
          >
            <div
              style={{
                display: "flex",
              }}
            >
              <p style={{ marginTop: 33 }}>Số dư </p>
              <p style={{ color: "#7b35ba", fontSize: 70 }}>
                {formatCash(String(revenue))} đ
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
                }}
                onClick={() => {
                  handleWithdrewBtn();
                }}
              >
                <WalletIcon style={{ color: "white" }} />
                <p style={{ paddingLeft: 8 }}>Rút tiền</p>
              </Button>
            </div>
          </Paper>
          <Paper style={{ margin: 12 }}>
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
                label="Thống kê"
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
          </Paper>
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
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default MyOverview;
