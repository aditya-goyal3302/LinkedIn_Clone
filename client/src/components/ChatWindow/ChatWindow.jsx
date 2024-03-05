import { Box } from '@mui/system'
import React, { useState } from 'react'
import styles from './ChatWindow.module.css'
import { Button, IconButton, InputBase, Typography } from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import MoreIcon from '@mui/icons-material/MoreHoriz';
import { Attachment, GIF, Image, Smiley } from '../../assets/svg/Extras';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function ChatWindow() {
    const [expandedInput, setExpandedInput] = useState(false)
    console.log('expandedInput: ', expandedInput);
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
           {expandedInput===false && 
            <Box className={styles.chats}>
                <Box className={styles.chatWraper}>
                    <Box className={styles.chatSend}>
                        <Typography  className={styles.chatTitle}>Aditya Goyal</Typography>
                        <Typography  className={styles.chatText}>Ignore messages</Typography>
                    </Box>
                </Box>
                
            </Box>}{/*to be replaced it by compmonent*/}
            <Box className={styles.chatAction}>
                <Box className={styles.actionInputWrap}>
                    <InputBase className={styles.chatInput} multiline/>
                    <IconButton className={styles.chatBoxExpandBtn} onClick={()=>{setExpandedInput((pre)=>!pre)}}>{expandedInput === true ? <KeyboardArrowDownIcon/>:<KeyboardArrowUpIcon/>}</IconButton>

                </Box>
                <Box className={styles.actionBtnsWrap}>
                    <Box className={styles.actionBtns}>
                        <IconButton className={styles.chatActionBtn}><Image/></IconButton>
                        <IconButton className={styles.chatActionBtn}><Attachment/></IconButton>
                        <IconButton className={styles.chatActionBtn}><GIF/></IconButton>
                        <IconButton className={styles.chatActionBtn}><Smiley/></IconButton>
                    </Box>
                    <Box className={styles.actionBtns}>
                        <Button className={styles.sendBtn}>Send</Button>
                        <IconButton className={styles.chatOptionBtn}><MoreHoriz/></IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
  )
}

export default ChatWindow