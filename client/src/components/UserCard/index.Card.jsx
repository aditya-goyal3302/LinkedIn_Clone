import { Card, CardContent, CardHeader, IconButton } from '@mui/material'
import React from 'react'
import styles from './UserCard.module.css'
import { Box } from '@mui/system'
import coverImg from '../../assets/images/cover_img.webp'
import CloseIcon from '@mui/icons-material/Close';

function UserCard() {
  return (
    <Card className={styles.root}>
        <CardContent>
            <Box>
                <img src={coverImg} alt="Cover_Photo" className={styles.coverImg} />
                <IconButton className={styles.clearBtn}>
                    <CloseIcon/>
                </IconButton>
            </Box>
        </CardContent>
        
    </Card>
  )
}

export default UserCard