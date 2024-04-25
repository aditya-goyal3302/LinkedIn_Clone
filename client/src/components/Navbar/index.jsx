import {
  Avatar,
  Box,
  Button,
  Divider,
  InputBase,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { fetchMyConnections } from "../../store/MyConnections/MyConnection.Api";
import {logout} from '../../store/LoginSlice/Login.Slice'
const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.persistedReducer.user) || {};

  const [navbarSelector, setNavbarSelector] = useState(1);
  useEffect(() => {
    dispatch(fetchMyConnections())
  }, [])
  const handleChange = (event, newValue) => {
    setNavbarSelector(newValue);
  };


  const [profileBtn, setProfileBtn] = React.useState(null);
  const open = Boolean(profileBtn);
  const handleClick = (event) => {
    setProfileBtn(event.currentTarget);
  };
  const handleClose = () => {
    setProfileBtn(null);
  };
  const handleLogout = () =>{
    dispatch(logout())
  }
  return (
    <Box className={styles.root}>
      <Box className={styles.navbar}>
        <Box className={styles.navLogoWrap} onClick={() => { navigate('/') }}>
          <LogoSvg />
        </Box>
        <Box className={styles.navSearchWrap}>
          <InputBase className={styles.navSearchBar} placeholder="Search"
            startAdornment={<i className={styles.searchIcon}> <SearchSvg />  </i>}
          />
        </Box>
        <Box className={styles.navBtnsWrap}>
          <Tabs
            className={styles.navBtns}
            value={navbarSelector}
            onChange={handleChange}
            indicatorColor="primary"
          // textColor="blackTheme"
          >
            <Tab
              className={styles.navBtn}
              value="1"
              onClick={() => {
                navigate('/')
              }}
              label={
                <>
                  <HomeSvg />
                  <Typography
                    className={`${styles.navBtnText} ${navbarSelector === "1" ? styles.navBtnTextActive : ""
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
              onClick={() => {
                navigate('/my-network')
              }}
              label={
                <>
                  <MyNetworkSvg />
                  <Typography
                    className={`${styles.navBtnText} ${navbarSelector === "2" ? styles.navBtnTextActive : ""
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
              onClick={() => {
                navigate('/jobs')
              }}
              label={
                <>
                  <JobsSvg />
                  <Typography
                    className={`${styles.navBtnText} ${navbarSelector === "3" ? styles.navBtnTextActive : ""
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
              onClick={() => {
                navigate('/chat')
              }}
              label={
                <>
                  <MessageSvg />
                  <Typography
                    className={`${styles.navBtnText} ${navbarSelector === "4" ? styles.navBtnTextActive : ""
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
              onClick={() => {
                navigate('/notifications')
              }}
              label={
                <>
                  <NotificationSvg />
                  <Typography
                    className={`${styles.navBtnText} ${navbarSelector === "5" ? styles.navBtnTextActive : ""
                      }`}
                  >
                    Notifications
                  </Typography>
                </>
              }
            ></Tab>
          </Tabs>
        </Box>
        <Box className={styles.profileBtnWrap} onClick={(e) => { setNavbarSelector(0); handleClick(e) }}>
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
        <Menu
          id="basic-menu"
          anchorEl={profileBtn}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          className={styles.profileMenu}

        >
          <MenuItem onClick={handleClose} className={styles.menuProfile}>
            <Box className={styles.profileWrap}>
              <Avatar className={styles.menuAvatar}
                src={
                  user?.image
                    ? `${process.env.REACT_APP_IMG_BASE_URL}/${user.image}`
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQbi0Cq6ANBTGJwu8uGYunx3XKWJJW38NECclo4Iidgg&s"
                }                ></Avatar>
              <Box className={styles.profileTextWrap}>
                <Typography className={styles.ProfileName}>{user.first_name ? `${user.first_name || ""} ${user.last_name || ""}` : "Linkedin User"}</Typography>
                <Typography className={styles.ProfileHead}>{user.headline || ""}</Typography>
              </Box>
            </Box>
            <Box className={styles.profileMenuBtnWrap}>
                <Button className={styles.profileMenuBtn} onClick={()=>{navigate('/in')}} >View Profile</Button>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleLogout} sx={{margin:"4px 0px", padding:"4px 12px", color:"#00000099",fontSize:"14px"}}>Logout</MenuItem>
        </Menu>
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
