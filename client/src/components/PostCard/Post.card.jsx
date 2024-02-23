import React,{ useEffect, useState }  from 'react'
import { Box, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, Collapse, Divider, Typography } from '@mui/material'
import styles from './Post.module.css'
import { Avatar } from '@mui/material'
import {Globe} from '../../assets/svg/PostSvg'
import Comments from '../commentCard/index.card'
import { useDispatch,useSelector } from 'react-redux'
import { fetchPostReactions,addPostReaction } from '../../store/ReactionSlice/Reaction.api'

function Post({post}) {
  const [showComments, setShowComments] = useState(false)
  const reaction = useSelector(state => state.reactionReducer.reactions.post[post._id])
  const dispatch = useDispatch()
  // console.log('reaction: ', reaction);
  useEffect(() => {
    dispatch(fetchPostReactions(post._id))
  }, [dispatch,post._id])
  const handlereaction = (reaction) => {
    console.log("reaction",{postId:post._id, reaction})
    dispatch(addPostReaction({postId:post._id, reaction}))
  }

  return (
    <Card className={styles.main}>
      <CardHeader
        className={styles.cardHeader}
        action={
          <Box className={styles.postHeaderWrap}>
            <Box className={styles.subpostHeader}>
              <Avatar className={styles.postHeaderAvatar} src={post?.user_id?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQbi0Cq6ANBTGJwu8uGYunx3XKWJJW38NECclo4Iidgg&s" } alt="avatar" variant="square" />
              <Box className={styles.postHeaderUser}>
                <Typography>{post?.user_id?.username||"LinkedIn User"}</Typography>
                <Typography>1,000,000 followers </Typography>
                <Typography>1d • <Globe/></Typography>
              </Box>
            </Box>
          </Box>
        }
      />
      <CardContent className={styles.cardContent}>
        <Box className={styles.postBody}>
          <Typography className={styles.postTitle}>
            {post?.title}
          </Typography>
          <pre >
            {post?.content}
          </pre>  
          {post?.link && <img src={`${process.env.REACT_APP_IMG_BASE_URL}${post.link[0]}`} alt="postImg" className={styles.postImage} />}
        </Box>
        <Box className={styles.postLikeCount}>
          <Typography className={styles.likeCount}>
            <span className={styles.emojis}>👍</span>
            <span className={styles.emojis}>😂</span>
            <span className={styles.emojis}>❤️</span>
            <span className={styles.count}>{reaction?Object.keys(reaction).length:0}</span>
          </Typography>
        </Box>
        <Divider/>
      </CardContent>
      <CardActions className={styles.cardActions}>
        <ButtonGroup 
          variant="text"
          className={styles.postButtonGroup}
          sx={{ '--ButtonGroup-separatorColor': `none !important` }}
        >
          <Button className={styles.postButton} onClick={()=>handlereaction("like")}>Like</Button>
          <Button className={styles.postButton} onClick={()=>setShowComments(!showComments)}>Comment</Button>
          <Button className={styles.postButton}>Repost</Button>
          <Button className={styles.postButton}>Share</Button>
        </ButtonGroup>
      </CardActions>
      <Collapse in={showComments} timeout="auto" unmountOnExit>
        <Comments postId={post._id}/>
      </Collapse>
    </Card >
  )
}

export default Post