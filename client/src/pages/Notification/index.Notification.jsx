import React, { useState } from 'react'
import { Box, Button, Typography } from  '@mui/material'
import styles from './Notification.module.css'
import AdPanalWithFooter from '../../components/AdPanelWithFooter'
import { Link } from 'react-router-dom'
import NotificationCard from '../../components/NotificationCard/index'
const Notification = () => {
    const [activeTab, setActiveTab] = useState(1)
  return (
    <Box className={styles.root}>
        <Box className={styles.boxWrap}>

            <Box className={`${styles.leftPanel} ${styles.panels}`}>
                <Box className={styles.leftBox}>
                    <Typography className={styles.leftBoxText}>Manage your Notifications</Typography>
                    <Link className={styles.leftBoxLink}>View Settings</Link>
                </Box>
            </Box>

            <Box className={`${styles.mainPanel} ${styles.panels}`}>
                <Box className={styles.btnsBar}>
                    <Button className={`${styles.tabBtn} ${activeTab === 1 ? styles.tabBtnActive:""}`} onClick={()=>setActiveTab(1)}>All</Button>
                    <Button className={`${styles.tabBtn} ${activeTab === 2 ? styles.tabBtnActive:""}`} onClick={()=>setActiveTab(2)}>My Posts</Button>
                    <Button className={`${styles.tabBtn} ${activeTab === 3 ? styles.tabBtnActive:""}`} onClick={()=>setActiveTab(3)}>Mentions</Button>
                </Box>
                <Box className={styles.notifications}>
                    <NotificationCard/>
                </Box>
            </Box>
            
            <Box className={`${styles.adPanel} ${styles.panels}`}><AdPanalWithFooter/></Box>

        </Box>
    </Box>
  )
}

export default Notification