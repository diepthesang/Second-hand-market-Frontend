import { Avatar, Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { Stack } from '@mui/system'
import React from 'react'
import useWindowDimensions from '../helps/useWindowDimensions';
import { Button } from '@mui/material/Button';
import { Paper } from '@mui/material';



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
        backgroundColor: '#F1ECF5', display: 'flex', flexWrap: 'wrap', justifyContent: "flex-start", alignItems: "flex-start", height: 245, overflow: 'scroll', scrollbarColor: '#7b35ba', position: 'relative',
    },

    img_cus: {
        width: 100,
        height: 100,
        borderRadius: 16,
        paddingTop: 4
    }



}));

function MyCategory() {
    const { height, width } = useWindowDimensions();
    const classes = useStyles();


    return (
        <div className={classes.category}>
            <Stack>
                <Typography style={{ color: '#7b35ba', margin: 10 }} color='#7b35ba' variant='h6' align='left'>Category</Typography>

                <div style={{ display: 'inline-flex' }} className='cate' onClick={() => { console.log('the div') }}>
                    <div className={classes.paper_cus}  >
                        <div className='hover'>
                            <Stack direction='column' alignItems='center'>
                                <img src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2' className={classes.img_cus} />
                                <Typography className={classes.typography_cus} >Thiet bi dien tu Thiet bi dien tu thiet bi dien tu</Typography>
                            </Stack>
                        </div>
                    </div>
                    <div className={classes.paper_cus}  >
                        <Stack direction='column' alignItems='center'>
                            <img src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2' style={{
                                width: 100,
                                height: 100,
                                borderRadius: 16,
                            }} />
                            <Typography className={classes.typography_cus} >Thiet bi dien tu
                                thiet bi dien tu</Typography>
                        </Stack>
                    </div>
                    <div className={classes.paper_cus}  >
                        <Stack direction='column' alignItems='center'>
                            <img src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2' style={{
                                width: 100,
                                height: 100,
                                borderRadius: 16,
                            }} />
                            <Typography className={classes.typography_cus} >Thiet bi dien tu
                                thiet bi dien tu</Typography>
                        </Stack>
                    </div>
                    <div className={classes.paper_cus}  >
                        <Stack direction='column' alignItems='center'>
                            <img src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2' style={{
                                width: 100,
                                height: 100,
                                borderRadius: 16,
                            }} />
                            <Typography className={classes.typography_cus} >Thiet bi dien tu
                                thiet bi dien tu</Typography>
                        </Stack>
                    </div>
                    <div className={classes.paper_cus}  >
                        <Stack direction='column' alignItems='center'>
                            <img src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2' style={{
                                width: 100,
                                height: 100,
                                borderRadius: 16,
                            }} />
                            <Typography className={classes.typography_cus} >Thiet bi dien tu
                                thiet bi dien tu</Typography>
                        </Stack>
                    </div>
                    <div className={classes.paper_cus}  >
                        <Stack direction='column' alignItems='center'>
                            <img src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2' style={{
                                width: 100,
                                height: 100,
                                borderRadius: 16,
                            }} />
                            <Typography className={classes.typography_cus} >Thiet bi dien tu
                                thiet bi dien tu</Typography>
                        </Stack>
                    </div>
                    <div className={classes.paper_cus}  >
                        <Stack direction='column' alignItems='center'>
                            <img src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2' style={{
                                width: 100,
                                height: 100,
                                borderRadius: 16,
                            }} />
                            <Typography className={classes.typography_cus} >Thiet bi dien tu
                                thiet bi dien tu</Typography>
                        </Stack>
                    </div>
                    <div className={classes.paper_cus}  >
                        <Stack direction='column' alignItems='center'>
                            <img src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2' style={{
                                width: 100,
                                height: 100,
                                borderRadius: 16,
                            }} />
                            <Typography className={classes.typography_cus} >Thiet bi dien tu
                                thiet bi dien tu</Typography>
                        </Stack>
                    </div>
                    <div className={classes.paper_cus}  >
                        <Stack direction='column' alignItems='center'>
                            <img src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2' style={{
                                width: 100,
                                height: 100,
                                borderRadius: 16,
                            }} />
                            <Typography className={classes.typography_cus} >Thiet bi dien tu
                                thiet bi dien tu</Typography>
                        </Stack>
                    </div>
                    <div className={classes.paper_cus}  >
                        <Stack direction='column' alignItems='center'>
                            <img src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2' style={{
                                width: 100,
                                height: 100,
                                borderRadius: 16,
                            }} />
                            <Typography className={classes.typography_cus} >Thiet bi dien tu
                                thiet bi dien tu</Typography>
                        </Stack>
                    </div>

                </div>
            </Stack>
        </div>


    )
}

export default MyCategory