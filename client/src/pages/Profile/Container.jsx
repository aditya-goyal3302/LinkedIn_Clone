import EditOutlined from '@mui/icons-material/EditOutlined'
import AddIcon from '@mui/icons-material/Add';
import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'
import styles from './Profile.module.css'

const Container = ({ title, loginedUser, children, AddBtn=false , onEdit}) => {
    return (
        <Box className={styles.containerWrap}>
            <Box className={styles.headerWrap}>
                <Typography className={styles.headerText}>
                    {title}
                </Typography>
                <Box>
                    {AddBtn && <IconButton className={styles.headerBtn}><AddIcon /> </IconButton>}
                    {loginedUser && <IconButton className={styles.headerBtn} onClick={onEdit}><EditOutlined /> </IconButton>}
                </Box>
            </Box>
            {children}
        </Box>
    )
}

export default Container