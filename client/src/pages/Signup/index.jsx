import React, { useEffect, useState } from "react";
import styles from "./signup.module.css";
import "./signup.css";
import {
  FormControl,
  Typography,
  InputAdornment,
  Fab,
  Divider,
  FormLabel,
  FormHelperText,
  InputBase,
} from "@mui/material";
import Logo from "../../assets/images/Logo.png";
import { Box } from "@mui/system";
import { Link } from "@mui/material";
import footer_logo from "../../assets/images/footer_logo.png";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../store/SignupSlice/Signup.Api";
import { useNavigate } from "react-router-dom";
import { reset } from "../../store/LoginSlice/Login.Slice";

function Signup() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.signup_reducer);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [error, setError] = useState({
    email: null,
    password: null,
    show_password: null,
  });

  const [data, setdata] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  useEffect(() => {
    dispatch(reset());
  })

  const handleClickShowPassword = () => {
    setError((pre) => ({ ...pre, show_password: !pre.show_password }));
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (password) => {
    return String(password).match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/);

  };

  function reset_err() {
    if (status.error?.status) {
      // console.log('status.errors: ',status);
      dispatch(reset())
    }
  }

  function check_email(data) {
    if (data === "" || !validateEmail(data))
      setError((pre) => ({ ...pre, email: true }));
    else setError((pre) => ({ ...pre, email: false }));
  }

  function check_password(data) {
    if (data === "" || !validatePassword(data) || data.length < 6)
      setError((pre) => ({ ...pre, password: true }));
    else setError((pre) => ({ ...pre, password: false }));
  }

  const HandleSubmit = async () => {
    if (error.email || error.password || data.email === "" || data.password === "" || data.first_name === "" || data.last_name === "") {
      return;
    }
    await dispatch(signup(data));
  };

  useEffect(() => {
    if (status.error) {
      setError((pre) => ({ ...pre, email: true, password: true }));
    } else {
      setError((pre) => ({ ...pre, email: false, password: false }));
    }
    if (status.status === 'sucessful') {
      setdata({ email: "", password: "" });
      navigate('/auth/login');
    }
    console.log("status: ", status);
  }, [status]);

  return (
    <Box className={styles.root}>
      <Box className={styles.main_wrap}>
        <Box className={styles.logo}>
          <img src={Logo} alt="Linked_in logo" />
        </Box>
        <Box className={styles.box_wraper}>
          <Typography className={styles.title}>
            Make the most of your professional life
          </Typography>
          {page === 1 &&
            (
              <Box className={styles.box}>
                <FormControl className={styles.form}>
                  <FormControl error={error.email} className={styles.field1}>
                    <FormLabel className={styles.input_labels} sx={{marginTop:"0"}}>
                      Email or phone number
                    </FormLabel>
                    <InputBase
                      value={data.email}
                      onChange={(e) => {
                        setdata({ ...data, email: e.target.value })
                        check_email(e.target.value)
                        reset_err();
                      }}
                      className={styles.login_inputs}
                      error={error.email}
                      helperText={error.email ? "Invalid Email" : ""}
                    />
                    {error.email && <FormHelperText>Invalid email</FormHelperText>}
                  </FormControl>
                  <FormControl error={error.password} className={styles.field2}>
                    <FormLabel className={styles.input_labels}>
                      Password (6+ characters)
                    </FormLabel>
                    <InputBase
                      style={{ borderColor: error.password ? 'red' : 'black' }}
                      value={data.password}
                      onChange={(e) => {
                        setdata({ ...data, password: e.target.value });
                        // console.log(e.target.value) 
                        check_password(e.target.value);
                        reset_err();
                      }}
                      type={error.show_password ? "text" : "password"}
                      className={styles.login_inputs}
                      endAdornment={
                        <InputAdornment
                          position="center"
                          className={styles.show_btn_wrap}
                        >
                          <Fab
                            className={styles.show_btn}
                            variant="extended"
                            disableRipple
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {error.show_password ? "Hide" : "Show"}
                          </Fab>
                        </InputAdornment>
                      }
                    />
                    {error.password && (
                      <FormHelperText>Invalid password</FormHelperText>
                    )}
                  </FormControl>
                  <Typography className={styles.txt_oauth_text}>
                    By clicking Agree & Join or Continue, you agree to the LinkedIn{" "}
                    <Link className={styles.policy_links}>User Agreement</Link>,
                    <Link className={styles.policy_links}> Privacy Policy</Link>,
                    and <Link className={styles.policy_links}>Cookie Policy</Link>.
                  </Typography>

                  <Fab
                    className={styles.sign_in_btn}
                    variant="extended"
                    onClick={() => {
                      if (error.email || error.password || data.email === "" || data.password === "") {
                        return;
                      } setPage(2)
                    }}
                  >
                    Agree & Join
                  </Fab>
                </FormControl>
                <Box>
                  <Divider variant="middle" className={styles.divider}>
                    &nbsp; or &nbsp;
                  </Divider>
                  <Box className={styles.oauth_btn}>
                    <Fab variant="extended" className={styles.oauth_btn_google}>
                      <img
                        src="https://img.icons8.com/color/48/000000/google-logo.png"
                        alt="google"
                      />
                      Continue with Google
                    </Fab>
                  </Box>
                </Box>
                <Box className={styles.go_login}>
                  <Typography className={styles.sign_up_text}>
                    Already on LinkedIn?{" "}
                    <Link className={styles.sign_up_link} href="/auth/login">
                      Sign In
                    </Link>
                  </Typography>
                </Box>
              </Box>
            )
          }
          {page === 2 &&
            (
              <Box className={styles.box}>
                <FormControl className={styles.form}>
                  <FormControl className={styles.field2}>
                    <FormLabel className={styles.input_labels} sx={{marginTop:"0"}}>
                      First name
                    </FormLabel>
                    <InputBase
                      value={data.first_name}
                      onChange={(e) => {
                        setdata({ ...data, first_name: e.target.value })
                      }}
                      className={styles.login_inputs}
                    />
                  </FormControl>
                  <FormControl className={styles.field2}>
                    <FormLabel className={styles.input_labels}>
                      Last name
                    </FormLabel>
                    <InputBase
                      value={data.last_name}
                      onChange={(e) => {
                        setdata({ ...data, last_name: e.target.value })
                      }}
                      className={styles.login_inputs}
                    />
                  </FormControl>

                  <Fab
                    className={styles.sign_in_btn}
                    variant="extended"
                    onClick={HandleSubmit}
                  >
                    Agree & Join
                  </Fab>
                </FormControl>
                <Box>
                  <Divider variant="middle" className={styles.divider}>
                    &nbsp; or &nbsp;
                  </Divider>
                  <Box className={styles.oauth_btn}>
                    <Fab variant="extended" className={styles.oauth_btn_google}>
                      <img
                        src="https://img.icons8.com/color/48/000000/google-logo.png"
                        alt="google"
                      />
                      Continue with Google
                    </Fab>
                  </Box>
                </Box>
                <Box className={styles.go_login}>
                  <Typography className={styles.sign_up_text}>
                    Already on LinkedIn?{" "}
                    <Link className={styles.sign_up_link} href="/auth/login">
                      Sign In
                    </Link>
                  </Typography>
                </Box>
              </Box>
            )
          }
        </Box>
        <Typography className={styles.helps}>
          Looking to create a page for a business?{" "}
          <Link className={styles.helps_link}>Get help</Link>
        </Typography>
      </Box>
      <Box className={styles.footer_wrap}>
        <Box className={styles.footer}>
          <Typography className={styles.footer_text}>
            <img src={footer_logo} alt={"Linked_in logo"} /> © 2024
          </Typography>
          <Link className={styles.footer_text}>About</Link>
          <Link className={styles.footer_text}>Accessibility</Link>
          <Link className={styles.footer_text}>User Agreement</Link>
          <Link className={styles.footer_text}>Privacy Policy</Link>
          <Link className={styles.footer_text}>Cookie Policy</Link>
          <Link className={styles.footer_text}>Copyright Policy</Link>
          <Link className={styles.footer_text}>Brand Policy</Link>
          <Link className={styles.footer_text}>Guest Controls</Link>
          <Link className={styles.footer_text}>Community Guidelines</Link>
          <Link className={styles.footer_text}>Language</Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Signup;
