// import { Avatar, Divider, Grid, makeStyles, Paper } from "@material-ui/core";
import { Avatar, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { makeStyles } from "@material-ui/core";
import MyManagePost from "./MyManagePost";
import MyManageUser from "./MyManageUser";

const useStyles = makeStyles((theme) => ({
  active: {
    // border: "1px solid #7b35ba",
    backgroundColor: "red",
    // padding: 2,
  },
}));

function MyAdminPage() {
  const classes = useStyles();
  const [active, setActive] = useState(1);
  const [menuId, setMenuId] = useState(1);

  const listMenu = [
    {
      id: 1,
      name: "Dashboard",
      icon: "DashboardIcon",
    },
    {
      id: 2,
      name: "User",
      icon: "AccountBoxIcon",
    },
    {
      id: 3,
      name: "Post",
      icon: "ShoppingCartIcon",
    },
    {
      id: 4,
      name: "Dashboard",
      icon: "DashboardIcon",
    },
  ];

  const handleMenuBtn = (id) => {
    setActive(id);
    setMenuId(id);
  };

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
              {listMenu.map((item) => {
                return (
                  <div
                    onClick={() => {
                      handleMenuBtn(item.id);
                      console.log("item.id:::", item.id);
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
                        border: item.id == active && "2px solid #7b35ba",
                        padding: 12,
                        marginLeft: 8,
                        marginRight: 8,
                        borderRadius: 8,
                      }}
                    >
                      {item.name === "Dashboard" && (
                        <DashboardIcon style={{ fill: "#7b35ba" }} />
                      )}{" "}
                      {item.name === "User" && (
                        <AccountBoxIcon style={{ fill: "#7b35ba" }} />
                      )}{" "}
                      {item.name === "Post" && (
                        <ShoppingCartIcon style={{ fill: "#7b35ba" }} />
                      )}{" "}
                      <p>{item.name}</p>
                    </Stack>
                  </div>
                );
              })}

              {/* <Stack
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
              </Stack> */}
            </Stack>
          </div>
        </Stack>
      </Grid>
      <Grid item xs={10} style={{ backgroundColor: "#F1ECF5" }}>
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
          {menuId === 2 && <MyManageUser />}
          {menuId === 3 && <MyManagePost />}
        </Stack>
      </Grid>
    </Grid>
  );
}

export default MyAdminPage;
