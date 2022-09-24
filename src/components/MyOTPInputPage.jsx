
import OtpInput from "react-otp-input";
// import OTPInput, { ResendOTP } from "otp-input-react";
// import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useEffect, useState } from "react";
import axios from "axios";

// import "./styles.css";
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  grid: {
    backgroundColor: "grey",
    height: "50vh",
    textAlign: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

export default function MyOTPInputPage() {
  const classes = useStyles();
  const theme = useTheme();

  const navigate = useNavigate();

  const [OTP, setOTP] = useState()

  const sendOTP = async () => {
    let res = await axios.post('http://localhost:8080/auth/sent_otp', {
      otp: OTP
    });
    if (res) {
      navigate('/login')
      alert('dang ky thanh cong')
    }
  }



  useEffect(() => {
    console.log("The current value of the input: ", OTP);
  }, [OTP]);
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid
          container
          style={{ backgroundColor: "white" }}
          className={classes.grid}
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item container justifyContent="center">
            <Grid item container alignItems="center" direction="column">
              <Grid item>
                <Avatar className={classes.avatar}>
                  {/* <LockOutlinedIcon /> */}
                </Avatar>
              </Grid>
              <Grid item>
                <Typography component="h1" variant="h5">
                  Verification Code
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} textalign="center">
            <Paper elevation={0}>
              <Typography variant="h6">
                Please enter the verification code sent to your mobile
              </Typography>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            <Grid item spacing={3} container justifyContent="center">
              <OtpInput
                onChange={setOTP}
                value={OTP}
                separator={
                  <span>
                    <strong>.</strong>
                  </span>
                }
                isInputNum={true}
                numInputs={6}
                inputStyle={{
                  width: "3rem",
                  height: "3rem",
                  margin: "0 1rem",
                  fontSize: "2rem",
                  borderRadius: 4,
                  border: "1px solid rgba(0,0,0,0.3)"
                }}
              />
            </Grid>
            <Grid item>
              <Button
                onClick={() => { sendOTP() }}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Verify
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
