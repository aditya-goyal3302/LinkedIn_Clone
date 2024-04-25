import { Box } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import styles from './ChatWindow.module.css'
import { Button, IconButton, InputBase, Typography } from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import MoreIcon from '@mui/icons-material/MoreHoriz';
import { Attachment, GIF, Image, Smiley } from '../../assets/svg/Extras';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import io from '../../config/Socket';
import { FullMessage, OnlyMessage } from './Message';
import { useSelector } from 'react-redux';


function ChatWindow({ MessagesData, currentChat }) {
    const [expandedInput, setExpandedInput] = useState(false)
    // const io = socket();
    const [newMessage, setNewMessage] = useState('')
    const chatBox = useRef()
    const user = currentChat?.users;
    const loginedUser = useSelector((state) => state.persistedReducer.user);
    var messages = MessagesData?.messages[currentChat?.uuid] || [];
    // console.log('messages: ', messages);
    const sendMessage = () => {
        if (newMessage.length > 0) {
            const data = {
                message: newMessage,
                sender: loginedUser._id,
                chat_room: currentChat.uuid
            }
            io.emit("send-message", data)
            setNewMessage("");
        }
    }
    useEffect(() => {
        if (chatBox.current) {
            chatBox.current.scrollTop = chatBox.current.scrollHeight;
        }
    }, [messages])

    if (!currentChat)
        return (<> </>)
    return (
        <Box className={styles.chatBox}>
            <Box className={styles.chatHeader}>
                <Box className={styles.chatUser}>
                    <Typography className={styles.chatUserName}>{user?.first_name ? `${user?.first_name} ${user?.last_name}` : user?.username || "LinkedIn User"}</Typography>
                    <Typography className={styles.chatUserHeading}>{user?.headline || "Heading "}</Typography>
                </Box>
                <Box className={styles.chatHeaderActions}>
                    <IconButton className={styles.chatHeaderActionBtn}><MoreIcon /></IconButton>
                    <IconButton className={styles.chatHeaderActionBtn}><VideoCallIcon /></IconButton>
                    <IconButton className={styles.chatHeaderActionBtn}><StarBorderIcon /></IconButton>
                </Box>
            </Box>
            {expandedInput === false &&
                <Box ref={chatBox} className={styles.chats}>
                    {messages.length > 0 && messages.map((message) => {
                        // console.log(message.sender === user._id , user.user_id, message.sender, user._id, message._id)

                        return <FullMessage key={message._id} user={message.sender === user._id ? user : loginedUser} message={message} />
                    })}

                </Box>}{/*to be replaced it by compmonent*/}
            <Box className={styles.chatAction}>
                <Box className={styles.actionInputWrap}>
                    <InputBase className={styles.chatInput} multiline value={newMessage} onKeyDown={(e) => { if (e.keyCode === 13) { e.preventDefault(); sendMessage(); } }} onChange={(e) => setNewMessage(e.target.value)} />
                    <IconButton className={styles.chatBoxExpandBtn} onClick={() => { setExpandedInput((pre) => !pre) }}>{expandedInput === true ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}</IconButton>

                </Box>
                <Box className={styles.actionBtnsWrap}>
                    <Box className={styles.actionBtns}>
                        <IconButton className={styles.chatActionBtn}><Image /></IconButton>
                        <IconButton className={styles.chatActionBtn}><Attachment /></IconButton>
                        <IconButton className={styles.chatActionBtn}><GIF /></IconButton>
                        <IconButton className={styles.chatActionBtn}><Smiley /></IconButton>
                    </Box>
                    <Box className={styles.actionBtns}>
                        <Button className={styles.sendBtn} onClick={sendMessage}>Send</Button>
                        <IconButton className={styles.chatOptionBtn}><MoreHoriz /></IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ChatWindow