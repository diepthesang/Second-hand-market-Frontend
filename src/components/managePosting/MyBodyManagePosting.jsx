import { Box, Button, ButtonGroup, Grid, Tab } from "@material-ui/core";
import { IconButton, Pagination, Paper, Tabs } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

function MyBodyManagePosting() {
  const [listPostShow, setListPostShow] = useState([]);
  const [listPostHide, setListPostHide] = useState([]);
  const [listPostLike, setListPostLike] = useState([]);
  const [value, setValue] = React.useState("1");
  const [hidePost, setHidePost] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const getUserInfoByUser = async () => {
    try {
      const { data } = await axios.get("/user/userInfo", {
        headers: {
          Authorization: localStorage["access_token"],
        },
      });

      console.log(data.data);

      setUserInfo(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPostIsShowingByUserId = async () => {
    try {
      const { data } = await axios.get(`/user/post/activeId/1/page/${page}`, {
        headers: {
          Authorization: localStorage["access_token"],
        },
      });
      console.log("post is showing :::: ", data);
      setListPostShow(data.data);
      setTotalPage(data.totalPage);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPostIsHidingByUserId = async () => {
    try {
      const { data } = await axios.get(`/user/post/activeId/4/page/${page}`, {
        headers: {
          Authorization: localStorage["access_token"],
        },
      });

      setListPostHide(data.data);
      setTotalPage(data.totalPage);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hidePostByPostId = async (postId, activeId) => {
    try {
      const { data } = await axios.put(
        "/user/updateActiveIdPost",
        {
          postId,
          activeId,
        },
        {
          headers: {
            Authorization: localStorage["access_token"],
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const showPostByPostId = async (postId, activeId) => {
    try {
      const { data } = await axios.put(
        "/user/updateActiveIdPost",
        {
          postId,
          activeId,
        },
        {
          headers: {
            Authorization: localStorage["access_token"],
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const removePost = async (id) => {
    try {
      await axios.delete(`/user/Post/${id}`, {
        headers: {
          Authorization: localStorage["access_token"],
        },
      });
    } catch (error) {
      console.log("err_removePost::", error);
    }
  };

  const getPostsLike = async () => {
    try {
      const { data } = await axios.get("/user/Post/like", {
        headers: {
          Authorization: localStorage["access_token"],
        },
      });
      const _listPost = data.data.filter((item) => item.Post !== null);
      console.log("getPostLike:::::", _listPost);
      const __listPost = paginate(_listPost, 5, page);
      setListPostLike(__listPost);
    } catch (error) {
      console.log("err_getPostsLike:::", error);
    }
  };

  const paginate = (listPost, page_size, page_number) => {
    const totalNumberPage = Math.ceil(listPost.length / 5);
    setTotalPage(totalNumberPage);
    return listPost.slice(
      (page_number - 1) * page_size,
      page_number * page_size
    );
  };

  useEffect(() => {
    getPostIsShowingByUserId();
  }, [hidePost]);

  useEffect(() => {
    if (value === "1") {
      getPostIsShowingByUserId();
    }
    if (value === "2") {
      getPostIsHidingByUserId();
    }
    if (value === "3") {
      getPostsLike();
    }
  }, [value, page]);

  useEffect(() => {
    getUserInfoByUser();
  }, []);

  useEffect(() => {
    getPostIsHidingByUserId();
  }, [showPost]);

  useEffect(() => {}, []);

  return (
    <div>
      <Grid container justifyContent="center" style={{ minHeight: "70vh" }}>
        <Grid item xs={6} style={{ backgroundColor: "#F1ECF5" }}>
          <Paper style={{ padding: 8, marginBottom: 12, margin: 12 }}>
            <Stack direction="row" spacing={4}>
              <img
                src={userInfo.avatarImg}
                alt="Avatar"
                style={{
                  // border: "2px solid #7b35ba",
                  verticalAlign: "middle",
                  width: 75,
                  height: 75,
                  borderRadius: "50%",
                }}
              />
              <Stack direction="column">
                <p style={{ fontSize: 24 }}>
                  {userInfo.firstName} {userInfo.lastName}
                </p>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    navigate(`/profile/user/${userInfo.userId}`);
                  }}
                >
                  Trang cá nhân
                </Button>
              </Stack>
            </Stack>
          </Paper>
          <Paper style={{ margin: 12 }}>
            <Box sx={{ width: "100%" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                // aria-label="secondary tabs example"
                centered
                size="small"
              >
                <Tab
                  value="1"
                  label="Hiển thị"
                  defaultValue={1}
                  style={{ textTransform: "none", fontSize: 18 }}
                />
                <Tab
                  value="2"
                  label="Ẩn"
                  style={{ textTransform: "none", fontSize: 18 }}
                />
                <Tab
                  value="3"
                  label="Yêu thích"
                  style={{ textTransform: "none", fontSize: 18 }}
                />
              </Tabs>
            </Box>
          </Paper>
          <div>
            {value === "1" &&
              listPostShow.map((item) => {
                return (
                  <Paper
                    key={item.id}
                    style={{
                      marginLeft: 12,
                      marginRight: 12,
                      marginBottom: 12,
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      padding={1}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack direction="row" spacing={2}>
                        <img
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            navigate(`/post/${item.id}`);
                          }}
                          alt=""
                          width={100}
                          height={100}
                          src={item.image.imagePath}
                        ></img>
                        <Stack
                          direction="column"
                          spacing={1}
                          justifyContent="start"
                        >
                          <p>{item.title}</p>
                          <p>{item.price}</p>
                          <p>{item.createdAt}</p>
                        </Stack>
                      </Stack>
                      <div
                        style={{
                          display: "inline-flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <ButtonGroup
                          size="small"
                          aria-label="small button group"
                        >
                          <Button
                            color="error"
                            size="small"
                            variant="outlined"
                            style={{
                              // borderColor: "#F9CF58",
                              // marginRight: 4,
                              textTransform: "none",
                              boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px ",
                            }}
                            onClick={() => {
                              navigate(`/edit/post/${item.id}`);
                            }}
                          >
                            <EditIcon style={{ paddingRight: 4 }} />
                            Sửa
                          </Button>
                          <Button
                            color="primary"
                            size="small"
                            variant="outlined"
                            style={{
                              textTransform: "none",
                              boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px ",
                            }}
                            onClick={() => {
                              console.log(item.id);
                              hidePostByPostId(item.id, 4);
                              setHidePost(!hidePost);
                            }}
                          >
                            <VisibilityOffOutlinedIcon
                              style={{ paddingRight: 4 }}
                            />
                            Ẩn
                          </Button>

                          <Button
                            color="secondary"
                            size="small"
                            variant="outlined"
                            style={{
                              textTransform: "none",
                              boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px ",
                            }}
                            onClick={() => {
                              console.log(item.id);
                              removePost(item.id);
                              setHidePost(!hidePost);
                            }}
                          >
                            <DeleteIcon style={{ paddingRight: 4 }} />
                            Xoá
                          </Button>

                          {/* {buttons} */}
                        </ButtonGroup>
                      </div>
                    </Stack>
                  </Paper>
                );
              })}

            {value === "2" &&
              listPostHide.map((item) => {
                return (
                  <Paper
                    key={item.id}
                    style={{
                      marginLeft: 12,
                      marginRight: 12,
                      marginBottom: 12,
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      padding={1}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack direction="row" spacing={2}>
                        <img
                          style={{
                            filter: "grayscale(100%)",
                            cursor: "not-allowed",
                          }}
                          alt=""
                          width={100}
                          height={100}
                          src={item.image.imagePath}
                        ></img>
                        <Stack
                          direction="column"
                          spacing={1}
                          justifyContent="start"
                        >
                          <p>{item.title}</p>
                          <p>{item.price}</p>
                          <p>{item.createdAt}</p>
                        </Stack>
                      </Stack>
                      <div
                        style={{
                          display: "inline-flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button
                          size="small"
                          color="primary"
                          variant="outlined"
                          style={{
                            textTransform: "none",
                            marginRight: 4,
                            boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px ",
                          }}
                          onClick={() => {
                            showPostByPostId(item.id, 1);
                            setShowPost(!showPost);
                          }}
                        >
                          <RemoveRedEyeOutlinedIcon
                            style={{ paddingRight: 4 }}
                          />
                          Hiển thị
                        </Button>
                      </div>
                    </Stack>
                  </Paper>
                );
              })}

            {value === "3" &&
              listPostLike.map((item) => {
                return (
                  <Paper
                    key={item.Post.id}
                    style={{
                      marginLeft: 12,
                      marginRight: 12,
                      marginBottom: 12,
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      padding={1}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack direction="row" spacing={2}>
                        <img
                          style={{
                            // filter: "grayscale(100%)",
                            cursor: "pointer",
                          }}
                          alt=""
                          width={100}
                          height={100}
                          src={item.Post.PostImages[0].imagePath}
                          onClick={() => {
                            navigate(`/Post/${item.Post.id}`);
                          }}
                        ></img>
                        <Stack
                          direction="column"
                          spacing={1}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <p>{item.Post.title}</p>
                          <p>{item.Post.price}</p>
                          {/* <p>{item.createdAt}</p> */}
                        </Stack>
                      </Stack>
                      <div
                        style={{
                          display: "inline-flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <IconButton
                          size="large"
                          color="primary"
                          // variant="outlined"
                          // style={{
                          //   marginRight: 4,
                          //   // boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px ",
                          // }}
                          onClick={() => {
                            // showPostByPostId(item.id, 1);
                            // setShowPost(!showPost);
                          }}
                        >
                          <ThumbUpIcon
                            fontSize="large"
                            style={{ paddingRight: 4 }}
                          />
                        </IconButton>
                      </div>
                    </Stack>
                  </Paper>
                );
              })}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              count={totalPage}
              page={page}
              onChange={handleChangePage}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default MyBodyManagePosting;
