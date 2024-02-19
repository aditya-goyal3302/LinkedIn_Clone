import React, { useState } from 'react'
import styles from './signup.module.css'
import './signup.css'
import { FormControl, Typography, InputAdornment, Fab, Divider, FormLabel, FormHelperText, InputBase } from '@mui/material';
import Logo from '../../assets/images/Logo.png'
import { Box } from '@mui/system';
import {Link} from '@mui/material';
import footer_logo from '../../assets/images/footer_logo.png'

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
            <Box className={styles.main_wrap}>
                <Box className={styles.logo}>
                    <img src={Logo} alt="Linked_in logo" />
                </Box>
                <Box className={styles.box_wraper}>
                <Typography className={styles.title}>Make the most of your professional life</Typography>
                    <Box className={styles.box}>
                        {/* 
                        <Typography className={styles.title2}>Stay updated on your professional world</Typography> */}
                        <FormControl className={styles.form}>
                            <FormControl error={error.email} className={styles.field1}>
                                <FormLabel className={styles.input_labels}>Email or phone number</FormLabel>
                                <InputBase 
                                    // value={data.email}
                                    className={styles.login_inputs}
                                    error={error.email}
                                    helperText={error.email ? "Invalid Email" : ""}
                                />
                                {error.email && <FormHelperText>Invalid email</FormHelperText>}
                            </FormControl>
                            <FormControl error={error.password} className={styles.field2}>
                                <FormLabel className={styles.input_labels}>Password (6+ characters)</FormLabel>
                                    <InputBase 
                                        // value={data.password}
                                        type={error.show_password ? "text" : "password"}
                                        className={styles.login_inputs}
                                        endAdornment={
                                            <InputAdornment position="center" className={styles.show_btn_wrap}>
                                                <Fab className={styles.show_btn}
                                                    variant="extended"
                                                    disableRipple
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {error.show_password ? "Hide" : "Show"}
                                                </Fab>
                                            </InputAdornment>}
                                    />
                                {error.password && <FormHelperText>Invalid password</FormHelperText>}
                            </FormControl>
                            <Typography className={styles.txt_oauth_text} >By clicking Agree & Join, you agree to the LinkedIn <Link className={styles.policy_links}>User Agreement</Link>,<Link className={styles.policy_links}> Privacy Policy</Link>, and <Link className={styles.policy_links}>Cookie Policy</Link>.</Typography>
                            
                            <Fab className={styles.sign_in_btn}
                                variant="extended"
                            >
                                Agree & Join
                            </Fab>
                        </FormControl>
                        <Box>
                            <Divider variant="middle" className={styles.divider}> or </Divider>
                            <Box className={styles.oauth_btn}>
                                <Fab variant="extended" className={styles.oauth_btn_google}>
                                    <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="google" />
                                    Continue with Google
                                </Fab>
                               
                            </Box>
                        </Box>
                        <Box className={styles.go_login}>
                            <Typography className={styles.sign_up_text}>Already on LinkedIn? <Link className={styles.sign_up_link}>Sign In</Link></Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className={styles.footer_wrap}>
                <Box className={styles.footer}>
                    <Typography className={styles.footer_text}><img src={footer_logo} alt={"Linked_in logo"}/> © 2024</Typography>
                    <Link className={styles.footer_text}>User Agreement</Link>
                    <Link className={styles.footer_text}>Privacy Policy</Link>
                    <Link className={styles.footer_text}>Community Guidelines</Link>
                    <Link className={styles.footer_text}>Cookie Policy</Link>
                    <Link className={styles.footer_text}>Copyright Policy</Link>
                    <Link className={styles.footer_text}>Send Feedback</Link>
                    <Link className={styles.footer_text}>Language</Link>
                </Box>
            </Box>
        </Box>
    )
}

export default Login