import { Avatar, Button, ButtonGroup, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import styles from "./comment.module.css";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { addCommentReaction } from "../../store/ReactionSlice/Reaction.api";

function SubComment({ comment }) {
    const dispatch = useDispatch();
  const reaction =
    useSelector(
      (state) => state.reactionReducer.reactions?.comment[comment._id]
    ) || {};
  const user = useSelector((state) => state.persistedReducer.user) || {};
  const handleReactionOnComment = () => {
    reaction[user._id] ?dispatch(addCommentReaction({ commentId: comment._id, newReaction: "" })):dispatch(addCommentReaction({ commentId: comment._id, newReaction: "like" }));
  }
  return (
    <Card className={styles.commentRoot}>
      <CardContent className={styles.comment}>
        <Avatar className={styles.subCommentAvatar} src={comment.user_id.image ||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQbi0Cq6ANBTGJwu8uGYunx3XKWJJW38NECclo4Iidgg&s"} />
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
      </CardContent>
    </Card>
  );
}

export default SubComment;
