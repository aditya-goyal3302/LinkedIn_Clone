import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import styles from "./MyNetwork.module.css";
import { Button, Menu, MenuItem, Typography } from "@mui/material";

function CatchUpPanel() {
  const [catchUpType, setCatchUpType] = useState("All");
  const [moreBtnAnchorEl, setMoreBtnAnchorEl] = useState(null);
  const open = Boolean(moreBtnAnchorEl);
  const handleClick = (event) => {
    setMoreBtnAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setMoreBtnAnchorEl(null);
  };
  const [ScreenSize, setScreenSize] = useState(0);
  //   console.log("ScreenSize: ", ScreenSize);
  const catchUpPanelBtnsMenu = ["All","Job Changes","Birthdays","Work anniversaries","Education"];
  var catchUpPanelBtnsMenu2 = [];
  const mediaQuery1 = window.matchMedia("(max-width: 1250px)");
  const mediaQuery2 = window.matchMedia("(max-width: 1030px)");
  const mediaQuery3 = window.matchMedia("(max-width: 790px)");
  const changeScreenSize = () => {
    handleClose();
    catchUpPanelBtnsMenu2 = [];
    //   console.log('catchUpPanelBtnsMenu2: ', catchUpPanelBtnsMenu2);
    if (mediaQuery2.matches) {
      setScreenSize(3);
    } else if (mediaQuery1.matches) {
      setScreenSize(2);
    } else {
      setScreenSize(1);
    }
  };
  useEffect(() => {
    changeScreenSize();
  }, []);
  mediaQuery1.addEventListener("change", changeScreenSize);
  mediaQuery2.addEventListener("change", changeScreenSize);
  mediaQuery3.addEventListener("change", changeScreenSize);

  return (
    <Box className={styles.catchUpPanel}>
      <Box className={styles.catchUpPanelBtns}>
        {ScreenSize === 1 &&
          catchUpPanelBtnsMenu.map((btn, index) => {
            return (
              <Button
                key={index}
                className={`${styles.optionBtn} ${
                  catchUpType === btn ? styles.optionBtnActive : ""
                }`}
                onClick={() => {
                  setCatchUpType(btn);
                }}
              >
                <Typography>{btn}</Typography>
              </Button>
            );
          })}
        {ScreenSize === 2 &&
          catchUpPanelBtnsMenu.map((btn, index) => {
            if (index === 4) {
              catchUpPanelBtnsMenu2.push(btn);
              return (
                <Button
                  key={index}
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className={styles.optionBtn}
                >
                  <Typography>More</Typography>
                </Button>
              );
            }
            return (
              <Button
                key={index}
                className={`${styles.optionBtn} ${
                  catchUpType === btn ? styles.optionBtnActive : ""
                }`}
                onClick={() => {
                  setCatchUpType(btn);
                }}
              >
                <Typography>{btn}</Typography>
              </Button>
            );
          })}
        {ScreenSize === 3 &&
          catchUpPanelBtnsMenu.map((btn, index) => {
            if (index === 2) {
              catchUpPanelBtnsMenu2.push(btn);
              return (
                <Button
                  key={index}
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className={styles.optionBtn}
                >
                  <Typography>More</Typography>
                </Button>
              );
            }
            if (index > 2) {
              catchUpPanelBtnsMenu2.push(btn);
              return;
            }
            return (
              <Button
                key={index}
                className={`${styles.optionBtn} ${
                  catchUpType === btn ? styles.optionBtnActive : ""
                }`}
                onClick={() => {
                  setCatchUpType(btn);
                }}
              >
                <Typography>{btn}</Typography>
              </Button>
            );
          })}
        <Menu
          id="basic-menu"
          anchorEl={moreBtnAnchorEl}
          open={open}
          onClose={handleClose}
          className={styles.moreMenu}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {catchUpPanelBtnsMenu2.length > 0 &&
            catchUpPanelBtnsMenu2.map((btn, index) => {
              return (
                <MenuItem
                  key={index}
                  className={styles.menuItemBtn}
                  onClick={() => {
                    handleClose();
                  }}
                >
                  {btn}
                </MenuItem>
              );
            })}
        </Menu>
      </Box>
      <Box className={styles.catchUpPanelBody}>
        {/* <Typography>No {catchUpType} to catch up</Typography> */}
        <Typography className={styles.catchupBoxHead}>Past Update</Typography>
        <Box className={styles.updatesBox}></Box>
      </Box>
    </Box>
  );
}

export default CatchUpPanel;
