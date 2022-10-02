import { Avatar, Grid, makeStyles } from '@material-ui/core'
import { Paper, Stack, Typography } from '@mui/material'
import { red } from '@mui/material/colors';
import { width } from '@mui/system';
import React from 'react'
import useWindowDimensions from '../helps/useWindowDimensions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const useStyles = makeStyles((theme) => ({
    // root: {
    //     flexGrow: 1,
    // },
    // paper: {
    //     padding: theme.spacing(10),
    //     textAlign: 'center',
    //     color: theme.palette.text.secondary,
    // },

    paper_cus: {
        cursor: 'pointer',
        margin: 2,
        paddingTop: 2,
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
function MyListProduct() {
    const classes = useStyles();
    const { height, width } = useWindowDimensions();


    return (
        <Stack spacing={2} bgcolor='#F1ECF5' paddingBottom={1} >
            <Typography style={{ color: '#7b35ba', margin: 8 }}>
                Products for you
            </Typography>
            <Grid container alignItems='flex-start'>
                <Grid item xs={2} sm={2} >
                    <div className='hover' onClick={() => { console.log('the div') }}>
                        <Paper className={classes.paper_cus}  >
                            <Stack direction='column' alignItems='center' >
                                <div style={{ paddingTop: 8, position: "relative" }}>
                                    <Avatar variant={"rounded"} alt="The image" src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2' style={{
                                        width: width / 11,
                                        height: width / 11,
                                    }} />
                                    <ThumbUpIcon className={classes.iconHeart_cus} color='action' />
                                </div>
                                <p className={classes.title_cus} >Thiet bi dien tu Thiet bi dien tu</p>
                                <p className={classes.price_cus}>2900000 đ</p>
                                <div style={{ display: 'inline-flex', justifyContent: 'flex-start' }}>
                                    <div style={{ marginBottom: 8, display: 'block' }}>
                                        <img src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2'
                                            className={classes.avt_cus} />
                                    </div>
                                    <div style={{ display: 'inline-flex', marginLeft: 4, paddingTop: 4 }}>
                                        <p className={classes.address_cus}>23 Giờ Trước</p>
                                        <p className={classes.address_cus}>-</p>
                                        <p className={classes.address_cus}>Hà Nội</p>
                                    </div>
                                </div>

                            </Stack>
                        </Paper>
                    </div>
                </Grid>

                <Grid item xs={2} xm={2}>
                    <div className='hover' onClick={() => { console.log('the div') }}>
                        <Paper className={classes.paper_cus}  >
                            <Stack direction='column' alignItems='center' >
                                <div style={{ paddingTop: 8, position: "relative" }}>
                                    <Avatar variant={"rounded"} alt="The image" src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2' style={{
                                        width: width / 11,
                                        height: width / 11,
                                    }} />
                                    <ThumbUpIcon className={classes.iconHeart_cus} color='action' />
                                </div>
                                <p className={classes.title_cus} >Thiet bi dien tu Thiet bi dien tu</p>
                                <p className={classes.price_cus}>2900000 đ</p>
                                <div style={{ display: 'inline-flex', justifyContent: 'flex-start' }}>
                                    <div style={{ marginBottom: 8, display: 'block' }}>
                                        <img src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2'
                                            className={classes.avt_cus} />
                                    </div>
                                    <div style={{ display: 'inline-flex', marginLeft: 4, paddingTop: 4 }}>
                                        <p className={classes.address_cus}>23 Giờ Trước</p>
                                        <p className={classes.address_cus}>-</p>
                                        <p className={classes.address_cus}>Hà Nội</p>
                                    </div>
                                </div>

                            </Stack>
                        </Paper>
                    </div>
                </Grid>

                <Grid item xs={2} xm={2}>
                    <div className='hover' onClick={() => { console.log('the div') }}>
                        <Paper className={classes.paper_cus}  >
                            <Stack direction='column' alignItems='center' >
                                <div style={{ paddingTop: 8, position: "relative" }}>
                                    <Avatar variant={"rounded"} alt="The image" src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2' style={{
                                        width: width / 11,
                                        height: width / 11,
                                    }} />
                                    <ThumbUpIcon className={classes.iconHeart_cus} color='action' />
                                </div>
                                <p className={classes.title_cus} >Thiet bi dien tu Thiet bi dien tu</p>
                                <p className={classes.price_cus}>2900000 đ</p>
                                <div style={{ display: 'inline-flex', justifyContent: 'flex-start' }}>
                                    <div style={{ marginBottom: 8, display: 'block' }}>
                                        <img src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2'
                                            className={classes.avt_cus} />
                                    </div>
                                    <div style={{ display: 'inline-flex', marginLeft: 4, paddingTop: 4 }}>
                                        <p className={classes.address_cus}>23 Giờ Trước</p>
                                        <p className={classes.address_cus}>-</p>
                                        <p className={classes.address_cus}>Hà Nội</p>
                                    </div>
                                </div>

                            </Stack>
                        </Paper>
                    </div>
                </Grid>

                <Grid item xs={2} xm={2}>
                    <div className='hover' onClick={() => { console.log('the div') }}>
                        <Paper className={classes.paper_cus}  >
                            <Stack direction='column' alignItems='center' >
                                <div style={{ paddingTop: 8, position: "relative" }}>
                                    <Avatar variant={"rounded"} alt="The image" src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2' style={{
                                        width: width / 11,
                                        height: width / 11,
                                    }} />
                                    <ThumbUpIcon className={classes.iconHeart_cus} color='action' />
                                </div>
                                <p className={classes.title_cus} >Thiet bi dien tu Thiet bi dien tu</p>
                                <p className={classes.price_cus}>2900000 đ</p>
                                <div style={{ display: 'inline-flex', justifyContent: 'flex-start' }}>
                                    <div style={{ marginBottom: 8, display: 'block' }}>
                                        <img src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2'
                                            className={classes.avt_cus} />
                                    </div>
                                    <div style={{ display: 'inline-flex', marginLeft: 4, paddingTop: 4 }}>
                                        <p className={classes.address_cus}>23 Giờ Trước</p>
                                        <p className={classes.address_cus}>-</p>
                                        <p className={classes.address_cus}>Hà Nội</p>
                                    </div>
                                </div>

                            </Stack>
                        </Paper>
                    </div>
                </Grid>

                <Grid item xs={2} xm={2}>
                    <div className='hover' onClick={() => { console.log('the div') }}>
                        <Paper className={classes.paper_cus}  >
                            <Stack direction='column' alignItems='center' >
                                <div style={{ paddingTop: 8, position: "relative" }}>
                                    <Avatar variant={"rounded"} alt="The image" src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2' style={{
                                        width: width / 11,
                                        height: width / 11,
                                    }} />
                                    <ThumbUpIcon className={classes.iconHeart_cus} color='action' />
                                </div>
                                <p className={classes.title_cus} >Thiet bi dien tu Thiet bi dien tu</p>
                                <p className={classes.price_cus}>2900000 đ</p>
                                <div style={{ display: 'inline-flex', justifyContent: 'flex-start' }}>
                                    <div style={{ marginBottom: 8, display: 'block' }}>
                                        <img src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2'
                                            className={classes.avt_cus} />
                                    </div>
                                    <div style={{ display: 'inline-flex', marginLeft: 4, paddingTop: 4 }}>
                                        <p className={classes.address_cus}>23 Giờ Trước</p>
                                        <p className={classes.address_cus}>-</p>
                                        <p className={classes.address_cus}>Hà Nội</p>
                                    </div>
                                </div>

                            </Stack>
                        </Paper>
                    </div>
                </Grid>

                <Grid item xs={2} xm={2}>
                    <div className='hover' onClick={() => { console.log('the div') }}>
                        <Paper className={classes.paper_cus}  >
                            <Stack direction='column' alignItems='center' >
                                <div style={{ paddingTop: 8, position: "relative" }}>
                                    <Avatar variant={"rounded"} alt="The image" src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2' style={{
                                        width: width / 11,
                                        height: width / 11,
                                    }} />
                                    <ThumbUpIcon className={classes.iconHeart_cus} color='action' />
                                </div>
                                <p className={classes.title_cus} >Thiet bi dien tu Thiet bi dien tu</p>
                                <p className={classes.price_cus}>2900000 đ</p>
                                <div style={{ display: 'inline-flex', justifyContent: 'flex-start' }}>
                                    <div style={{ marginBottom: 8, display: 'block' }}>
                                        <img src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2'
                                            className={classes.avt_cus} />
                                    </div>
                                    <div style={{ display: 'inline-flex', marginLeft: 4, paddingTop: 4 }}>
                                        <p className={classes.address_cus}>23 Giờ Trước</p>
                                        <p className={classes.address_cus}>-</p>
                                        <p className={classes.address_cus}>Hà Nội</p>
                                    </div>
                                </div>

                            </Stack>
                        </Paper>
                    </div>
                </Grid>

                <Grid item xs={2} xm={2}>
                    <div className='hover' onClick={() => { console.log('the div') }}>
                        <Paper className={classes.paper_cus}  >
                            <Stack direction='column' alignItems='center' >
                                <div style={{ paddingTop: 8, position: "relative" }}>
                                    <Avatar variant={"rounded"} alt="The image" src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2' style={{
                                        width: width / 11,
                                        height: width / 11,
                                    }} />
                                    <ThumbUpIcon className={classes.iconHeart_cus} color='action' />
                                </div>
                                <p className={classes.title_cus} >Thiet bi dien tu Thiet bi dien tu</p>
                                <p className={classes.price_cus}>2900000 đ</p>
                                <div style={{ display: 'inline-flex', justifyContent: 'flex-start' }}>
                                    <div style={{ marginBottom: 8, display: 'block' }}>
                                        <img src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2'
                                            className={classes.avt_cus} />
                                    </div>
                                    <div style={{ display: 'inline-flex', marginLeft: 4, paddingTop: 4 }}>
                                        <p className={classes.address_cus}>23 Giờ Trước</p>
                                        <p className={classes.address_cus}>-</p>
                                        <p className={classes.address_cus}>Hà Nội</p>
                                    </div>
                                </div>

                            </Stack>
                        </Paper>
                    </div>
                </Grid>

                <Grid item xs={2} xm={2}>
                    <div className='hover' onClick={() => { console.log('the div') }}>
                        <Paper className={classes.paper_cus}  >
                            <Stack direction='column' alignItems='center' >
                                <div style={{ paddingTop: 8, position: "relative" }}>
                                    <Avatar variant={"rounded"} alt="The image" src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2' style={{
                                        width: width / 11,
                                        height: width / 11,
                                    }} />
                                    <ThumbUpIcon className={classes.iconHeart_cus} color='action' />
                                </div>
                                <p className={classes.title_cus} >Thiet bi dien tu Thiet bi dien tu</p>
                                <p className={classes.price_cus}>2900000 đ</p>
                                <div style={{ display: 'inline-flex', justifyContent: 'flex-start' }}>
                                    <div style={{ marginBottom: 8, display: 'block' }}>
                                        <img src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2'
                                            className={classes.avt_cus} />
                                    </div>
                                    <div style={{ display: 'inline-flex', marginLeft: 4, paddingTop: 4 }}>
                                        <p className={classes.address_cus}>23 Giờ Trước</p>
                                        <p className={classes.address_cus}>-</p>
                                        <p className={classes.address_cus}>Hà Nội</p>
                                    </div>
                                </div>

                            </Stack>
                        </Paper>
                    </div>
                </Grid>




            </Grid>
        </Stack >
    )
}

export default MyListProduct