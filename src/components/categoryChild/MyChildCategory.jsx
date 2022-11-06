import { makeStyles, Typography } from '@material-ui/core';
import { Stack } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCategoryChildId } from '../../redux/categorySlice'


const useStyles = makeStyles((theme) => ({

  paper_cus: {
    cursor: 'pointer',
    width: 112,
    height: 'auto',
    marginLeft: 12,
    marginRight: 12,
    borderRadius: 12,
    marginTop: 5
  },

  typography_cus: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
    color: 'black',
  },

  category: {
    backgroundColor: '#F1ECF5',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: "center",
    alignItems: "flex-start",
    height: 160,
    overflow: 'scroll',
    scrollbarColor: '#7b35ba',
    position: 'relative',
  },

  img_cus: {
    width: 100,
    height: 100,
    borderRadius: 16,
    paddingTop: 4
  }



}));

function MyChildCategory(id) {

  const classes = useStyles();
  const [cateArr, setCateArr] = useState([]);
  const { categoryParentId } = useParams()
  const dispatch = useDispatch()

  const getDataCateParent = async () => {
    const { data } = await axios.get(`/common/categoryParent/${categoryParentId}/allCategoryChild`)
    setCateArr(data.data)
  }



  useEffect(
    () => {
      getDataCateParent()
    }, []
  )
  return (
    <div className={classes.category}>
      <Stack>
        {/* <Typography style={{ color: '#7b35ba', margin: 10 }} color='#7b35ba' variant='h6' align='left'>Category</Typography> */}

        <div style={{ display: 'inline-flex' }} className='cate'>
          {cateArr.map(item => {
            return (
              <div key={item.id} className={classes.paper_cus} onClick={() => {
                dispatch(getCategoryChildId(item.id));
              }} >
                <Stack direction='column' alignItems='center'>
                  {/* <div className='hover'> */}
                  <img alt='' src={item.cateLogoImg} style={{
                    width: 80,
                    height: 80,
                    borderRadius: 12,
                    boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",

                  }} />
                  {/* </div> */}
                  <Typography className={classes.typography_cus} >
                    {item.cateName}
                  </Typography>
                </Stack>
              </div>
            )
          })}

        </div>
      </Stack>
    </div>
  )
}

export default MyChildCategory