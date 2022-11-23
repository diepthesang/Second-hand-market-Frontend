import {
  Badge,
  Button,
  Divider,
  Fade,
  Grid,
  InputBase,
  makeStyles,
  Menu,
  MenuItem,
  styled,
} from "@material-ui/core";
import { Box } from "@mui/system";
import React, { useState } from "react";
import MySearchBar from "./MySearchBar";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ChatIcon from "@mui/icons-material/Chat";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import HomeIcon from "@mui/icons-material/Home";
// import { Menu } from '@mui/material/Menu';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const useStyles = makeStyles((theme) => ({
  make_position: {
    backgroundColor: "#7b35ba",
    position: "fixed",
    top: 0,
    // right: 0,
    // left: 0,
    width: "100%",
    zIndex: 100,

    // width: '100%'
  },

  menu_cus: {
    paddingTop: 8,
    flexDirection: "column",
    display: "flex",
  },
}));

function MyHeader() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [qtyCart, setQtyCart] = useState(0);
  let cartQty = useSelector((state) => state.cart.cart);

  const handleBtnChat = () => {
    navigate("/chat");
  };

  const handBtnHome = () => {
    navigate("/");
  };

  const handleCart = () => {
    navigate("/cart");
  };

  // GET QTY CART

  const getQtyCart = async () => {
    try {
      const { data } = await axios.get("/user/postCart/1", {
        headers: {
          Authorization: localStorage["access_token"],
        },
      });
      console.log("data_getQTYCart::::", data.data.count);
      setQtyCart(data.data.count);
    } catch (error) {
      console.log("err_getQtyCart:::", error);
    }
    console.log("cartQty::", cartQty);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getQtyCart();
  }, [cartQty]);

  return (
    <Grid
      container
      justifyContent="center"
      style={{ marginBottom: 114, color: "white" }}
    >
      <Grid item xs={12}>
        <div className={classes.make_position}>
          <Grid container justifyContent="center">
            <Grid item xs={8}>
              <div className={classes.menu_cus}>
                <div
                  style={{
                    display: "inline-flex",
                    justifyContent: "space-around",
                  }}
                >
                  <div
                    onClick={() => {
                      navigate("/");
                    }}
                    style={{
                      maxWidth: 200,
                      maxHeight: 56,
                      marginRight: 24,
                      marginTop: -12,
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src="/upload/logochinh.png"
                      alt="logo"
                      style={{ width: 200, height: 60 }}
                    />
                  </div>

                  <div>
                    <Button
                      onClick={() => {
                        handBtnHome();
                      }}
                      size="small"
                      style={{ color: "white" }}
                    >
                      <HomeIcon />
                      <Box width={4}></Box>
                      Home
                    </Button>
                  </div>

                  <div>
                    <Button
                      style={{ color: "white" }}
                      size="small"
                      onClick={() => {
                        navigate("/managePosting");
                      }}
                    >
                      <FormatListBulletedIcon />
                      <Box width={4}></Box>
                      <div> Manage postting</div>
                    </Button>
                  </div>

                  <div>
                    <Button
                      size="small"
                      style={{ color: "white" }}
                      aria-controls={open ? "fade-menu" : undefined}
                      // aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      <ShoppingBagIcon />
                      <Box width={4}></Box>
                      <div>Đơn hàng</div>
                    </Button>
                  </div>
                  <div>
                    <Menu
                      disableScrollLock={true}
                      id="fade-menu"
                      MenuListProps={{
                        "aria-labelledby": "fade-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      TransitionComponent={Fade}
                    >
                      <MenuItem
                        style={{ color: "#7b35ba " }}
                        onClick={() => {
                          handleClose();
                          // navigate(`/profile/user/${userId}`);
                        }}
                      >
                        Đơn mua
                      </MenuItem>
                      <Divider />
                      <MenuItem
                        style={{ color: "#7b35ba " }}
                        onClick={() => {
                          navigate("/order/buy");
                          handleClose();
                        }}
                      >
                        Đơn Bán
                      </MenuItem>
                    </Menu>
                  </div>

                  <div>
                    <Button
                      style={{ color: "white" }}
                      onClick={() => {
                        handleBtnChat();
                      }}
                      size="small"
                    >
                      <ChatIcon />
                      <Box width={4}></Box>
                      Chat
                    </Button>
                  </div>

                  <div>
                    <Button
                      style={{ color: "white" }}
                      onClick={handleCart}
                      size="small"
                    >
                      <Badge
                        badgeContent={qtyCart}
                        color="secondary"
                        overlap="rectangular"
                      >
                        <ShoppingCartIcon />
                      </Badge>
                    </Button>
                  </div>
                  {/* <div>
                    <Button
                      onClick={() => {
                        handleBtnChat();
                      }}
                      size="small"
                    >
                      <ExpandMoreIcon />
                      <Box width={4}></Box>
                      More
                    </Button>

                    <div>
                      <Button
                        id="fade-button"
                        aria-controls={open ? "fade-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                      >
                        More <ExpandMoreIcon />
                      </Button>
                      <Menu
                        id="fade-menu"
                        MenuListProps={{
                          "aria-labelledby": "fade-button",
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                      >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                      </Menu>
                    </div>
                  </div> */}
                </div>
                <MySearchBar></MySearchBar>
              </div>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}

export default MyHeader;
