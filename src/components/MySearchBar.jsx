import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Stack } from '@mui/material';
import { Button } from '@material-ui/core';

const Search = styled('div')(({ theme }) => ({
    height: 35,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    color: '#7b35ba',
    // backgroundColor: alpha(theme.palette.common.white, 0.15),
    backgroundColor: 'white',
    '&:hover': {
        // backgroundColor: alpha(theme.palette.common.white, 0.25),

    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    // height: 20,
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    height: 35,
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            // dai cua thanh searhc
            width: '60ch',
        },
    },
}));

export default function MySearchBar() {
 

    return (
        <Box display='space-around' paddingBottom={1}  >
            <Stack direction='row' justifyContent='space-between' marginRight={3} >
                <Search className=''>
                    <SearchIconWrapper>
                        <SearchIcon style={{ fill: '#7b35ba' }} />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>

                {/* <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton> */}
                <Button style={{ width: 150, height: 35, backgroundImage: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)' }} color='#ffff' variant='contained' size='small'>
                    Post
                </Button>
            </Stack>
        </Box >
        // { renderMobileMenu }
        // { renderMenu }
        // </Box>
    );
}

// background - color: #4158D0;
// background - image: linear - gradient(43deg, #4158D0 0 %, #C850C0 46 %, #FFCC70 100 %);
