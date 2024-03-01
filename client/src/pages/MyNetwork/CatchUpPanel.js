import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system'
import styles from './MyNetwork.module.css'
import { Button, Typography } from '@mui/material'


function CatchUpPanel() {
    const [catchUpType, setCatchUpType] = useState('All')
    const [ScreenSize, setScreenSize] = useState(1)
    console.log('ScreenSize: ', ScreenSize);
    const catchUpPanelBtnsMenu = ["All", "Job Changes", "Birthdays", "Work anniversaries", "Education"];
    const catchUpPanelBtnsMenu2 = [];
    const mediaQuery1 =window.matchMedia("(max-width: 1250px)")
    const mediaQuery2 =window.matchMedia("(max-width: 1030px)")
    const mediaQuery3 =window.matchMedia("(max-width: 790px)")
    const changeScreenSize = () => {
        if (mediaQuery1.matches) {
            setScreenSize(2)
        } else if (mediaQuery2.matches) {
            setScreenSize(3)
        } else if (mediaQuery3.matches) {
            setScreenSize(4)
        }else {
            setScreenSize(1)
        }
    }
    mediaQuery1.addEventListener("change",changeScreenSize)
    mediaQuery2.addEventListener("change",changeScreenSize)
    mediaQuery3.addEventListener("change",changeScreenSize)
  return (
    <Box className={styles.catchUpPanel}>
        <Box className={styles.catchUpPanelBtns}>
        {ScreenSize ===1 && catchUpPanelBtnsMenu.map((btn, index) => {
            return <Button key={index} className={`${styles.optionBtn} ${catchUpType ===btn?styles.optionBtnActive:""}`} onClick={()=>{setCatchUpType(btn)}}><Typography>{btn}</Typography></Button>
        })}
        
        </Box>
        <Box className={styles.catchUpPanelBody}>
            {/* <Typography>No {catchUpType} to catch up</Typography> */}
            <Typography className={styles.catchupBoxHead}>Past Update</Typography>
            <Box className={styles.updatesBox}>

            </Box>
        </Box>
    </Box>
  )
}

export default CatchUpPanel