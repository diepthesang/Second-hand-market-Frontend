// import { Avatar, Divider, Grid, makeStyles, Paper } from "@material-ui/core";
import { Avatar, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import MyUser from "./MyUser";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function MyAdminPage() {
  const [blur, setBlur] = useState(false);

  const changeColor = () => {
    setBlur(!blur);
  };

  // useEffect(() => {
  //   changeColor();
  // }, [blur]);

  return (
    <Grid container style={{}}>
      <Grid
        item
        xs={2}
        style={{ borderRight: "1px dashed #E0E4E8", height: "100vh" }}
      >
        <Stack direction="column" spacing={8}>
          <div>logo</div>
          <div
            style={{
              backgroundColor: "#E8EBEE",
              height: 70,
              borderRadius: 8,
              margin: 20,
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <p style={{ paddingLeft: 8 }}>Admin name</p>
          </div>
          <div>
            <Stack direction="column" spacing={1}>
              <div
                onclick={() => {
                  changeColor();
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyItems: "center",
                    backgroundColor: "#E8EBEE",
                    padding: 12,
                    marginLeft: 8,
                    marginRight: 8,
                    borderRadius: 8,
                  }}
                >
                  <DashboardIcon style={{ fill: "#7b35ba" }} /> <p>Dashboard</p>
                </Stack>
              </div>
              <Stack
                direction="row"
                spacing={2}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "center",
                  backgroundColor: "#E8EBEE",
                  cursor: "pointer",
                  padding: 12,
                  marginLeft: 8,
                  marginRight: 8,
                  borderRadius: 8,
                }}
              >
                <AccountBoxIcon style={{ fill: "#7b35ba" }} /> <p>User</p>
              </Stack>
              <Stack
                direction="row"
                spacing={2}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "center",
                  backgroundColor: "#E8EBEE",
                  cursor: "pointer",
                  padding: 12,
                  marginLeft: 8,
                  marginRight: 8,
                  borderRadius: 8,
                }}
              >
                <ShoppingCartIcon style={{ fill: "#7b35ba" }} /> <p>Post</p>
              </Stack>
              <Stack
                direction="row"
                spacing={2}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "center",
                  cursor: "pointer",
                  backgroundColor: "#E8EBEE",
                  padding: 12,
                  marginLeft: 8,
                  marginRight: 8,
                  borderRadius: 8,
                }}
              >
                <DashboardIcon style={{ fill: "#7b35ba" }} /> <p>Dashboard</p>
              </Stack>
            </Stack>
          </div>
        </Stack>
      </Grid>
      <Grid item xs={10}>
        <div
          style={{
            backgroundColor: "red",
            margin: 30,
            display: "flex",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Stack direction="row-reverse" spacing={2}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Stack>
        </div>
        <Stack direction="column">
          <MyUser />
        </Stack>
      </Grid>
    </Grid>
  );
}

export default MyAdminPage;
