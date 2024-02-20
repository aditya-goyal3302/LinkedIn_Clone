import React from 'react'
import { Box, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, Divider, Typography } from '@mui/material'
import styles from './Post.module.css'
import { Avatar } from '@mui/material'
import img1 from '../../assets/images/footer_logo.png'
import likeSvg from '../../assets/svg/like.svg'
import {Globe, PostComment, PostRepost, PostSend} from '../../assets/svg/PostSvg'

function Post({post}) {
//   post={
//     user_id: {
//       username: "user1",
//       // image: "https://www.w3schools.com/howto/img_avatar.png"
//     },
//     content: `This is a post body This is a post body 
// This is a post body
// This is a post body`,
//     image: "https://www.w3schools.com/howto/img_avatar.png",
//     title: "Post title",
//     likeCount: 40,
//     // commentCount: 20,
//     // repostCount: 10,
//     // shareCount: 5

//   }
  const img = "https://www.w3schools.com/howto/img_avatar.png"
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
          <pre>
            {post?.content}
          </pre>  
          {post?.link && <img src={post?.link} alt="postImg" className={styles.postImage} />}
        </Box>
        <Box className={styles.postLikeCount}>
          <Typography className={styles.likeCount}>
            <span className={styles.emojis}>👍</span>
            <span className={styles.emojis}>😂</span>
            <span className={styles.emojis}>❤️</span>
            <span className={styles.count}>{post?.likeCount}</span>
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
          <Button className={styles.postButton}>Like</Button>
          <Button className={styles.postButton}>Comment</Button>
          <Button className={styles.postButton}>Repost</Button>
          <Button className={styles.postButton}>Share</Button>
        </ButtonGroup>
      </CardActions>
      
    </Card >
  )
}

export default Post