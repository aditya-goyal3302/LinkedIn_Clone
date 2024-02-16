import React, { useState } from 'react'
import styles from './login.module.css'
import { TextField, FormControl, Typography, InputLabel, OutlinedInput, InputAdornment, Fab ,Divider } from '@mui/material';
import Logo from '../../assets/svg/logo.js'
import { Box } from '@mui/system';

function Login() {

    const [error, setError] = useState({
        email: false,
        password: false,
        show_password: false
    })
    const [data, setdata] = useState({
        email: "",
        password: ""
    })
    const handleClickShowPassword = () => {
        setError({ ...error, show_password: !error.show_password });
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Box className={styles.root}>
            <Box className={styles.logo}>
                <Logo />
            </Box>
            <Box className={styles.box_wraper}>
                <Box className={styles.box}>
                    <Typography className={styles.title}>Sign in</Typography>
                    <Typography className={styles.title2}>Stay updated on your professional world</Typography>
                    <FormControl className={styles.form}>
                        <TextField
                            id="outlined-error-helper-text"
                            label="Email"
                            // value={data.email}
                            className={styles.login_inputs}
                            error={error.email}
                            helperText={error.email ? "Invalid Email" : ""}
                            variant="outlined"
                        />
                        <FormControl variant="outlined" className={styles.login_inputs}>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={error.show_password ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="center" className={styles.show_btn_wrap}>
                                        <Fab className={styles.show_btn}
                                            variant="extended"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {error.show_password ? "Hide" : "Show"}
                                        </Fab>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <Fab className={styles.forget_password}
                            variant="extended"
                            // onClick={handleClickShowPassword}
                            // onMouseDown={handleMouseDownPassword}
                        >
                            Forgot Password?
                        </Fab>
                        <Fab className={styles.sign_in_btn}
                            variant="extended"
                            autoCapitalize='none'
                            // onClick={handleClickShowPassword}
                            // onMouseDown={handleMouseDownPassword}
                        >
                            Sign in
                        </Fab>
                    </FormControl>
                    <Box>
                        <Divider variant="middle" className={styles.divider}> or </Divider>
                        <Typography className={styles.txt_oauth_text} >By clicking Continue, you agree to LinkedIn’s User Agreement, Privacy Policy, and Cookie Policy.</Typography>
                        <Box></Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Login