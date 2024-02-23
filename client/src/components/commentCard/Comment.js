import { Avatar, Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import styles from './comment.module.css'
import { Box } from '@mui/system'

function Comment({comment}) {
  return (
    <Card className={styles.commentRoot}>
      <CardContent className={styles.comment}>
        <Avatar className={styles.commentAvatar}/>
        <Box className={styles.commentBody}>
          <Box className={styles.commentHeader}>
            <Typography className={styles.commentUserUsername}>{comment.userId?.username || "Linekdin User"}</Typography>
            <Typography className={styles.commentUserHeading}>{comment.userId?.heading || "Linekdin User Heading"}</Typography>
          </Box>
          <Box className={styles.commentContent}>
            <Typography className={styles.commentText}>{comment.content}</Typography>
          </Box>
          <Box className={styles.commentFooter}>
            
            </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default Comment