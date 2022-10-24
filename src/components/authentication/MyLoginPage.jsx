import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Alert } from '@mui/material';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function MyLogin() {
    const [isError, setIsError] = React.useState();
    const [errMsg, setErrMsg] = React.useState()


    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });

        try {
            const res = await axios.post('/auth/login', {
                email: data.get('email'),
                password: data.get('password'),
            })

            if (res.data.codeMessage === 'SUCCESS') {
                localStorage.setItem('access_token', res.headers.authorization)
                navigate('/')
            }

        } catch (error) {
            console.log(error)
            console.log(error.response.data.codeMessage)
            if (error.response.data.codeMessage) {
                setIsError(true)
                setErrMsg(error.response.data.message)
            }
        }
    };

    const checkIsLogin = async () => {
        if (localStorage['access_token'] !== undefined) {
            navigate('/')
        } else {
            navigate('/login')
        }
    }

    React.useEffect(
        () => {
            checkIsLogin()
        }, []
    )

    return (
        <ThemeProvider theme={theme}>
            <Grid container justifyContent='center' component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        // backgroundImage: 'url(https://rumage.com/wp-content/uploads/2020/08/second-hand-2353682_1920.png)',
                        backgroundImage: 'url(logo-login.png)',
                        backgroundRepeat: 'no-repeat',
                        // backgroundColor: (t) =>
                        //     t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundPosition: 'center',
                        backgroundSize: 800,
                        backgroundColor: "white"
                    }}
                >
                    <div style={{ color: 'red', width: 200, height: 50 }}>
                        <img alt='' width={600} height={100} src='logo.png'></img>
                    </div>
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        {isError && <Alert variant="filled" severity="error">{errMsg}</Alert>}

                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2" onClick={() => { navigate('/register') }}>
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}