import React,{useState} from 'react'
import styles from './login.module.css'
import {TextField} from '@mui/material';
import Logo from '../../assets/svg/logo.svg'

function Login() {

    const [error, setError] = useState({
        email: false,
        password: false
    })
    const [data, setdata] = useState({
        email: "",
        password: ""
    })
    return (
        <div className={styles.root}>
            <div className={styles.logo}>
                <Logo/>
            </div>
            <div className={styles.box_wraper}>
                <div className={styles.box}>
                    <h1>Sign in</h1>
                    <span>Stay updated on your professional world</span>
                    <form className={styles.form}>
                        <TextField
                            id="outlined-error-helper-text"
                            label="E-mail"
                            value={data.email}
                            className={styles.login_inputs}
                            error = {error.email}
                            helperText={error.email ? "Invalid Email" : ""}
                            variant="outlined"
                        />
                        {/* <input type="text" placeholder="Email or Phone" />
                        <input type="password" placeholder="Password" />
                        <button>Sign in</button> */}
                    </form>
                    {/* <p>Forgot password?</p>
                    <p>Don't have an account? <span>Join now</span></p> */}
                </div>
            </div>
        </div>
    )
}

export default Login