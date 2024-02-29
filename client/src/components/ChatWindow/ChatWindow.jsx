import { Box } from '@mui/system'
import React from 'react'
import styles from './ChatWindow.module.css'
import { IconButton, Input, InputBase, Typography } from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import MoreIcon from '@mui/icons-material/MoreHoriz';


function ChatWindow() {
    return (
        <Box className={styles.chatBox}>
            <Box className={styles.chatHeader}>
                <Box className={styles.chatUser}>
                    <Typography className={styles.chatUserName}>Sherya Garg</Typography>
                    <Typography className={styles.chatUserHeading}>Full-stack Developer</Typography>
                </Box>
                <Box className={styles.chatHeaderActions}>
                    <IconButton className={styles.chatHeaderActionBtn}><MoreIcon/></IconButton>
                    <IconButton className={styles.chatHeaderActionBtn}><VideoCallIcon/></IconButton>
                    <IconButton className={styles.chatHeaderActionBtn}><StarBorderIcon/></IconButton>
                </Box>
            </Box>
            <Box>

            </Box>{/*to be replaced it by compmonent*/}
            <Box className={styles.chatAction}>
                <Box className={styles.actionInputWrap}>
                    <InputBase className={styles.chatInput}/>
                </Box>
                <Box className={styles.actionBtnsWrap}>
                    
                </Box>
            </Box>
        </Box>
  )
}

export default ChatWindow