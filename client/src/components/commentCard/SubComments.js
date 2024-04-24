import { Avatar, Button, ButtonGroup, Card, CardContent, IconButton, Typography } from "@mui/material";
import React from "react";
import styles from "./comment.module.css";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import MoreIcon from '@mui/icons-material/MoreHoriz';
import { addCommentReaction } from "../../store/ReactionSlice/Reaction.api";

function SubComment({ comment }) {
  console.log('comment: ', comment);
  const dispatch = useDispatch();
  const reaction =
    useSelector(
      (state) => state.reactionReducer.reactions?.comment[comment._id]
    ) || {};
  const user = useSelector((state) => state.persistedReducer.user) || {};
  const handleReactionOnComment = () => {
    reaction[user._id] ? dispatch(addCommentReaction({ commentId: comment._id, newReaction: "" })) : dispatch(addCommentReaction({ commentId: comment._id, newReaction: "like" }));
  }
  const cal_days = (date) => {
    // console.log('date: ', date);
    const date1 = new Date(date);
    const date2 = Date.now();
    const diffTime = Math.abs(date2 - date1);
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffTime < (1000 * 60 * 60 * 24)) return "Today";
    else if (days < 2) return "Yesterday";
    else if (days < 7) return `${days}d`;
    else if (days < 30) return `${Math.floor(days / 7)}w`;
    else if (days < 365) return `${Math.floor(days / 30)}m`;
    else return `${Math.floor(days / 365)}y`;
  }
  return (
    <Card className={styles.commentRoot}>
      <CardContent className={styles.comment}>
        <Avatar className={styles.subCommentAvatar} src={`${process.env.REACT_APP_IMG_BASE_URL}/${comment.user_id.image}` || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQbi0Cq6ANBTGJwu8uGYunx3XKWJJW38NECclo4Iidgg&s"} />
        <Box className={styles.commentsBox}>
          <Box className={styles.commentAction}>
            <Typography className={styles.commentActionText}>{cal_days(comment.time_stamp || comment.createdAt)}</Typography>
            <IconButton className={styles.commentActionBtn} >
              <MoreIcon sx={{ width: "18px" }} />
            </IconButton>
          </Box>
          <Box className={styles.commentBody}>
            <Box className={styles.commentWraper}>
              <Box className={styles.commentHeader}>
                <Typography className={styles.commentUserUsername}>
                  {comment.user_id.first_name ? `${comment.user_id.first_name} ${comment.user_id.last_name}` : "Linekdin User"}
                </Typography>
                <Typography className={styles.commentUserHeading}>
                  {comment.user_id.headline || "Linekdin User Heading"}
                </Typography>
              </Box>
              <Box className={styles.commentContent}>
                <Typography className={styles.commentText}>
                  {comment.content}
                </Typography>
              </Box>
            </Box>
            <Box className={styles.commentFooter}>
              <ButtonGroup variant="text" aria-label="Basic button group">
                <Button
                  className={`${styles.reactionBtn} ${reaction[user._id] ? styles.reactionBtnActive : ""
                    }`}
                  onClick={handleReactionOnComment}
                >
                  like • {Object.keys(reaction).length || 0}&nbsp;
                </Button>
                {/* <Button className={styles.reactionBtn}>Reply</Button> */}
              </ButtonGroup>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default SubComment;
                                                                                                                                                                                  