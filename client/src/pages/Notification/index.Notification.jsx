import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import styles from "./Notification.module.css";
import AdPanalWithFooter from "../../components/AdPanelWithFooter";
import { Link } from "react-router-dom";
import NotificationCard from "../../components/NotificationCard/index";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import axios from 'axios'

const socket = io.connect(process.env.REACT_APP_NOTIFICATION_BASE_URL);
const Notification = () => {
    const user = useSelector((state)=>state.persistedReducer)
    const [notifications, setNotifications] = useState([])
    console.log('notifications: ', notifications);    
    const getData = async ()=>{
        return await axios.get(`${process.env.REACT_APP_NOTIFICATION_BASE_URL}/api/notifications`,{
            headers:{
                'Content-Type':"application/json",
                Authorization: user?.token
            }
        })
    }
    
    
  useEffect(()=>async()=>{
    let resp = await getData()
    setNotifications(resp.data)

    socket.emit('join',user?.user?._id)
    socket.on('get-notifications',(data)=>{
        setNotifications([data,...notifications])
    })
    return ()=>{
        socket.off('get-notifications')
    }
  },[])
  const [activeTab, setActiveTab] = useState(1);
  return (
    <Box className={styles.root}>
      <Box className={styles.boxWrap}>
        <Box className={`${styles.leftPanel} ${styles.panels}`}>
          <Box className={styles.leftBox}>
            <Typography className={styles.leftBoxText}>
              Manage your Notifications
            </Typography>
            <Link className={styles.leftBoxLink}>View Settings</Link>
          </Box>
        </Box>

        <Box className={`${styles.mainPanel} ${styles.panels}`}>
          <Box className={styles.btnsBar}>
            <Button
              className={`${styles.tabBtn} ${
                activeTab === 1 ? styles.tabBtnActive : ""
              }`}
              onClick={() => setActiveTab(1)}
            >
              All
            </Button>
            <Button
              className={`${styles.tabBtn} ${
                activeTab === 2 ? styles.tabBtnActive : ""
              }`}
              onClick={() => setActiveTab(2)}
            >
              My Posts
            </Button>
            <Button
              className={`${styles.tabBtn} ${
                activeTab === 3 ? styles.tabBtnActive : ""
              }`}
              onClick={() => setActiveTab(3)}
            >
              Mentions
            </Button>
          </Box>
          <Box className={styles.notifications}>
            {notifications && notifications.map((item)=><NotificationCard key={item._id} notification={item}/>)}
          </Box>
        </Box>

        <Box className={`${styles.adPanel} ${styles.panels}`}>
          <AdPanalWithFooter />
        </Box>
      </Box>
    </Box>
  );
};

export default Notification;


                                                                                                                                                                                                                                                                                                                                                                                                                                    