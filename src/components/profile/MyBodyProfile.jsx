import { Button, Divider, Grid, IconButton, Paper, Rating } from '@mui/material'
import { Box, Stack } from '@mui/system'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';


function MyBodyProfile() {
  const [value, setValue] = React.useState(2);
  const [listPostShow, setListPostShow] = useState([])
  const [like, setLike] = useState(false);
  const [userInfo, setUserInfo] = useState([])

  const navigate = useNavigate();
  const { userId } = useParams()


  const getListPostShowByUserId = async () => {
    try {

      if (!localStorage['access_token']) {
        const { data } = await axios.get(`/common/post/user/${userId}`);
        console.log('listPostbyUser:: common:::', data.data)
        setListPostShow(data.data);
        // setLike(data.data.Likes)

      } else {
        const { data } = await axios.get(`/user/post/user/${userId}`, {
          headers: {
            Authorization: localStorage['access_token']
          }
        });
        setListPostShow(data.data);
        // setLike(data.data.Likes)
        console.log('data.data.Likes:::', data.data);
        console.log('list post by user: user::::', data.data)
      }
    } catch (error) {
      console.log(error)
    }
  };

  const getUserInfoByUserId = async () => {
    try {
      const { data } = await axios.get(`/common/user/${userId}`)
      console.log('userIdParam:::', userId);
      console.log('user by userId :::', data);
      setUserInfo(data.data)
      // setValue(data.data.starRating)
    } catch (error) {
      console.log(error);
    }
  };

  //getCurrent Like Post
  // const getCurrentLikePost = async (postId) => {
  //   try {
  //     if (localStorage['access_token'] === undefined) {
  //       setLike(false);
  //     } else {

  //     }

  //   } catch (error) {

  //   }

  // };



  // const updateLikeForPost = async (postId, liked) => {
  //   try {
  //     await axios.put('/user/updateLikePost/', {
  //       liked,
  //       postId,
  //     }, {
  //       headers: {
  //         Authorization: localStorage['access_token'],
  //       }
  //     })
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(
    () => {
      getListPostShowByUserId();
      // getCurrentLikePost();
    }, [like]
  )

  useEffect(
    () => {
      getUserInfoByUserId()
    }, []
  )

  return (
    <Grid container justifyContent='center' style={{ minHeight: '70vh' }}>
      <Grid item xs={5} style={{ backgroundColor: '#F1ECF5' }}>
        <Stack direction='column'>
          <Paper style={{ padding: 8, marginBottom: 12 }}>
            <Stack direction='row' justifyContent='start'>
              <Stack direction='row' spacing={2}>
                <img src={userInfo.avatarImg} alt="Avatar"
                  style={
                    {
                      border: ' 2px solid #7b35ba',
                      verticalAlign: "middle",
                      width: 100,
                      height: 100,
                      borderRadius: '50%'
                    }
                  }
                />
                <Stack direction='column' justifyContent='center'>
                  <p style={{ fontSize: 18 }}>
                    {userInfo.firstName} {userInfo.lastName}
                  </p>
                  <Button variant="outlined" size='small'
                    onClick={() => {
                      navigate('/editProfile')
                    }}>
                    edit profile
                  </Button>
                </Stack>
              </Stack>

              <Stack direction='column' marginLeft={10} justifyContent='space-between'>
                <Stack direction='row' spacing={1}>
                  <p>Đánh giá: {userInfo.starRating}</p>
                  <Box
                    sx={{
                      '& > legend': { mt: 2 },
                      // marginTop: -0.5
                    }}
                  >
                    <Rating
                      size='small'
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </Box>
                </Stack>
                <Stack direction='row'>
                  <p>Ngày tham gia: {userInfo.createdAt}</p>
                </Stack>
                <Stack direction='row'>
                  Số điện thoại: {userInfo.phone}
                </Stack>
              </Stack>
            </Stack>
          </Paper>

          <div style={{}}>
            <p style={{ fontSize: 20 }}>Tin đang đăng</p>
            <Divider style={{ paddingBottom: 8, }} />

            <div style={{ paddingTop: 12 }}>
              {
                listPostShow.map(item => {
                  return (
                    <div onClick={() => { navigate(`/post/${item.id}`) }} style={{ cursor: 'pointer' }}>
                      <Paper key={item.id} style={{ marginLeft: 12, marginRight: 12, marginBottom: 12 }}>
                        <Stack direction='row' spacing={2} padding={1} justifyContent='space-between' alignItems='center'>
                          <Stack direction='row' spacing={2}>
                            <img style={{ cursor: 'pointer' }} alt='' width={100} height={100} src={item.image.imagePath}></img>
                            <Stack direction='column' spacing={1} justifyContent='start'>
                              <p>{item.title}</p>
                              <p>{item.price}</p>
                              <p>{item.createdAt}</p>
                            </Stack>
                          </Stack>
                          <div style={{ display: 'inline-flex', justifyContent: 'flex-end' }}>

                            {item.Likes.id ?
                              <IconButton size='small' variant="outlined" style={{ borderColor: 'red', marginRight: 12, }}
                              >

                                <ThumbUpAltIcon style={{ fill: '#4676E4' }} />
                              </IconButton>
                              :
                              <IconButton size='small' variant="outlined" style={{ borderColor: 'red', marginRight: 12, }}
                              >
                                <ThumbUpAltIcon style={{ fill: '#F1ECF5' }} />
                              </IconButton>}

                          </div>
                        </Stack>
                      </Paper>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </Stack>
      </Grid >
    </Grid >
  )
}

export default MyBodyProfile





// {
//   listPostShow.map(item => {
//     return (
//       <Paper key={item.id} style={{ marginLeft: 12, marginRight: 12, marginBottom: 12 }}>
//         <Stack direction='row' spacing={2} padding={1} justifyContent='space-between' alignItems='center'>
//           <Stack direction='row' spacing={2}>
//             <img style={{ cursor: 'pointer' }} onClick={() => { navigate(`/post/${item.id}`) }} alt='' width={100} height={100} src={item.image.proImg}></img>
//             <Stack direction='column' spacing={1} justifyContent='start'>
//               <p>{item.name}</p>
//               <p>{item.price}</p>
//               <p>{item.updatedAt}</p>
//             </Stack>
//           </Stack>
//           <div style={{ display: 'inline-flex', justifyContent: 'flex-end' }}>

//             <Button size='small' variant="outlined" style={{ borderColor: 'red', marginRight: 4, boxShadow: ' rgba(0, 0, 0, 0.24) 0px 3px 8px ' }}
//               onClick={() => {
//                 navigate(`/edit/post/${item.id}`)
//               }}>
//               {/* <EditIcon style={{ paddingRight: 4 }} /> */}
//               Edit
//             </Button>
//             <Button size='small' variant="outlined" style={{ borderColor: 'red', marginRight: 4, boxShadow: ' rgba(0, 0, 0, 0.24) 0px 3px 8px ' }}
//               onClick={() => {
//                 console.log(item.id);
//                 // hidePostByPostId(item.id, 4)
//                 // setHidePost(!hidePost)
//               }}
//             >
//               {/* <VisibilityOffOutlinedIcon style={{ paddingRight: 4 }} /> */}
//               Hide
//             </Button>
//           </div>
//         </Stack>
//       </Paper>
//     )
//   })
// }