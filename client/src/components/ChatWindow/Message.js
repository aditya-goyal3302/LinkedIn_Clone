import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import styles from './ChatWindow.module.css'
import { useNavigate } from 'react-router'

const FullMessage = ({ user, message }) => {
    const navigate = useNavigate()
    const getTime = (time)=>{
        time = new Date(time)
        let t = "AM";
        let h = time.getHours()
        if(h>11){
            t = "PM";
        }
        let m = time.getMinutes()
        return `${h}:${m} ${t}`

    }
    return (
        <Box className={styles.chatWraper}>
            <Avatar className={styles.messageAvatar} onClick={() => { navigate(`/in/${user._id}`) }} alt={user.first_name || "LinkedIn User"} src={user?.image ? `${process.env.REACT_APP_IMG_BASE_URL}/${user.image}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQbi0Cq6ANBTGJwu8uGYunx3XKWJJW38NECclo4Iidgg&s"} />
            <Box className={styles.chatSend}>
                <Box className={styles.chatTitle}>
                    <Typography onClick={() => { navigate(`/in/${user._id}`) }} className={styles.chatTitleText}>{user?.first_name ? `${user?.first_name} ${user?.last_name}` : user?.username || "LinkedIn User"}</Typography>
                    <Typography onClick={() => { navigate(`/in/${user._id}`) }} className={styles.chatTitleTime}>&nbsp;• {getTime(message.createdAt)}</Typography>
                </Box>
                <Box className={styles.chatTextWrap}>
                    <Typography className={styles.chatText}>{message?.message}</Typography>
                </Box>
            </Box>
        </Box>
    )
}

const OnlyMessage = ({ user, message }) => {
    return (
        <Box sx={{width:"100%"}} className={styles.chatTextWrap}>
            <Typography className={styles.chatText}>{message?.message}</Typography>
        </Box>
    )
}
export { FullMessage, OnlyMessage }
