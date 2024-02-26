import React, { useEffect, useState } from "react";
import { Box, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, Collapse, Divider, Typography } from "@mui/material";
import styles from "./Post.module.css";
import { Avatar } from "@mui/material";
import { Globe } from "../../assets/svg/PostSvg";
import Comments from "../commentCard/index.card";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostReactions, addPostReaction } from "../../store/ReactionSlice/Reaction.api";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import SendIcon from '@mui/icons-material/Send';
import { ReactionBarSelector, ReactionCounter } from '@charkour/react-reactions';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';


function Post({ post }) {
  const [showComments, setShowComments] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const userId = useSelector((state) => state.persistedReducer.user._id);
  const reaction = useSelector((state) => state.reactionReducer.reactions.post[post._id]) || {};
  const dispatch = useDispatch();
  const [reactionBar, setReactionBar] = useState(false);
  const reactionLogo = {
    Like: "👍",
    Celebrate: "👏",
    Support: "🫰",
    Love: "❤️",
    Insightful: "💡",
    Funny: "😄",
  }
  useEffect(() => {
    dispatch(fetchPostReactions(post._id));
  }, [dispatch, post._id]);
  const handlereaction = (newReaction) => {
    if (newReaction !== reaction[userId]?.reaction || reaction[userId] === undefined) {
      dispatch(addPostReaction({ postId: post._id, newReaction }));
    }
    else dispatch(addPostReaction({ postId: post._id, newReaction: '' }));
  };
  const id = Boolean(anchor) ? 'simple-popper' : undefined;

  return (
    <Card className={styles.main}>
      <CardHeader
        className={styles.cardHeader}
        action={
          <Box className={styles.postHeaderWrap}>
            <Box className={styles.subpostHeader}>
              <Avatar
                className={styles.postHeaderAvatar}
                src={
                  post?.userId?.image ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQbi0Cq6ANBTGJwu8uGYunx3XKWJJW38NECclo4Iidgg&s"
                }
                alt="avatar"
                variant="square"
              />
              <Box className={styles.postHeaderUser}>
                <Typography>
                  {post?.user_id?.username || "LinkedIn User"}
                </Typography>
                <Typography>1,000,000 followers </Typography>
                <Typography>
                  {Date(post.time_stamp)} • <Globe />
                </Typography>
              </Box>
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
          reactions={[{ label: "like", node: <div>👍</div>, key: "Like" }, { label: "Celebrate", node: <div>👏</div>, key: "Celebrate" }, { label: "support", node: <div>🫰</div>, key: "Support" }, { label: "love", node: <div>❤️</div>, key: "Love" }, { label: "Insightful", node: <div>💡</div>, key: "Insightful" }, { label: "Funny", node: <div>😄</div>, key: "Funny" }]}
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
            onClick={() => handlereaction(reaction[userId]?.reaction||"Like")}
            onMouseOver={() => setReactionBar(true)}
            onMouseOut={() => setReactionBar(false)}
            ref={setAnchor}
            style={{ color: reaction[userId]?.reaction === "like" ? "blue !important" : "black" }}
          >
            {reactionLogo[reaction[userId]?.reaction] ||<ThumbUpOutlinedIcon />}&nbsp; {reaction[userId]?.reaction || "like"}
          </Button>
          <Button
            className={styles.postButton}
            onClick={() => setShowComments(!showComments)}
          >
            <CommentOutlinedIcon />&nbsp; Comment
          </Button>
          <Button
            className={styles.postButton}
          >
            <RepeatOutlinedIcon />&nbsp; Repost
          </Button>
          <Button
            className={styles.postButton}
          >
            <SendIcon />&nbsp;Share
          </Button>
        </ButtonGroup>
      </CardActions>
      <Collapse in={showComments} timeout="auto" unmountOnExit>
        <Comments postId={post._id} />
      </Collapse>
    </Card>
  );
}

export default Post;
