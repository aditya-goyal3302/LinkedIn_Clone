import React from 'react'
import styles from "./notFound.module.css"
import notlogo from "../../assets/svg/notlogo.svg"
import notfound from "../../assets/svg/notfound.svg"
import { Link, useNavigate } from "react-router-dom"
import { Box, Button, Typography } from "@mui/material";
import footer_logo from "../../assets/images/footer_logo.png";


const NotFound = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate("/")
  }
  return (

    <div className={styles.maincontainer}>
      <div className={styles.outerNavbar}>
        <div className={styles.innerNavbar}>
          <img src={notlogo} className={styles.logo}></img>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.content}>
          <div>
            <img src={notfound} className={styles.notfound}></img>
          </div>
          <div className={styles.text}>
            <h2 className={styles.heading}>This page doesn't exist</h2>
            <p className={styles.para}>Please check your URL or return to LinkedIn home</p>
            <div className={styles.button}>

              <Button variant='outlined' onClick={handleClick} className={styles.feedButton}>Go to your feed</Button>
            </div>

          </div>
        </div>

      </div>
      <div className={styles.footer}>
      </div>
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
    </div>
  )
}

export default NotFound
