import {
  Avatar,
  Box,
  Divider,
  InputBase,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import styles from "./Navbar.module.css";
import {
  HomeSvg,
  MyNetworkSvg,
  JobsSvg,
  MessageSvg,
  NotificationSvg,
  BusinessSvg,
  CaretDown,
  LogoSvg,
  SearchSvg,
} from "../../assets/svg/NavbarSvg";
// import caretDown from "../../assets/svg/caretDown.svg";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.persistedReducer.user) || {};
  const [navbarSelector, setNavbarSelector] = useState("1");
  // console.log('navbarSelector: ', navbarSelector ==="1");
  const handleChange = (event, newValue) => {
    setNavbarSelector(newValue);
  };
  return (
    <Box className={styles.root}>
      <Box className={styles.navbar}>
        <Box className={styles.navLogoWrap}>
          <LogoSvg />
        </Box>
        <Box className={styles.navSearchWrap}>
          <InputBase className={styles.navSearchBar} placeholder="Search"
            startAdornment={<i className={styles.searchIcon}> <SearchSvg/>  </i>}
          />
        </Box>
        <Box className={styles.navBtnsWrap}>
          <Tabs
            className={styles.navBtns}
            value={navbarSelector}
            onChange={handleChange}
            indicatorColor="secondary"
            // textColor="blackTheme"
          >
            <Tab
              className={styles.navBtn}
              value="1"
              label={
                <>
                  <HomeSvg />
                  <Typography
                    className={`${styles.navBtnText} ${
                      navbarSelector === "1" ? styles.navBtnTextActive : ""
                    }`}
                  >
                    Home
                  </Typography>
                </>
              }
            ></Tab>
            <Tab
              value="2"
              className={styles.navBtn}
              label={
                <>
                  <MyNetworkSvg />
                  <Typography
                    className={`${styles.navBtnText} ${
                      navbarSelector === "2" ? styles.navBtnTextActive : ""
                    }`}
                  >
                    My Network
                  </Typography>
                </>
              }
            ></Tab>
            <Tab
              value="3"
              className={styles.navBtn}
              label={
                <>
                  <JobsSvg />
                  <Typography
                    className={`${styles.navBtnText} ${
                      navbarSelector === "3" ? styles.navBtnTextActive : ""
                    }`}
                  >
                    Jobs
                  </Typography>
                </>
              }
            ></Tab>
            <Tab
              value="4"
              className={styles.navBtn}
              label={
                <>
                  <MessageSvg />
                  <Typography
                    className={`${styles.navBtnText} ${
                      navbarSelector === "4" ? styles.navBtnTextActive : ""
                    }`}
                  >
                    Messages
                  </Typography>
                </>
              }
            ></Tab>
            <Tab
              value="5"
              className={styles.navBtn}
              label={
                <>
                  <NotificationSvg />
                  <Typography
                    className={`${styles.navBtnText} ${
                      navbarSelector === "5" ? styles.navBtnTextActive : ""
                    }`}
                  >
                    Notifications
                  </Typography>
                </>
              }
            ></Tab>
          </Tabs>
        </Box>
        <Box className={styles.profileBtnWrap}>
          <Avatar
            className={styles.profileBtn}
            src={
              user?.image
                ? `${process.env.REACT_APP_IMG_BASE_URL}/${user.image}`
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQbi0Cq6ANBTGJwu8uGYunx3XKWJJW38NECclo4Iidgg&s"
            }
          />
          <Typography className={styles.profileBtnText}>
            Me&nbsp;
            <CaretDown />
          </Typography>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box className={styles.businessBtnWrap}>
          <BusinessSvg />
          <Typography className={styles.businessBtnText}>
            For Business&nbsp;
            <CaretDown />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
