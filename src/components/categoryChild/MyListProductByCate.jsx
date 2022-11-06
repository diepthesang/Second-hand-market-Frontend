import { Avatar, FormControl, Grid, makeStyles, MenuItem, Select } from '@material-ui/core'
import { Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import axios from 'axios';
import useWindowDimensions from '../../helps/useWindowDimensions';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPostId } from '../../redux/postSlice'
import { FamilyRestroomRounded } from '@mui/icons-material';
import { getLikePost } from '../../redux/likePostSlice';



const useStyles = makeStyles((theme) => ({

  paper_cus: {
    cursor: 'pointer',
    margin: 2,
    paddingTop: 2,
    height: 280
  },

  title_cus: {
    // textAlign: 'left',
    marginTop: 4,
    color: 'black',
    marginLeft: 10,
    marginRight: 10,
    fontSize: 14,


  },

  price_cus: {
    color: 'red',
    fontWeight: 'bold',
  },

  avt_cus: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  address_cus: {
    color: 'black',
    fontWeight: 'inherit',
    fontSize: 10,

  },

  iconHeart_cus: {
    color: 'blue',
    // backgroundColor: 'red',
    position: 'absolute',
    bottom: 5,
    right: 5,
    zIndex: 10,

  }
}));







function MyListProductByCate({ listPost }) {
  const classes = useStyles();
  const { width } = useWindowDimensions();
  const [listProduct, setListProduct] = useState([]);
  const [pageURL, setPageURL] = useState(0);
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const categoryChildId = useSelector((state) => state.categoryChildId.categoryChildId)
  // const _like = useSelector((state) => state.likePost.likePost)

  const getListProductByCategoryChildId = async () => {
    try {
      const { data } = await axios.get(`/common/categoryChild/${categoryChildId}/post`)
      setListProduct(data.data)
      console.log(data.data)
    } catch (error) {
      console.log(error);
    }
  }

  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  console.log('listPostforList::::', listPost);
  // setListProduct(listPost)


  // useEffect(() => {
  //     setListProduct(listPost)
  // }, [])

  useEffect(
    () => {
      getListProductByCategoryChildId();
    }, [categoryChildId]
  )




  return (
    <div>
      <div>
        <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
          {/* <InputLabel id="demo-select-small">Age</InputLabel> */}
          <Select
            // color='red'
            labelId="demo-select-small"
            id="demo-select-small"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>


      <Stack spacing={2} bgcolor='#F1ECF5' paddingBottom={1} >
        <Typography style={{ color: '#7b35ba', margin: 8 }}>
          Products for you
        </Typography>
        <Grid container alignItems='flex-start'>
          {listProduct.map(item => {
            return (
              <Grid key={item.id} item xs={2} sm={2} >
                <div onClick={() => {
                  navigate(`/post/${item.id}`)
                  dispatch(getPostId(item.id))
                }} className='hover'>
                  <Paper className={classes.paper_cus}  >
                    <Stack direction='column' alignItems='center' >
                      <div style={{ paddingTop: 8, position: "relative" }}>
                        <Avatar variant={"rounded"} src={`http://localhost:8080/${item.image.imagePath}`} alt="The image" style={{
                          width: width / 11,
                          height: width / 11,
                        }} />
                        <div
                        >
                          {item.liked ? <ThumbUpIcon className={classes.iconHeart_cus} />
                            :
                            <ThumbUpIcon className={classes.iconHeart_cus} style={{ fill: 'white' }} />}
                        </div>

                      </div>
                      <p className={classes.title_cus} >{item.title}</p>
                      <p className={classes.price_cus}>{item.price} đ</p>
                      <div style={{ display: 'inline-flex', justifyContent: 'flex-start' }}>
                        <div style={{ marginBottom: 8, display: 'block' }}>
                          <img alt='' src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2'
                            className={classes.avt_cus} />
                        </div>
                        <div style={{ display: 'inline-flex', marginLeft: 4, paddingTop: 4 }}>
                          <p className={classes.address_cus}>23 Giờ Trước</p>
                          <p className={classes.address_cus}>-</p>
                          <p className={classes.address_cus}>{item.province}</p>
                          {/* <p className={classes.address_cus}>{item.ListImageProducts.proImg}</p> */}
                          {/* <p className={classes.address_cus}>{pageURL}</p> */}
                        </div>
                      </div>

                    </Stack>
                  </Paper>
                </div>
              </Grid>
            )
          })
          }
        </Grid>
      </Stack >

    </div>

  )
}

export default MyListProductByCate