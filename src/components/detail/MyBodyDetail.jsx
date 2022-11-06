import { Button, Divider, Grid, makeStyles } from '@material-ui/core'
import axios from 'axios';

import React, { useEffect, useLayoutEffect, useState } from 'react'
import SimpleImageSlider from "react-simple-image-slider";
import useWindowDimensions from '../../helps/useWindowDimensions';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, Box, IconButton, Modal, Rating, Stack, Typography } from '@mui/material';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../redux/cartSlice';
import { getPageUrl } from '../../redux/pageUrlSlice';





const useStyles = makeStyles((theme) => ({
  input_file_cus: {
    backgroundColor: 'blue'
  }
}));
function MyBodyDetail() {
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const classes = useStyles();
  const { width } = useWindowDimensions();
  const [listPost, setListPost] = useState([]);
  const [value, setValue] = React.useState(2);
  const [images, setImages] = React.useState([]);
  const [like, setLike] = useState(false);
  const [time, setTime] = useState('')
  const { _postId } = useParams()

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const _postId = useSelector((state) => state.postId.postId)
  // const _like = useSelector((state) => state.likePost.likePost)
  // const categoryChildId = useSelector((state) => state.categoryChildId.categoryChildId)



  const getPostByPostId = async () => {
    try {
      const { data } = await axios.get(`/common/post/${_postId}`);
      console.log("data.data", data.data)
      const _listPost = [];
      _listPost.push(data.data)
      console.log('listPost:::', _listPost[0]);
      setListPost(_listPost)
      setValue(_listPost[0].User.starRating)
      const _listImage = _listPost[0].listImage.map(item => {
        return (
          {
            url: item.imagePath,
          }
        )
      });
      setImages(_listImage);
      console.log('time:::::', data.data.createdAt);
      var d = new Date(data.data.createdAt);
      console.log('Today is: ' + d.toLocaleString());
      const _time = d.toUTCString()
      setTime(_time)



    } catch (error) {
      console.log(error);
    }
  }


  //  MUA

  const handleBuy = async () => {
    if (!localStorage['access_token']) {
      localStorage.setItem('page_url', window.location.href);
      navigate('/login')
    }

    try {
      const { data } = await axios.post('/user/addPostToCart', {
        postId: _postId,
      },
        {
          headers: {
            Authorization: localStorage['access_token'],
          }
        });
      console.log('data_handlebuy', data.data);
      if (data.data) {
        dispatch(getCart());
      } else {

      }

    } catch (error) {
      console.log('Err_handle_buy:::', error);
    };

  }

  //Like Post
  const likePost = async (postId) => {
    try {
      if (localStorage['access_token'] === undefined) {
        navigate('/login')
      } else {

        const { data } = await axios.post('/user/likePost',
          {
            postId,
          },
          {
            headers: {
              Authorization: localStorage['access_token'],
            }
          }
        );

        console.log('like:::', data.data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  //unlikePost
  const unlikePost = async (postId) => {
    try {
      if (localStorage['access_token'] === undefined) {
        navigate('/login')
      } else {

        const { data } = await axios.post('/user/unlikePost',
          {
            postId,
          },
          {
            headers: {
              Authorization: localStorage['access_token'],
            }
          }
        );

        console.log('unlike:::', data.data)
      }
    } catch (error) {
      console.log(error);
    }
  };


  //getCurrent Like Post
  const getCurrentLikePost = async (postId) => {
    try {
      if (localStorage['access_token'] === undefined) {
        setLike(false);
      } else {
        const { data } = await axios.get(`/user/currentLikePost/${_postId}`,
          {
            headers: {
              Authorization: localStorage['access_token'],
            }
          });
        console.log('like:::', data);
        if (data.data === null) {
          setLike(false);
        } else {
          setLike(true);
        }
      }
    } catch (error) {
      console.log(error)
    }
  };


  useEffect(
    () => {
      getPostByPostId();
      getCurrentLikePost();
    }, [like]
  )






  return (
    listPost.map(item => {
      return (
        <div key={item.id}>
          <Grid container justifyContent='center'  >
            <Grid item xs={8} style={{ backgroundColor: '#F1ECF5' }}>
              <Grid container justifyContent='center' style={{ padding: 30 }} >
                <Grid item xs={8}>
                  <div >
                    <div style={{ position: 'relative' }} >
                      <SimpleImageSlider autoPlay='true'
                        width={width * 5 / 15}
                        height={width * 4 / 15}
                        images={images}
                        showBullets={false}
                        showNavs={true}
                      />
                      <div
                        style={{ position: 'absolute', bottom: 10, right: 180 }}
                      >{time}</div>
                    </div>

                    <div style={{ marginTop: 20 }}>
                      <Stack spacing={2}>
                        <div style={{ display: 'inline-flex', justifyContent: 'space-between' }}>
                          <div style={{ marginRight: 20 }}>
                            <p style={{ color: 'blue', fontSize: 20, fontWeight: 'bold' }}>
                              {item.title}
                            </p>
                          </div>
                          <div style={{ marginRight: 150, cursor: 'pointer' }}>
                            {like ?
                              <IconButton onClick={() => {
                                setLike(false);
                                unlikePost(item.id);
                              }}>
                                <ThumbUpAltIcon fontSize='large' style={{ fill: '#4676E4' }} />
                              </IconButton>
                              :
                              <IconButton onClick={() => {
                                setLike(true);
                                likePost(item.id);
                              }} >
                                <ThumbUpAltIcon fontSize='large' style={{ fill: 'white' }} />
                              </IconButton>
                            }
                          </div>
                        </div>
                        <p style={{ color: '#C90927', fontWeight: 'bold' }}>{item.price} đ</p>
                        <p style={{ color: 'blue' }}>
                          {item.description}
                          <br />
                        </p>
                        <Stack direction='row' spacing={12}>
                          <Stack direction='row' spacing={1}>
                            <BuildCircleIcon style={{ fill: '#7b35ba' }} />
                            <p style={{ color: 'blue' }}>
                              Tình trạng: {item.PostCondition.status}
                            </p>
                          </Stack>
                          <Stack direction='row' spacing={1}>
                            <VerifiedUserIcon style={{ fill: '#7b35ba' }} />
                            <p style={{ color: 'blue' }}>Bảo hành: {item.Warranty.status}</p>
                          </Stack>

                        </Stack>
                        <Stack direction='row' spacing={1}>
                          <ApartmentIcon style={{ fill: '#7b35ba' }} />
                          <p style={{ color: 'blue' }}>Sản xuất tại: {item.Origin.countryName}</p>
                        </Stack>
                        <Divider style={{ backgroundColor: '#7b35ba' }} />
                        <Stack direction='row' spacing={1}>
                          <LocationOnIcon style={{ fill: '#7b35ba' }} />
                          <p style={{ color: 'blue' }}>{item.street} - {item.ward} - {item.district} - {item.province}</p>
                        </Stack>
                      </Stack>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <Divider style={{ marginBottom: 12, backgroundColor: '#7b35ba' }} />
                  <div>
                    <div style={{ cursor: 'pointer', color: 'red' }} >
                      <Stack direction='column' spacing={2}>
                        <div style={{ display: 'inline-flex', justifyContent: 'space-around' }} >
                          {/* <div style={{ width: 12, height: 12, marginTop: -4 }}> */}
                          <div>
                            <Avatar
                              alt="Remy Sharp"
                              src={item.User.avatarImg}
                              sx={{ width: 48, height: 48 }}
                            />
                          </div>

                          <div>
                            <p style={{ marginLeft: -8, marginTop: 10, color: 'blue' }}>
                              {item.User.firstName} {item.User.lastName}
                            </p>
                          </div>

                          <div style={{ marginTop: 10 }}>
                            <Button style={{ fill: 'red' }} variant="outlined" size='small'
                              sx={{ width: 50, }} onClick={() => {
                                navigate(`/profile/user/${item.User.userId}`)
                                console.log('..... alo ', item.User.userId)
                              }}>
                              Xem trang
                            </Button>
                          </div>

                        </div>
                        <div style={{ display: "flex", justifyContent: 'center' }}>
                          <Rating
                            size="large"
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                              setValue(newValue);
                            }}
                          />
                        </div>

                        <Stack direction='row' spacing={2} style={{ display: "inline-flex", justifyContent: "start", border: '1px solid #33A837', borderRadius: 4, backgroundColor: "white" }}>
                          <PhoneIphoneIcon style={{ marginTop: 2, marginLeft: 8, fill: '#33A837' }} />
                          <p style={{ fontSize: 20, color: "#33A837", fontWeight: 'bolder' }}>{item.User.phone}</p>
                        </Stack>
                        {/* </div> */}
                        <Button size='small' style={{ backgroundColor: '#33A837', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} >
                          <QuestionAnswerIcon style={{ marginRight: 8 }} />
                          Chat voi nguoi ban
                        </Button>
                        <Stack direction='row' spacing={2}>
                          <Button fullWidth size='small' style={{ backgroundColor: '#FFD600', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} onClick={handleBuy}>
                            MUA
                          </Button>
                          <Button fullWidth size='small' style={{ backgroundColor: '#33A837', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                            MUA
                          </Button>
                        </Stack>
                      </Stack>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid >
        </div >
      )
    })
  )
}

export default MyBodyDetail