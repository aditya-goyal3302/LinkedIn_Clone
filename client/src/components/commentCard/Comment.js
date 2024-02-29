import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./comment.module.css";
import { Box } from "@mui/system";
import SubComment from "./SubComments";
import { useDispatch, useSelector } from "react-redux";
import { addCommentReaction, fetchCommentsReactions } from "../../store/ReactionSlice/Reaction.api";
import { ReactionBarSelector } from '@charkour/react-reactions';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import MoreIcon from '@mui/icons-material/MoreHoriz';

function Comment({ comment }) {
  const dispatch = useDispatch();
  const [anchor, setAnchor] = useState(null);
  const id = Boolean(anchor) ? 'simple-popper' : undefined;
  const [reactionBar, setReactionBar] = useState(false);
  useEffect(() => {
    dispatch(fetchCommentsReactions(comment._id));
  },[dispatch])
  const reaction =
    useSelector(
      (state) => state.reactionReducer.reactions?.comment[comment._id]
    ) || {};
  const user = useSelector((state) => state.persistedReducer.user) || {};
  const handleReactionOnComment = (newReaction) => {
    reaction[user._id]?.reaction === newReaction?dispatch(addCommentReaction({ commentId: comment._id, newReaction: "" })):dispatch(addCommentReaction({ commentId: comment._id, newReaction: newReaction }));
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
  const subComments = useSelector((state) => state.commentReducer.content[comment._id]) || [];
  return (
    <Card className={styles.commentRoot}>
      <CardContent className={styles.comment} >
        <Avatar className={styles.commentAvatar} src={comment?.user_id?.image ?
                  `${process.env.REACT_APP_IMG_BASE_URL}/${comment?.user_id?.image}` :
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQbi0Cq6ANBTGJwu8uGYunx3XKWJJW38NECclo4Iidgg&s"
                } />
        <Box className={styles.commentsBox}>
          <Box className={styles.commentAction}>
            <Typography className={styles.commentActionText}>{cal_days(comment.time_stamp)}</Typography>
            <IconButton className={styles.commentActionBtn} >
              <MoreIcon sx={{width:"18px"}} />
            </IconButton>
          </Box>
          <Box className={styles.commentBody}>
            <Box className={styles.commentWraper}>
              <Box className={styles.commentHeader}>
                <Typography className={styles.commentUserUsername}>
                  {comment.user_id?.username || "Linekdin User"}
                </Typography>
                <Typography className={styles.commentUserHeading}>
                  {comment.user_id?.heading || "Linekdin User Heading"}
                </Typography>
              </Box>
              <Box className={styles.commentContent}>
                <Typography className={styles.commentText}>
                  {comment.content}
                </Typography>
              </Box>
            </Box>
            <BasePopup 
              className={styles.reactionSelector}
              open={reactionBar}
              anchor={anchor}
              placement={"top"}
              offset={-6}
              id={id}
              onMouseOver={() => setReactionBar(true)}
              onMouseOut={() =>{setReactionBar(false)}}
            >
              <ReactionBarSelector 
                reactions={[{ label: "like", node: <div>👍</div>, key: "Like" }, { label: "Celebrate", node: <div>👏</div>, key: "Celebrate" }, { label: "support", node: <div>🫰</div>, key: "Support" }, { label: "love", node: <div>❤️</div>, key: "Love" }, { label: "Insightful", node: <div>💡</div>, key: "Insightful" }, { label: "Funny", node: <div>😄</div>, key: "Funny" }]}
                className={styles.reactionSelector} 
                onSelect={(reaction) => handleReactionOnComment(reaction)}
              />
            </BasePopup>

            <Box className={styles.commentFooter}>
              <ButtonGroup variant="text" aria-label="Basic button group">
                <Button
                  className={`${styles.reactionBtn} ${
                    reaction[user._id] ? styles.reactionBtnActive : ""
                  }`}
                  onMouseOver={() => setReactionBar(true)}
                  onMouseOut={() => setReactionBar(false)}
                  ref={setAnchor}
                  onClick={handleReactionOnComment}
                >
                  {reaction[user._id]?.reaction || "like"}{Object.keys(reaction).length > 0 &&  <>• {Object.keys(reaction).length }</>}&nbsp;
                </Button>
                <Button className={styles.reactionBtn}>Reply</Button>
              </ButtonGroup>
            </Box>
          </Box>
          <Box className={styles.subComments}>
           {SubComment&& subComments.map((item)=><SubComment comment={item} />)}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Comment;
