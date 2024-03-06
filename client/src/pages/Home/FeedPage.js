import React, { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/system'
import { Avatar, Button, ButtonGroup, Divider, Typography } from '@mui/material'
import PhotoSizeSelectActualRoundedIcon from '@mui/icons-material/PhotoSizeSelectActualRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import coverImg from '../../assets/images/cover_img.webp'
import {Plus, Ribbon} from '../../assets/svg/Extras'
import AdPanelWithFooter from '../../components/AdPanelWithFooter'
import Post from '../../components/PostCard/Post.Card'
import { useDispatch, useSelector } from 'react-redux';
import styles from './home.module.css'
import { fetchFeed } from '../../store/PostSlice/Post.api';

function FeedPage({setOpen}) {
    const posts = useSelector((state) => state.Post_reducer.feed)
    const user = useSelector((state) => state.persistedReducer.user) || {}
    const isLoadingPosts = useSelector((state) => state.Post_reducer.isLoading);
    const initialized = useRef(false)
    const dispatch = useDispatch()
    useEffect(() => {

        if (posts.length === 0 && !isLoadingPosts && !initialized.current){
            initialized.current = true
            dispatch(fetchFeed({time:Date.now()}))
            // console.log('posts: ', "usseeffect called");
        }
    }, [dispatch])
    const fetchMorePosts = async ()=>{
        if (isLoadingPosts) return;
        await dispatch(fetchFeed({time:posts[posts.length - 1]?.createdAt}))
    }
    const handleScroll = async (e) => {
        if (window.innerHeight + (Math.ceil(document.documentElement.scrollTop)) <= document.documentElement.scrollHeight -400 || isLoadingPosts) {
            return;
          }
        await fetchMorePosts();
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, [isLoadingPosts]);
  return (
    <Box className={styles.mainBody}>
                <Box className={styles.leftPanel}>
                    <Box className={styles.profile}>
                        <Box className={styles.profileCover} >
                            <img src={coverImg} className={styles.coverPhoto} alt="profile cover" />
                            <Avatar className={styles.profileAvatar} src={user?.image ? `${process.env.REACT_APP_IMG_BASE_URL}/${user.image}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQbi0Cq6ANBTGJwu8uGYunx3XKWJJW38NECclo4Iidgg&s"} />
                            <Typography className={styles.profileName} >{user?.first_name ?  `${user.first_name} ${user.last_name}`: "LinkedIn User"}</Typography>
                            <Typography className={styles.profileHeading} >{user?.heading || "LinkedIn User Heading"}</Typography>
                        </Box>
                        <Box className={styles.profileCounts} >
                            <Box className={styles.profileCount} >
                                <Typography className={styles.profileCountText} >Profile Viewers</Typography>
                                <Typography className={styles.profileCountNumber} >0</Typography>
                            </Box>
                            <Box className={styles.profileCount} >
                                <Typography className={styles.profileCountText} >Post impressions</Typography>
                                <Typography className={styles.profileCountNumber} >0</Typography>
                            </Box>
                        </Box>
                        <Box className={styles.offerSection} >
                            <Typography className={styles.offerSectionText} >Strengthen your profile with an AI writing assistant</Typography>
                            <Typography className={styles.offerSectionBtn} >Reactivate Premium: 50% Off</Typography>
                        </Box>
                        <Box className={styles.myItems} >
                            <Typography className={styles.myItemsBtn}><Ribbon/>My Items</Typography>
                        </Box>
                    </Box>
                    <Box className={styles.discoverTab}>
                        <Typography className={styles.discoverTabBtn} >Groups</Typography>
                        <Typography className={styles.discoverTabBtn} >Events <Plus/></Typography>
                        <Typography className={styles.discoverTabBtn} >Followed Hashtags</Typography>
                        <Divider/>
                        <Button className={styles.discoverBtn} >Discover more</Button>
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
                    <Box className={styles.AddFooter} >
                        <AdPanelWithFooter/>
                    </Box>
                </Box>{/* for suggestion */}
            </Box>
  )
}

export default FeedPage