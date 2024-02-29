import { Avatar, Card, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import styles from './ChatContact.module.css'

function ChatContact() {
    const chat={};
    const handleOpenChat = ()=>{
        console.log("clicked")
    }
    return (
        <Card className={styles.root} onClick={handleOpenChat} >
            <Box className={styles.contactBoxImg}>
                <Avatar className={styles.Avatar} alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQbi0Cq6ANBTGJwu8uGYunx3XKWJJW38NECclo4Iidgg&s" />
            </Box>
            <Box className={styles.contactBoxName}>
                <Box className={styles.contactNameWraper}>
                    <Typography className={styles.contactName}>Sherya Garg </Typography>
                    <Typography className={styles.contactTime}>Feb 23</Typography>
                </Box>
                <Box className={styles.contactLastConvo}>
                    <Typography className={styles.contactLastConvoText}>{`${chat?.sender_id?.FirstName ||"User"}: ${chat?.message||"Hello Hellospace-betweenspace-betweenspace-betweenspace-between"}`} </Typography>
                </Box>
            </Box>
        </Card>
    )
}

export default ChatContact