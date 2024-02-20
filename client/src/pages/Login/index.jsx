import React, { useState, useEffect } from "react";
import styles from "./login.module.css";
import {
  TextField,
  FormControl,
  Typography,
  InputAdornment,
  Fab,
  Divider,
} from "@mui/material";
import Logo from "../../assets/svg/logo.js";
import { Box } from "@mui/system";
import { Link } from "@mui/material";
import footer_logo from "../../assets/images/footer_logo.png";
import { useDispatch, useSelector } from "react-redux";
import { login_reducer } from "../../store/";
import { login } from "../../store/LoginSlice/LoginThunk";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.login_reducer);
  const [error, setError] = useState({
    email: false,
    password: false,
    show_password: false,
  });
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const handleClickShowPassword = () => {
    setError((pre) => ({ ...pre, show_password: !pre.show_password }));
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const status = useSelector((state) => state.login_reducer);
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  function reset_err(){
    setError((pre)=>({ ...pre, email: false, password: false }));
 }
 
 function check_email(){
   if (data.email === "" || !validateEmail(data.email)) 
       setError((pre)=>({ ...pre, email: true }));
   else  setError((pre)=>({ ...pre, email: false }));
 }
 
 function check_password(){
   if (data.password === "" || data.password.length < 6) 
       setError((pre)=>({ ...pre, password: true }));
   else  setError((pre)=>({ ...pre, password: false }));
   }
 
   const HandleSubmit = async () => {
   reset_err();
   check_email();
   check_password();
   if (error.email || error.password) {
     return;
   }
    await dispatch(login(data));
  };
  useEffect(() => {
    if (status.error) {
      setError((pre)=>({ ...pre, email: true, password: true }));
    } else {
      setError((pre)=>({ ...pre, email: false, password: false }));
    }
    console.log("status: ", status);
  }, [status]);

  useEffect(() => {

    if (status.token) {
      navigate("/feed");
    }
  }, [status]);
  return (
    <Box className={styles.root}>
      <Box className={styles.logo}>
        <Logo />
      </Box>
      <Box className={styles.box_wraper}>
        <Box className={styles.box}>
          <Typography className={styles.title}>Sign in</Typography>
          <Typography className={styles.title2}>
            Stay updated on your professional world
          </Typography>
          <FormControl className={styles.form}>
            <TextField
              id="filled-error-helper-text"
              label="Email or Phone"
              value={data.email}
              className={styles.login_inputs}
              error={error.email}
              helperText={error.email ? "Invalid Email" : ""}
              variant="filled"
              onChange={(e) => setdata({ ...data, email: e.target.value })}
            />
            <TextField
              label="Password"
              className={styles.login_inputs}
              id="filled-start-adornment-helper-text"
              variant="filled"
              value={data.password}
              onChange={(e) => setdata({ ...data, password: e.target.value })}
              type={error.show_password ? "text" : "password"}
              error={error.password}
              helperText={error.password ? "Invalid password" : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="center"
                    className={styles.show_btn_wrap}
                  >
                    <Fab
                      className={`${styles.show_btn} show_btn`}
                      variant="extended"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {error.show_password ? "Hide" : "Show"}
                    </Fab>
                  </InputAdornment>
                ),
              }}
            />
            <Fab className={styles.forget_password} variant="extended">
              Forgot Password?
            </Fab>
            <Fab
              className={styles.sign_in_btn}
              variant="extended"
              onClick={HandleSubmit}
            >
              Sign in
            </Fab>
          </FormControl>
          <Box>
            <Divider variant="middle" className={styles.divider}>
              {" "}
              or{" "}
            </Divider>
            <Typography className={styles.txt_oauth_text}>
              By clicking Continue, you agree to LinkedIn’s{" "}
              <Link className={styles.policy_links}>User Agreement</Link>,
              <Link className={styles.policy_links}> Privacy Policy</Link>, and{" "}
              <Link className={styles.policy_links}>Cookie Policy</Link>.
            </Typography>
            <Box className={styles.oauth_btn}>
              <Fab variant="extended" className={styles.oauth_btn_google}>
                <img
                  src="https://img.icons8.com/color/48/000000/google-logo.png"
                  alt="google"
                />
                Continue with Google
              </Fab>
              <Fab variant="extended" className={styles.oauth_btn_google}>
                <img
                  src="https://img.icons8.com/material-outlined/24/mac-os--v2.png"
                  alt="google"
                />
                Sign in with Apple
              </Fab>
              <Fab variant="extended" className={styles.oauth_btn_google}>
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.32 14.35C10.27 14.35 9.21 13.95 8.41 13.16L7.87 12.62C7.48 12.23 7.48 11.6 7.87 11.21C8.26 10.82 8.89 10.82 9.28 11.21L9.81 11.75C10.64 12.57 11.98 12.57 12.81 11.75L17.13 7.47003C17.68 6.92003 17.99 6.19003 17.99 5.41003C17.99 4.63003 17.69 3.90003 17.13 3.35003C16.02 2.25003 14.21 2.25003 13.1 3.35003L11.48 4.96003C11.09 5.35003 10.46 5.35003 10.07 4.96003C9.68 4.57003 9.68 3.94003 10.07 3.55003L11.69 1.94003C13.57 0.0600293 16.65 0.0600293 18.54 1.94003C19.47 2.87003 19.99 4.10003 19.99 5.42003C19.99 6.74003 19.48 7.98003 18.54 8.90003L14.22 13.18C13.42 13.98 12.37 14.37 11.31 14.37L11.32 14.35ZM8.3 19.1L9.92 17.49C10.31 17.1 10.31 16.47 9.92 16.08C9.53 15.69 8.9 15.69 8.51 16.08L6.89 17.69C5.78 18.8 3.97 18.8 2.86 17.69C2.31 17.14 2 16.41 2 15.63C2 14.85 2.3 14.12 2.86 13.57L7.18 9.29003C8.01 8.47003 9.35 8.47003 10.18 9.29003L10.71 9.82003C11.1 10.21 11.73 10.21 12.12 9.82003C12.51 9.43003 12.51 8.80003 12.12 8.41003L11.58 7.87003C9.98 6.28003 7.37 6.28003 5.76 7.87003L1.45 12.13C0.52 13.06 0 14.29 0 15.61C0 16.93 0.51 18.17 1.45 19.09C2.39 20.03 3.63 20.49 4.87 20.49C6.11 20.49 7.35 20.02 8.3 19.08V19.1Z"
                    fill="black"
                    fill-opacity="0.75"
                  ></path>
                </svg>
                Sign in with One-time Link
              </Fab>
            </Box>
          </Box>
        </Box>
        <Box>
          <Typography className={styles.sign_up_text}>
            New to LinkedIn?{" "}
            <Link className={styles.sign_up_link} href="/signup">
              Join now
            </Link>
          </Typography>
        </Box>
      </Box>
      <Box className={styles.footer_wrap}>
        <Box className={styles.footer}>
          <Typography className={styles.footer_text}>
            <img src={footer_logo} alt={"Linked_in logo"} /> © 2024
          </Typography>
          <Link className={styles.footer_text}>User Agreement</Link>
          <Link className={styles.footer_text}>Privacy Policy</Link>
          <Link className={styles.footer_text}>Community Guidelines</Link>
          <Link className={styles.footer_text}>Cookie Policy</Link>
          <Link className={styles.footer_text}>CopyRight Policy</Link>
          <Link className={styles.footer_text}>Send Feedback</Link>
          <Link className={styles.footer_text}>Language</Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
