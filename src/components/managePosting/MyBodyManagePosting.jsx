import { Box, Button, Grid, Menu, MenuItem, Switch, Tab } from '@material-ui/core'
import { Pagination, Paper, Tabs } from '@mui/material';
import { Stack } from '@mui/system'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

function MyBodyManagePosting() {
  const [listPostShow, setListPostShow] = useState([])
  const [listPostHide, setListPostHide] = useState([])
  const [value, setValue] = React.useState('1');
  const [hidePost, setHidePost] = useState(false);
  const [showPost, setShowPost] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const navigate = useNavigate()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };



  const getUserInfoByUser = async () => {
    try {
      const { data } = await axios.get('/user/userInfo', {
        headers: {
          Authorization: localStorage['access_token']
        }
      });

      console.log(data.data);

      setUserInfo(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getPostIsShowingByUserId = async () => {
    try {
      const { data } = await axios.get(`/user/post/activeId/1/page/${page}`, {
        headers: {
          Authorization: localStorage['access_token']
        }
      });
      console.log('post is showing :::: ', data)
      setListPostShow(data.data);
      setTotalPage(data.totalPage)
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  }


  const getPostIsHidingByUserId = async () => {
    try {
      const { data } = await axios.get(`/user/post/activeId/4/page/${page}`, {
        headers: {
          Authorization: localStorage['access_token']
        }
      });

      setListPostHide(data.data);
      setTotalPage(data.totalPage)
      console.log(data.data);
    } catch (error) {
      console.log(error)
    }
  }


  const hidePostByPostId = async (postId, activeId) => {
    try {
      const { data } = await axios.put('/user/updateActiveIdPost',
        {
          postId,
          activeId,
        },
        {
          headers: {
            Authorization: localStorage['access_token']
          }
        }
      )
      console.log(data)

    } catch (error) {
      console.log(error);
    }
  }

  const showPostByPostId = async (postId, activeId) => {
    try {
      const { data } = await axios.put('/user/updateActiveIdPost',
        {
          postId,
          activeId,
        },
        {
          headers: {
            Authorization: localStorage['access_token']
          }
        }
      )
      console.log(data)

    } catch (error) {
      console.log(error);
    }
  }


  useEffect(
    () => {
      getPostIsShowingByUserId()
    }, [hidePost]
  );

  useEffect(
    () => {
      if (value === "1") {
        getPostIsShowingByUserId();
      }
      if (value === '2') {
        getPostIsHidingByUserId();
      }
    }, [value, page]
  )

  useEffect(
    () => {
      getUserInfoByUser()
    }, []
  )

  useEffect(
    () => {
      getPostIsHidingByUserId()
    }, [showPost]
  )



  return (
    <div>
      <Grid container justifyContent='center' style={{ minHeight: '70vh' }}  >
        <Grid item xs={5} style={{ backgroundColor: '#F1ECF5' }} >
          <Paper style={{ padding: 8, marginBottom: 12, margin: 12 }}>
            <Stack direction='row' spacing={4}>
              <img src={userInfo.avatarImg} alt="Avatar"
                style={
                  {
                    border: ' 2px solid #7b35ba',
                    verticalAlign: "middle",
                    width: 75,
                    height: 75,
                    borderRadius: '50%'
                  }
                }
              />
              <Stack direction='column'>
                <p style={{ fontSize: 24 }}>{userInfo.firstName} {userInfo.lastName}</p>
                <Button variant="outlined" size='small'
                  onClick={() => {
                    navigate(`/profile/user/${userInfo.userId}`)
                  }}>
                  Trang cá nhân
                </Button>
              </Stack>
            </Stack>
          </Paper>
          <Paper style={{ margin: 12 }}>
            <Box sx={{ width: '100%' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
                centered
                size='small'
              >
                <Tab value="1" label="Show" defaultValue={1} />
                <Tab value="2" label="Hide" />
                <Tab value="3" label="khac" />
              </Tabs>
            </Box>
          </Paper>
          <div>
            {value === "1"
              &&
              listPostShow.map(item => {
                return (
                  <Paper key={item.id} style={{ marginLeft: 12, marginRight: 12, marginBottom: 12 }}>
                    <Stack direction='row' spacing={2} padding={1} justifyContent='space-between' alignItems='center'>
                      <Stack direction='row' spacing={2}>
                        <img style={{ cursor: 'pointer' }} onClick={() => { navigate(`/post/${item.id}`) }} alt='' width={100} height={100} src={item.image.imagePath}></img>
                        <Stack direction='column' spacing={1} justifyContent='start'>
                          <p>{item.title}</p>
                          <p>{item.price}</p>
                          <p>{item.createdAt}</p>
                        </Stack>
                      </Stack>
                      <div style={{ display: 'inline-flex', justifyContent: 'flex-end' }}>

                        <Button size='small' variant="outlined" style={{ borderColor: 'red', marginRight: 4, boxShadow: ' rgba(0, 0, 0, 0.24) 0px 3px 8px ' }}
                          onClick={() => {
                            navigate(`/edit/post/${item.id}`)
                          }}>
                          <EditIcon style={{ paddingRight: 4 }} />
                          Edit
                        </Button>
                        <Button size='small' variant="outlined" style={{ borderColor: 'red', marginRight: 4, boxShadow: ' rgba(0, 0, 0, 0.24) 0px 3px 8px ' }}
                          onClick={() => {
                            console.log(item.id);
                            hidePostByPostId(item.id, 4)
                            setHidePost(!hidePost)
                          }}
                        >
                          <VisibilityOffOutlinedIcon style={{ paddingRight: 4 }} />
                          Hide
                        </Button>
                      </div>
                    </Stack>
                  </Paper>
                )
              })
            }

            {value === "2"
              &&
              listPostHide.map(item => {
                return (
                  <Paper key={item.id} style={{ marginLeft: 12, marginRight: 12, marginBottom: 12 }}>
                    <Stack direction='row' spacing={2} padding={1} justifyContent='space-between' alignItems='center' >
                      <Stack direction='row' spacing={2}>
                        <img style={{ filter: "grayscale(100%)", cursor: 'not-allowed' }} alt='' width={100} height={100} src={item.image.imagePath}></img>
                        <Stack direction='column' spacing={1} justifyContent='start'>
                          <p>{item.title}</p>
                          <p>{item.price}</p>
                          <p>{item.createdAt}</p>
                        </Stack>
                      </Stack>
                      <div style={{ display: 'inline-flex', justifyContent: 'flex-end' }}>
                        <Button size='small' variant="outlined" style={{ borderColor: 'red', marginRight: 4, boxShadow: ' rgba(0, 0, 0, 0.24) 0px 3px 8px ' }}
                          onClick={() => {
                            showPostByPostId(item.id, 1)
                            setShowPost(!showPost)
                          }}>
                          <RemoveRedEyeOutlinedIcon style={{ paddingRight: 4 }} />
                          Show
                        </Button>
                      </div>
                    </Stack>
                  </Paper>
                )
              })
            }

          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination count={totalPage} page={page} onChange={handleChangePage} />
          </div>
        </Grid >
      </Grid >
    </div >
  )
}


export default MyBodyManagePosting