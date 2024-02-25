import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import styles from './comment.module.css'
import { Avatar, Button, InputBase } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createComment, fetchComments } from '../../store/CommentSlice/Comment.api'
import Comment from './Comment'

function Comments({ postId }) {
  const [newComment, setNewComment] = useState("")
  const dispatch = useDispatch()
  const comments = useSelector((state) => state.commentReducer.content[postId]) || []
  console.log("comments: ", comments)
  useEffect(() => {
    dispatch(fetchComments(postId))
  }, [dispatch, postId])
  const handlePostComment = () => {
    console.log("newComment: ", newComment)
    dispatch(createComment({ postId, content: newComment }))
    setNewComment("")
  }

  return (
    <Box className={styles.root} >
      <Box className={styles.postComment}>
        <Avatar className={styles.postCommentAvatar} src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQbi0Cq6ANBTGJwu8uGYunx3XKWJJW38NECclo4Iidgg&s"} alt="avatar" />
        <Box className={styles.postCommentInput}>
          <InputBase
            sx={{ width: "unset" }}
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className={styles.postCommentInputField}
            endAdornment={<Box>
              <Button></Button>
              <Button></Button>
            </Box>}
          />
          {
            newComment
            &&
            <Button
              className={styles.postBtn}
              variant='extended'
              onClick={handlePostComment}
            >
              Post
            </Button>
          }
        </Box>
      </Box>
      <Box className={styles.comments}>
        {comments  &&
          comments?.map((comment, index) => (
            <Comment key={index} comment={comment} />
          ))}
      </Box>
    </Box>
  )
}

export default Comments