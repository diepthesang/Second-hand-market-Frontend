import { Button, Divider, Grid, makeStyles } from '@material-ui/core'
import axios from 'axios';

import React, { useEffect, useState } from 'react'
import SimpleImageSlider from "react-simple-image-slider";
import useWindowDimensions from '../../helps/useWindowDimensions';
import { useParams } from 'react-router-dom';
import { Avatar, Rating, Stack } from '@mui/material';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { useSelector } from 'react-redux';



const useStyles = makeStyles((theme) => ({
  input_file_cus: {
    backgroundColor: 'blue'
  }
}));
function MyBodyDetail() {
  const classes = useStyles();
  const { width } = useWindowDimensions();
  const [arrPost, setArrPost] = useState([]);
  const [value, setValue] = React.useState(2);
  const [images, setImages] = useState();
  const [like, setLike] = useState(false);
  const { postId } = useParams()
  // const dispatch = useDispatch()
  const _postId = useSelector((state) => state.postId.postId)
  // const _like = useSelector((state) => state.likePost.likePost)
  // const categoryChildId = useSelector((state) => state.categoryChildId.categoryChildId)



  const getPostByPostId = async () => {
    try {
      const { data } = await axios.get(`/common/post/${_postId || postId}`);
      setArrPost(data.data)
      setLike(data.data[0].liked)
      // console.log('like', data.data[0].liked);
    } catch (error) {
      console.log(error);
    }
  }


  // GET IMAGES PRODUCT

  const getImagesProduct = async () => {
    try {
      const data = await axios.get(`/common/imagesProduct/${_postId || postId}`)
      const listImage = data.data.data.map(item => {
        return (
          {
            url: item.proImg
          }
        )
      })
      setImages(listImage)
    } catch (error) {
      console.log(error);
    }
  }

  // UPDATE LIKE FOR POST 
  const updateLikeForPost = async (liked, postId) => {
    try {
      await axios.put('/user/updateLikePost/', {
        liked,
        postId,
      }, {
        headers: {
          Authorization: localStorage['access_token'],
        }
      })
    } catch (error) {
      console.log(error);
    }
  }


  //common/imagesProduct/161

  useEffect(
    () => {
      console.log(postId);
      getPostByPostId()
      getImagesProduct()
    }, [postId]
  )

  useEffect(
    () => {
      updateLikeForPost(like, postId)
      getPostByPostId()
      console.log('alo');
    }, [like]
  )



  return (

    arrPost.map(item => {
      return (
        <div key={item.id} style={{ marginTop: 110, marginBottom: 24, }}>
          <Grid container justifyContent='center'  >
            <Grid item xs={8} style={{ backgroundColor: '#F1ECF5' }}>
              <Grid container justifyContent='center' style={{ padding: 30 }} >
                <Grid item xs={8}>
                  <div className={classes.image_cus}>
                    <SimpleImageSlider autoPlay='true'
                      width={width * 5 / 15}
                      height={width * 4 / 15}
                      images={images}
                      showBullets={false}
                      showNavs={true}
                    />
                    <div style={{ marginTop: 20 }}>
                      <Stack spacing={2}>
                        <div style={{ display: 'inline-flex', justifyContent: 'space-between' }}>
                          <div style={{ marginRight: 20 }}>
                            <p style={{ color: 'blue', fontSize: 20, fontWeight: 'bold' }}>
                              {item.name}
                            </p>
                          </div>
                          <div style={{ marginRight: 150, cursor: 'pointer' }} onClick={() => {
                            setLike(!like)
                            console.log(item.liked);
                          }}>
                            {item.liked ? <ThumbUpAltIcon fontSize='large' style={{ fill: '#4676E4' }} />
                              :
                              <ThumbUpAltIcon fontSize='large' style={{ fill: 'white' }} />}
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
                              Status: {item.StatusCurrentProduct.status}
                            </p>
                          </Stack>
                          <Stack direction='row' spacing={1}>
                            <VerifiedUserIcon style={{ fill: '#7b35ba' }} />
                            <p style={{ color: 'blue' }}>Bảo hành: {item.Warranty.status}</p>
                          </Stack>

                        </Stack>
                        <Stack direction='row' spacing={1}>
                          <ApartmentIcon style={{ fill: '#7b35ba' }} />
                          <p style={{ color: 'blue' }}>Made In: {item.MadeIn.countryName}</p>
                        </Stack>
                        <Divider style={{ backgroundColor: '#7b35ba' }} />
                        <Stack direction='row' spacing={1}>
                          <LocationOnIcon style={{ fill: '#7b35ba' }} />
                          <p style={{ color: 'blue' }}>{item.address} - {item.ward} - {item.district} - {item.province}</p>
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
                              // src={'htt'}
                              sx={{ width: 48, height: 48 }}
                            />
                          </div>

                          <div>
                            <p style={{ marginLeft: -8, marginTop: 10, color: 'blue' }}>
                              {item.User.firstName} {item.User.lastName}
                            </p>
                          </div>

                          <div style={{ marginTop: 10 }}>
                            <Button style={{ fill: 'red' }} variant="outlined" size='small' sx={{ width: 50, }}>
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