import React from "react";
import adImg from '../../assets/images/ad.png'
import footerLogo from '../../assets/svg//mini_logo.svg'
import { Box, Button, IconButton, Typography } from '@mui/material'
import styles from './Panel.module.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const AdPanalWithFooter = ({width}) => {
  return (
    <>
      <Box sx={{width:width||"auto"}} className={styles.adBox}>
        <Box className={styles.adTextBox}>
          <Typography className={styles.adText}>Ad</Typography>
          <IconButton className={styles.adBtn}><MoreHorizIcon /></IconButton>
        </Box>
        <img sx={{width:width||"auto"}} alt="Google Ads" src={adImg} className={styles.adImg} />
      </Box>
      <Box sx={{width:width||"auto"}} className={styles.footerBtns}>
        <Button className={styles.footerBtn} variant="contained">
          About
        </Button>
        <Button className={styles.footerBtn} variant="contained">
          Accessibility
        </Button>
        <Button className={styles.footerBtn} variant="contained">
          Help Center
        </Button>
        <Button className={styles.footerBtn} variant="contained">
          Privacy & Terms
        </Button>
        <Button className={styles.footerBtn} variant="contained">
          Ad Choices
        </Button>
        <Button className={styles.footerBtn} variant="contained">
          Advertising
        </Button>
        <Button className={styles.footerBtn} variant="contained">
          Bussiness Services
        </Button>
        <Button className={styles.footerBtn} variant="contained">
          Get the LinkedIn App
        </Button>
        <Button className={styles.footerBtn} variant="contained">
          More
        </Button>
      </Box>
      <Box sx={{width:width||"auto"}} className={styles.footerBox}>
        <Typography className={styles.footerText}>
          <img src={footerLogo} alt="" />
          &nbsp;Linkedin Corporation © 2024
        </Typography>
      </Box>
    </>
  );
};

export default AdPanalWithFooter;
