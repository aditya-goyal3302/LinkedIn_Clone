import React from 'react'
import {Avatar, Box, IconButton, Typography} from '@mui/material'
import styles from './Profile.module.css'
import Navbar from '../../components/Navbar'
import coverImg from '../../assets/images/cover_img.webp'

const Profile = () => {
    const user={};
    const loginedUser=true;
  return (
    <Box className={styles.root}>
        <Navbar page={"0"}/>
        <Box className={styles.wraper}>
            <Box className={styles.main}>
                <Box className={styles.container}>

                    <img src={user?.cover_image?`${process.env.REACT_APP_IMG_BASE_URL}/${user.cover_image}`:coverImg} alt="Cover_Photo" className={styles.coverImg} />
                    
                    {loginedUser && <IconButton className={styles.coverBtn}></IconButton>}
                    
                    <Box className={styles.avatarWrap}>
                        <Avatar className={styles.avatar}
                            src={
                                user?.image
                                ? `${process.env.REACT_APP_IMG_BASE_URL}/${user.image}`
                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQbi0Cq6ANBTGJwu8uGYunx3XKWJJW38NECclo4Iidgg&s"}/>
                        {loginedUser && <IconButton className={styles.editBtn}></IconButton>}
                    </Box>
                    <Box className={styles.contextBox}>
                        <Box className={styles.textBox}>
                            <Typography className={styles.name}>Aditya Goyal</Typography>
                            <Typography className={styles.heading}>Full-stack Developer at Zenmonk || MERN Stack Developer || Ex-GDSC CUIET Web Team</Typography>
                            <Typography className={styles.location}>Fatehabad, Haryana, India</Typography>
                        </Box>
                        <Box className={styles.expBox}>
                            FS
                        </Box>
                    </Box>
                </Box>
                <Box></Box>
                <Box></Box>

            </Box>
            <Box className={styles.rightPanel}>

            </Box>
        </Box>
    </Box>
  )
}

export default Profile