import React, { useEffect, useState } from "react";
import { Box, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, Collapse, Divider, Typography } from "@mui/material";
import styles from "./Post.module.css";
import { Avatar } from "@mui/material";
import  { Globe, ThumbUpOutlinedIcon, ThumbUpOutlinedIconFilled, CommentOutlinedIcon, RepeatOutlinedIcon, SendIcon} from "../../assets/svg/PostSvg";
import Comments from "../CommentCard/index.card";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostReactions, addPostReaction } from "../../store/ReactionSlice/Reaction.api";
import { ReactionBarSelector, ReactionCounter } from '@charkour/react-reactions';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { Plus } from "../../assets/svg/Extras";
import { useNavigate } from "react-router-dom";


function Post({ post }) {
  const navigate = useNavigate()
  // console.log('post: ', post);
  const [showComments, setShowComments] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const user = useSelector((state) => state.persistedReducer.user);
  const reaction = useSelector((state) => state.reactionReducer.reactions.post[post._id]) || {};
  const dispatch = useDispatch();
  const [reactionBar, setReactionBar] = useState(false);
  const reactionLogo = {
    Like: <ThumbUpOutlinedIconFilled />,
    Celebrate: "👏",
    Support: "🫰",
    Love: "❤️",
    Insightful: "💡",
    Funny: "😄",
  }
  const cal_days = (date) => {
    const date1 = new Date(date);
    const date2 =  Date.now();
    const diffTime = Math.abs(date2 - date1);
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    if(diffTime<(1000 * 60 * 60 * 24)) return "Today";
    else if(days<2) return "Yesterday";
    else if(days<7) return `${days}d`;
    else if(days<30) return `${Math.floor(days/7)}w`;
    else if(days<365) return `${Math.floor(days/30)}m`;
    else return `${Math.floor(days/365)}y`;
  }
  useEffect(() => {
    dispatch(fetchPostReactions(post._id));
  }, [dispatch, post._id]);
  const handlereaction = (newReaction) => {
    if (newReaction !== reaction[user._id]?.reaction || reaction[user._id] === undefined) {
      dispatch(addPostReaction({ postId: post._id, newReaction }));
    }
    else dispatch(addPostReaction({ postId: post._id, newReaction: '' }));
  };
  const id = Boolean(anchor) ? 'simple-popper' : undefined;
// console.log("post: ", post);
const navigateToProfile=()=>{
  if(post.user_id._id === user._id)
    navigate('/in')
  else 
    navigate(`/in/${post.user_id._id}`)
}
  return (
    <Card className={styles.main}>
      <CardHeader
        className={styles.cardHeader}
        action={
          <Box className={styles.postHeaderWrap}>
            <Box className={styles.subpostHeader}>
              <Avatar
                className={styles.postHeaderAvatar}
                onClick={navigateToProfile}
                src={post?.user_id?.image ?
                  `${process.env.REACT_APP_IMG_BASE_URL}/${post?.user_id?.image}` :
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQbi0Cq6ANBTGJwu8uGYunx3XKWJJW38NECclo4Iidgg&s"
                }
                alt={post?.user_id?.first_name ||"avatar"}
              />
              <Box className={styles.postHeaderUser}>
                <Typography onClick={navigateToProfile}>
                  {post?.user_id?.first_name ? `${post?.user_id?.first_name} ${post?.user_id?.last_name}` : "LinkedIn User"}
                </Typography>
                <Typography>{post?.user_id?.headline||"Linkedin User Heading "}</Typography>
                <Typography className={styles.timeText}>
                  {cal_days(post.createdAt)} •&nbsp;<Globe />
                </Typography>
              </Box>
              <Button className={styles.followBtn}>
                <Plus color="#0a66c2"/> Follow
              </Button>
            </Box>
          </Box>
        }
      />
      <CardContent className={styles.cardContent}>
        <Box className={styles.postBody}>
          <Typography className={styles.postTitle}>{post?.title}</Typography>
          <pre>{post?.content}</pre>
          {post?.link && (
            <img
              src={`${process.env.REACT_APP_IMG_BASE_URL}/${post.link[0]}`}
              alt="postImg"
              className={styles.postImage}
            />
          )}
        </Box>
        <Box className={styles.postLikeCount}>
          <Typography className={styles.likeCount}>
            <span className={styles.emojis}>👍</span>
            <span className={styles.emojis}>😂</span>
            <span className={styles.emojis}>❤️</span>
            <span className={styles.count}>
              {reaction ? Object.keys(reaction).length : 0}
            </span>
          </Typography>
        </Box>
        <Divider />
      </CardContent>

      <BasePopup
        className={styles.reactionSelector}
        open={reactionBar}
        anchor={anchor}
        placement={"top"}
        offset={-6}
        id={id}
        onMouseOver={() => setReactionBar(true)}
        onMouseOut={() => { setReactionBar(false) }}
      >
        <ReactionBarSelector
          className={styles.reactionSelector}
          onSelect={(reaction) => handlereaction(reaction)}
          reactions={[{ label: "Like", node: <div><ThumbUpOutlinedIconFilled /></div>, key: "Like" }, { label: "Celebrate", node: <div>👏</div>, key: "Celebrate" }, { label: "Support", node: <div>🫰</div>, key: "Support" }, { label: "Love", node: <div>❤️</div>, key: "Love" }, { label: "Insightful", node: <div>💡</div>, key: "Insightful" }, { label: "Funny", node: <div>😄</div>, key: "Funny" }]}
        />
      </BasePopup>

      <CardActions className={styles.cardActions}>
        <ButtonGroup
          variant="text"
          className={styles.postButtonGroup}
          sx={{ "--ButtonGroup-separatorColor": `none !important` }}
        >
          <Button
            className={styles.postButton}
            onClick={() => handlereaction(reaction[user._id]?.reaction||"Like")}
            onMouseOver={() => setReactionBar(true)}
            onMouseOut={() => setReactionBar(false)}
            ref={setAnchor}
            style={{ color: reaction[user._id]?.reaction === "Like" ? "blue !important" : "black" }}
          >
            {reactionLogo[reaction[user._id]?.reaction] ||<ThumbUpOutlinedIcon />}&nbsp; {reaction[user._id]?.reaction || "Like"}
          </Button>
          <Button
            className={styles.postButton}
            onClick={() => setShowComments(!showComments)}
          >
            <CommentOutlinedIcon />&nbsp;Comment
          </Button>
          <Button
            className={styles.postButton}
          >
            <RepeatOutlinedIcon />&nbsp;Repost
          </Button>
          <Button
            className={styles.postButton}
          >
            <SendIcon />&nbsp;Share
          </Button>
        </ButtonGroup>
      </CardActions>
      <Collapse in={showComments} timeout="auto" unmountOnExit>
        <Comments postId={post._id} image={user.image}/>
      </Collapse>
    </Card>
  );
}

export default Post;
