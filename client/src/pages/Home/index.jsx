import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFeed } from '../../store/PostSlice/Post.api'
import Post from '../../components/PostCard/Post.Card'
import Navbar from '../../components/Navbar'
import CreatePost from '../../components/CreatePost'
import { Box } from '@mui/system'
import styles from './home.module.css'
import { Avatar, Button, ButtonGroup, Typography } from '@mui/material'
import PhotoSizeSelectActualRoundedIcon from '@mui/icons-material/PhotoSizeSelectActualRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import { useNavigate } from 'react-router-dom'
import coverImg from '../../assets/images/cover_img.webp'

const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const posts = useSelector((state) => state.Post_reducer.feed)
    const user = useSelector((state) => state.persistedReducer.user) || {}
    const [open, setOpen] = useState(false)
    useEffect(() => {
        if (user._id === undefined) {
            navigate('/login')
        }
    }, [])
    useEffect(() => {
        dispatch(fetchFeed(" "))
    }, [dispatch])
    console.log('user: ', user);

    return (
        <div>
            <Navbar className={styles.navbar} />
            <CreatePost open={open} setOpen={setOpen} user={user} />
            <Box className={styles.mainBody}>
                <Box className={styles.leftPanel}>
                    <Box className={styles.profile}>
                        <Box className={styles.profileCover} >
                            <img src={coverImg} className={styles.coverPhoto} alt="profile cover" />
                            <Avatar className={styles.profileAvatar} src={user?.image ? `${process.env.REACT_APP_IMG_BASE_URL}/${user.image}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQbi0Cq6ANBTGJwu8uGYunx3XKWJJW38NECclo4Iidgg&s"} />
                            <Typography className={styles.profileName} >{user?.name || "LinkedIn User"}</Typography>
                            <Typography className={styles.profileHeading} >{user?.heading || "LinkedIn User Heading"}</Typography>
                        </Box>
                        <Box className={styles.profileCover} >
                            
                        </Box>
                    </Box>
                </Box>
                <Box className={styles.posts}>{/* for post */}
                    <Box className={styles.createPostWrap}>
                        <Box className={styles.createPost} >
                            <Box className={styles.createPostWrapHead} >
                                <Avatar className={styles.createPostAvatar} src={user?.image ?
                                    `${process.env.REACT_APP_IMG_BASE_URL}/${user.image}` :
                                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQbi0Cq6ANBTGJwu8uGYunx3XKWJJW38NECclo4Iidgg&s"
                                } />
                                <Box onClick={() => setOpen(true)} className={styles.createPostWrapHeadInput} >Start a post, try writing with AI</Box>
                            </Box>
                            <Box className={styles.createPostWrapBody} >
                                <ButtonGroup className={styles.createPostWrapBodyBtns} variant="text" >
                                    <Button className={styles.createPostWrapBodyBtn} ><PhotoSizeSelectActualRoundedIcon sx={{ color: '#378fe9', height: "20px" }} />&nbsp; Media</Button>
                                    <Button className={styles.createPostWrapBodyBtn} ><CalendarMonthRoundedIcon sx={{ color: '#c37d16', height: "20px" }} />&nbsp; Event</Button>
                                    <Button className={styles.createPostWrapBodyBtn} ><NewspaperRoundedIcon sx={{ color: '#e06847', height: "20px" }} />&nbsp; Write article</Button>
                                </ButtonGroup>
                            </Box>
                        </Box>
                    </Box>{/* for create post */}
                    <Box>
                        {posts.map((post) => {
                            return <Post key={post._id} post={post} />
                        })}
                    </Box>{/* for feed */}
                </Box>
                <Box className={styles.rightPanel}>
                    
                </Box>{/* for suggestion */}
            </Box>

        </div>
    )
}

export default Home
