import React from 'react'
import { Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import styles from './Profile.module.css'
import Navbar from '../../components/Navbar'
import coverImg from '../../assets/images/cover_img.webp'
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const Profile = () => {
    const user = {};
    const loginedUser = true;
    return (
        <Box className={styles.root}>
            <Navbar page={"0"} />
            <Box className={styles.wraper}>
                <Box className={styles.main}>
                    <Box className={styles.container}>

                        <img src={user?.cover_image ? `${process.env.REACT_APP_IMG_BASE_URL}/${user.cover_image}` : coverImg} alt="Cover_Photo" className={styles.coverImg} />

                        {loginedUser && <IconButton className={styles.coverBtn}><ModeEditOutlineRoundedIcon /> </IconButton>}

                        <Box className={styles.avatarWrap}>
                            <Avatar className={styles.avatar}
                                src={
                                    user?.image
                                        ? `${process.env.REACT_APP_IMG_BASE_URL}/${user.image}`
                                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQbi0Cq6ANBTGJwu8uGYunx3XKWJJW38NECclo4Iidgg&s"} />
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
                            {loginedUser && <IconButton className={styles.profileBtn}><EditOutlinedIcon /> </IconButton>}
                        </Box>
                        <Typography className={styles.connectionText}>{`80 connections`}</Typography>
                        <Box className={styles.btnsWrapper}>
                            <Button className={`${styles.btn1} ${styles.btn}`}>
                                Open to
                            </Button>
                            <Button className={`${styles.btn2} ${styles.btn}`}>
                                Add profle section 
                            </Button>
                            <Button className={`${styles.btn3} ${styles.btn}`}>
                                More
                            </Button>
                        </Box>
                    </Box>
                    <Box></Box>
                    <Box></Box>

                </Box>
                <Box className={styles.rightPanel}>
                    dfg
                </Box>
            </Box>
        </Box>
    )
}

export default Profile