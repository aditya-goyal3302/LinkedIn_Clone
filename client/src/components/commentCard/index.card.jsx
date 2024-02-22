import { Box } from '@mui/system'
import React from 'react'
import styles from './comment.module.css'
import { Avatar } from '@mui/material'
import {Fab} from '@mui/material'


function Comment() {
  return (
    <Box className={styles.root} >
        <Box className={styles.postComment}>
            <Avatar className={styles.postCommentAvatar} src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar"  />
            <Box className={styles.postCommentInput}>
                <input type="text" placeholder="Add a comment..." className={styles.postCommentInputField}/>
            </Box>
        </Box>

    </Box>
  )
}

export default Comment