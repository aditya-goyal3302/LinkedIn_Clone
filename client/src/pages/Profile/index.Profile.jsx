import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Divider, Icon, IconButton, Typography } from '@mui/material'
import styles from './Profile.module.css'
import coverImg from '../../assets/images/cover_img.webp'
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined'
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import Container from './Container'
import AdPanalWithFooter from '../../components/AdPanelWithFooter'
import { SendIcon } from '../../assets/svg/PostSvg'
import EditCover from '../../components/Edit/EditCover/EditCover'
import EditProfilePic from '../../components/Edit/EditProfilePic/EditProfilePic'
import { useSelector } from 'react-redux'
import EditProfileData from '../../components/Edit/EditProfileData/EditProfileData'
import EditAbout from '../../components/Edit/EditAbout/EditAbout'
import EditSkills from '../../components/Edit/EditSkills/EditSkills'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Profile = ({ loginedUser }) => {
    const navigate = useNavigate()
    const { user_id } = useParams()
    const logined_user = useSelector(state => state.persistedReducer)
    const  [user, setUser] = useState({})
    const getUser = async() =>{
        const resp = await axios.get(`${process.env.REACT_APP_IMG_BASE_URL}/users/${user_id}`,{
            headers:{
                Authorization:logined_user.token
            }
        })
        console.log('resp: ', resp);
        setUser(resp.data)
    }
    const sendMessage = async() =>{
        const resp = await axios.post(`${process.env.REACT_APP_IMG_BASE_URL}/chats`,{requested_user:user_id},{
            headers:{
                Authorization:logined_user.token
            }
        })
        console.log('resp: ', resp);
        if(resp)
            navigate('/chat')
    }
    useEffect(()=>{
        if(user_id === undefined){
            setUser(logined_user.user)
        }
        else if(user_id === logined_user.user._id){
            navigate('/in')
            setUser(logined_user.user)

        }
        else{
            getUser()
        }
    },[])
    const [openEditCover, setOpenEditCover] = useState(false)
    const [openEditProfilePic, setOpenEditProfilePic] = useState(false)
    const [openEditProfileData, setOpenEditProfileData] = useState(false)
    const [openEditAbout, setOpenEditAbout] = useState(false)
    const [openEditSkills, setOpenEditSkills] = useState(false)
    const handleOpenEditCover = () => setOpenEditCover(true)
    const handleOpenEditProfilePic = () => setOpenEditProfilePic(true)
    const handleOpenEditProfileData = () => setOpenEditProfileData(true)
    const connections = useSelector(state => state.myConnectionReducer)
    if (user._id === undefined){
        return(<Typography sx={{textAlign:"center",
        fontSize:"28px",fontWeight:"600"}}>Loading...</Typography>)
    }
    return (
        <Box className={styles.root}>
            {/* <Navbar page={"1"} /> */}
            <Box className={styles.wraper}>
                <Box className={styles.main}>

                    <Box className={styles.container}>

                        <img src={user?.cover ? `${process.env.REACT_APP_IMG_BASE_URL}/${user.cover}` : coverImg} alt="Cover_Photo" className={styles.coverImg} />

                        {loginedUser && <IconButton className={styles.coverBtn} onClick={handleOpenEditCover}><ModeEditOutlineRoundedIcon /> </IconButton>}

                        <Box className={styles.avatarWrap}>
                            <Avatar className={styles.avatar}
                                onClick={handleOpenEditProfilePic}
                                
                                src={
                                    user?.image
                                        ? `${process.env.REACT_APP_IMG_BASE_URL}/${user.image}`
                                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQbi0Cq6ANBTGJwu8uGYunx3XKWJJW38NECclo4Iidgg&s"} />
                            {/* {loginedUser && <IconButton className={styles.editBtn}></IconButton>} */}
                        </Box>
                        <Box className={styles.contextBox}>

                            <Box className={styles.textBox}>
                                <Typography className={styles.name}>{user.first_name ? `${user.first_name} ${user.last_name}` : "LinkedIn User"}</Typography>
                                <Typography className={styles.heading}>{user.headline || "Linkedin User Headline"}</Typography>
                                <Typography className={styles.location}>{(true) ? `${user.city || ""}${user.city && user.country && ","} ${user.country || ""}` : "Linkedin User Location"}</Typography>
                            </Box>
                            <Box className={styles.expBox}>

                            </Box>
                            {loginedUser && <IconButton className={styles.profileBtn} onClick={handleOpenEditProfileData}><EditOutlinedIcon /> </IconButton>}
                            {!loginedUser && <IconButton className={styles.profileBtn}><NotificationsActiveOutlinedIcon /> </IconButton>}
                        </Box>
                        <Typography className={styles.connectionText}>{`${connections.myConnections.length || "0"} connections`}</Typography>
                        {
                            loginedUser && <Box className={styles.btnsWrapper}>
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
                        }
                        {
                            !loginedUser && <Box className={styles.btnsWrapper}>
                                <Button className={`${styles.btn1} ${styles.btn}`} onClick={sendMessage}>
                                    <SendIcon />  Message
                                </Button>
                                <Button className={`${styles.btn3} ${styles.btn}`}>
                                    More
                                </Button>
                            </Box>
                        }
                    </Box>

                    <Container title="About" loginedUser={loginedUser} onEdit={() => setOpenEditAbout(true)} >
                        <>
                            {user.about?.body && <ContentBox>
                                <Typography className={styles.contentText}>
                                    {/* As a web developer skilled in the MERN stack, I'm passionate about using technology to create innovative solutions. With experience in merging different technologies, I specialize in developing cutting-edge products. I stay updated on industry trends to remain at the forefront of technological advancements. Let's connect to explore collaboration opportunities in the tech world. */}
                                    {user.about.body}
                                </Typography>
                            </ContentBox>}
                            {user.about?.skills?.length > 0 &&
                                <ContentBox>
                                    <Box className={styles.skillBox}>
                                        <Icon className={styles.skillIcon} sx={{ justifySelf: "left", alignSelf: "top" }}><DiamondOutlinedIcon /> </Icon>
                                        <Box className={styles.skillContentWrap}>
                                            <Typography className={styles.skillContentTitle}>
                                                Top Skills
                                            </Typography>
                                            <Typography className={styles.skillContentContent}>
                                                {
                                                    user.about.skills.map((item, index) => {
                                                        let text = ''
                                                        if (index > 0)
                                                            text += ` • `
                                                        text += item
                                                        return `${text} `
                                                    })
                                                }
                                            </Typography>
                                        </Box>
                                        <IconButton className={styles.skillIcon}><EastOutlinedIcon /></IconButton>
                                    </Box>
                                </ContentBox>}
                        </>
                    </Container>

                    <Container title='Experience' AddBtn={loginedUser} loginedUser={loginedUser} >
                        <ContentBox>
                            <Box className={styles.WrapBoxFlexRow}>
                                <img className={styles.logoImg} src='https://media.licdn.com/dms/image/D560BAQHela1rRQf6Ag/company-logo_100_100/0/1706617303046/zenmonk_logo?e=1721865600&v=beta&t=jFfrRbTgJfHmFUmXd1hW6IIjRsqOVLbtypH7DRMAw3U' alt='compony logo' />

                                <Box className={styles.WrapBoxFlexColumn}>
                                    <Typography className={styles.expRoleTitle}>Full-Stack Developer</Typography>
                                    <Typography className={styles.expRoleSubTitle}>{`Zenmonk · Internship`}</Typography>
                                    <Typography className={styles.expRoleDuration}>{`Jan 2024 - Present · 4 mos`}</Typography>
                                    <Typography className={styles.expRoleLocation}>{`Sahibzada Ajit Singh Nagar, Punjab, India · On-site`}</Typography>
                                    <Typography className={styles.expRoleAbout}>{`Experienced software developer, passionate about creating efficient and scalable solutions. Skilled in MENR stack (MongoDB, Express.js, Node.js, and React.js) development. Dedicated to delivering high-quality code and collaborating with teams to achieve project goals. Open to new challenges and continuous learning in the ever-evolving tech landscape.`}</Typography>
                                </Box>
                            </Box>
                        </ContentBox>
                    </Container>

                    <Container title={'Education'} loginedUser={loginedUser} AddBtn={loginedUser} >
                        <ContentBox>
                            <Box className={styles.WrapBoxFlexRow}>
                                <img className={styles.logoImg} src='https://media.licdn.com/dms/image/C4D0BAQFhoSxToxhXuQ/company-logo_100_100/0/1659503334979?e=1721865600&v=beta&t=2dW1lAzsQptnuUiPgfYli9aYURoXwtBpjcBFqS0p2Fw' alt='compony logo' />
                                <Box className={styles.WrapBoxFlexColumn}>
                                    <Typography className={styles.expRoleTitle}>Chitkara University</Typography>
                                    <Typography className={styles.expRoleDuration}>{`Sep 2021 - Jun 2024`}</Typography>
                                    <Typography className={styles.expRoleSubTitle} sx={{ margin: "4px 0" }}>{`Grade: 9.5 CGPA`}</Typography>
                                </Box>
                            </Box>
                        </ContentBox>
                        <Divider sx={{ width: "calc(100% - 48px)", margin: "0 24px" }} />
                        <ContentBox></ContentBox>
                    </Container>

                    <Container title={'Skills'} loginedUser={loginedUser} AddBtn={false} onEdit={() => { setOpenEditSkills(true) }} >
                        {user?.skills?.length > 0 && user.skills.map((item, index) => {
                            return <React.Fragment>
                                <ContentBox>
                                    <Typography className={styles.skillName}>
                                        {item}
                                    </Typography>
                                </ContentBox>
                                {index !== user.skills.length-1 && <Divider sx={{ width: "calc(100% - 48px)", margin: "0 24px" }} />}
                            </React.Fragment>
                        })}
                        {/* <ContentBox>
                            <Typography className={styles.skillName}>
                                MERN Stack
                            </Typography>
                        </ContentBox>
                        <Divider sx={{ width: "calc(100% - 48px)", margin: "0 24px" }} />
                        <ContentBox>
                            <Typography className={styles.skillName}>
                                MERN Stack
                            </Typography>
                        </ContentBox> */}
                    </Container>

                </Box>
                <Box className={styles.rightPanel}>
                    {loginedUser&& <Box className={styles.editBoxWrap}>
                        <Box className={styles.editBox}>
                            <Box className={styles.editTextWrap}>
                                <Typography className={styles.editTextTitle}>
                                    Profile language
                                </Typography>
                                <Typography className={styles.editTextValue}>
                                    English
                                </Typography>
                            </Box>
                            <IconButton className={styles.editBoxBtn}><EditOutlined /></IconButton>
                        </Box>
                        <Divider sx={{ margin: "16px 0" }} />

                        <Box className={styles.editBox}>
                            <Box className={styles.editTextWrap}>
                                <Typography className={styles.editTextTitle}>
                                    Public profile & URL
                                </Typography>
                                <Typography className={styles.editTextValue}>
                                    {`clone-agdoie.netlify.app/in/${user_id || logined_user.id}`}
                                </Typography>
                            </Box>
                            <IconButton className={styles.editBoxBtn}><EditOutlined /></IconButton>
                        </Box>
                    </Box>}
                    <AdPanalWithFooter />
                </Box>
            </Box>
            {openEditCover && <EditCover open={openEditCover} setOpen={setOpenEditCover} />}
            {openEditProfilePic && loginedUser && <EditProfilePic open={openEditProfilePic} setOpen={setOpenEditProfilePic} />}
            {openEditProfileData && loginedUser && <EditProfileData open={openEditProfileData} setOpen={setOpenEditProfileData} />}
            {openEditAbout && loginedUser && <EditAbout open={openEditAbout} setOpen={setOpenEditAbout} />}
            {openEditSkills && loginedUser && <EditSkills open={openEditSkills} setOpen={setOpenEditSkills} />}
        </Box>
    )
}

const ContentBox = ({ children }) => {
    return (
        <Box className={styles.contentWraper}>
            {children}
        </Box>
    )
}
export default Profile