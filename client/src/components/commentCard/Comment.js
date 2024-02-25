import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import styles from "./comment.module.css";
import { Box } from "@mui/system";
import SubComment from "./SubComments";
import { useDispatch, useSelector } from "react-redux";
import { addCommentReaction } from "../../store/ReactionSlice/Reaction.api";

function Comment({ comment }) {
  const dispatch = useDispatch();
  const reaction =
    useSelector(
      (state) => state.reactionReducer.reactions?.comment[comment._id]
    ) || {};
  const user = useSelector((state) => state.persistedReducer.user) || {};
  const handleReactionOnComment = () => {
    reaction[user._id] ?dispatch(addCommentReaction({ commentId: comment._id, newReaction: "" })):dispatch(addCommentReaction({ commentId: comment._id, newReaction: "like" }));
  }
  const subComments = useSelector((state) => state.commentReducer.content[comment._id]) || [];
  return (
    <Card className={styles.commentRoot}>
      <CardContent className={styles.comment}>
        <Avatar className={styles.commentAvatar} />
        <Box className={styles.commentsBox}>
          <Box className={styles.commentBody}>
            <Box className={styles.commentWraper}>
              <Box className={styles.commentHeader}>
                <Typography className={styles.commentUserUsername}>
                  {comment.userId?.username || "Linekdin User"}
                </Typography>
                <Typography className={styles.commentUserHeading}>
                  {comment.userId?.heading || "Linekdin User Heading"}
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
                  className={`${styles.reactionBtn} ${
                    reaction[user._id] ? styles.reactionBtnActive : ""
                  }`}
                  onClick={handleReactionOnComment}
                >
                  like • {Object.keys(reaction).length || 0}&nbsp;
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
