
import { Badge, Button, Divider, Fade, Grid, InputBase, makeStyles, Menu, MenuItem, styled, TextField } from '@material-ui/core'
import { Search } from '@mui/icons-material'
import { Autocomplete } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import MySearchBar from './MySearchBar'
import { useNavigate } from 'react-router-dom'
import useWindowDimensions from '../../helps/useWindowDimensions'
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ChatIcon from '@mui/icons-material/Chat';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HomeIcon from '@mui/icons-material/Home';
import { alpha } from '@mui/material/styles';
// import { Menu } from '@mui/material/Menu';
import AdbIcon from '@mui/icons-material/Adb';


const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const useStyles = makeStyles((theme) => ({
    make_position: {
        backgroundColor: '#7b35ba',
        position: "fixed",
        top: 0,
        // right: 0,
        // left: 0,
        width: '100%',
        zIndex: 100,

        // width: '100%'
    },

    menu_cus: {
        paddingTop: 8,
        flexDirection: 'column',
        display: 'flex',
    }

}));






function MyHeader() {
    const classes = useStyles();

    const navigate = useNavigate();

    const handleBtnChat = () => {
        navigate('/chat')
    }

    const handBtnHome = () => {
        navigate('/')
    }

    ///////////////////////

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



    return (
        <Grid container justifyContent='center'>
            <Grid item xs={12}>
                <div className={classes.make_position} >
                    <Grid container justifyContent='center'>
                        <Grid item xs={8}>
                            <div className={classes.menu_cus}>
                                <div style={{ display: 'inline-flex', justifyContent: 'space-between' }}>
                                    <div onClick={() => { navigate('/') }} style={{ maxWidth: 200, maxHeight: 56, marginRight: 24, cursor: "pointer" }}>
                                        <img src='logo.png' alt="W3Schools.com" style={{ width: 150, height: 40 }} />
                                    </div>

                                    <div>
                                        <Button onClick={() => { handBtnHome() }} size='small' >
                                            <HomeIcon />
                                            <Box width={4}></Box>
                                            Home
                                        </Button>
                                    </div>

                                    <div >
                                        <Button size='small' onClick={() => { navigate('/managePosting') }}  >
                                            <FormatListBulletedIcon />
                                            <Box width={4}></Box>
                                            <div>  Manage postting</div>
                                        </Button>
                                    </div>

                                    <div >
                                        <Button onClick={() => { handleBtnChat() }} size='small' >
                                            <ShoppingBagIcon />
                                            <Box width={4}></Box>
                                            Order
                                        </Button>
                                    </div>

                                    <div >

                                        <Button onClick={() => { handleBtnChat() }} size='small'  >
                                            <ChatIcon />
                                            <Box width={4}></Box>
                                            Chat
                                        </Button>

                                    </div>

                                    <div >
                                        <Button onClick={() => { handleBtnChat() }} size='small' >
                                            <Badge badgeContent={4} color="secondary">
                                                <NotificationsIcon />
                                            </Badge>

                                        </Button>
                                    </div>
                                    <div >
                                        {/* <Button onClick={() => { handleBtnChat() }} size='small' >
                                            <ExpandMoreIcon />
                                            <Box width={4}></Box>
                                            More
                                        </Button> */}


                                        <div>
                                            <Button

                                                id="fade-button"
                                                aria-controls={open ? 'fade-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                            >
                                                More  <ExpandMoreIcon />
                                            </Button>
                                            <Menu
                                                id="fade-menu"
                                                MenuListProps={{
                                                    'aria-labelledby': 'fade-button',
                                                }}
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                TransitionComponent={Fade}
                                            >
                                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                                            </Menu>
                                        </div>



                                    </div>

                                </div>
                                <MySearchBar></MySearchBar>
                            </div>
                        </Grid >
                    </Grid >
                </div>
            </Grid>

        </Grid>

    )
}

export default MyHeader