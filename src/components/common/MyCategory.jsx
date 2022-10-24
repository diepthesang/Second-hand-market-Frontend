import { makeStyles, Typography } from '@material-ui/core'
import { Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { getCategoryChildId } from '../../redux/categorySlice'
import { useNavigate } from 'react-router-dom';




const useStyles = makeStyles((theme) => ({

    paper_cus: {
        cursor: 'pointer',
        width: 112,
        height: 'auto',
        marginLeft: 12,
        marginRight: 12,
        borderRadius: 12,
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
        justifyContent: "flex-start",
        alignItems: "flex-start",
        height: 245,
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

function MyCategory() {
    // const {  width } = useWindowDimensions();
    const classes = useStyles();
    const [cateArr, setCateArr] = useState([]);

    const dispatch = useDispatch()
    const navigate = useNavigate()



    const getDataCate = async () => {
        const { data } = await axios.get('common/allCategoryParent')
        setCateArr(data.data)
    }



    useEffect(
        () => {
            getDataCate()
        }, []
    )


    return (
        <div className={classes.category}>
            <Stack>
                <Typography style={{ color: '#7b35ba', margin: 10 }} color='#7b35ba' variant='h6' align='left'>Category</Typography>

                <div style={{ display: 'inline-flex' }} className='cate' onClick={() => { }}>
                    {cateArr.map(item => {
                        return (
                            <div className={classes.paper_cus}
                                onClick={() => {
                                    dispatch(getCategoryChildId(item.id));
                                    navigate(`/category/${item.id}`)
                                }} >
                                <Stack direction='column' alignItems='center'>
                                    <img alt='' src='http://localhost:8080/src/public/upload/1666023076868-873403902-logo-login.jpg' style={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: 16,
                                    }} />
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

export default MyCategory