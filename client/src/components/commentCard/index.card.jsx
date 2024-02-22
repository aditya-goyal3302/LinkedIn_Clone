import { Box } from '@mui/system'
import React from 'react'
import styles from './comment.module.css'
import { Avatar, Button, InputBase } from '@mui/material'
import {Fab} from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'  
import { createComment, fetchComments } from '../../store/CommentSlice/Comment.api'

function Comments() {
  const [comments, setComments] = useState([])
  const[newComment, setNewComment] = useState("")
  const dispatch = useDispatch()
  const handlePostComment = () => {
    dispatch(createComment({postId: "65d741322b07fe35c0f4ba20", content: newComment}))
    setNewComment("")
  }

  return (
    <Box className={styles.root} >
        <Box className={styles.postComment}>
            <Avatar className={styles.postCommentAvatar} src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQbi0Cq6ANBTGJwu8uGYunx3XKWJJW38NECclo4Iidgg&s"} alt="avatar"  />
            <Box className={styles.postCommentInput}>
                <InputBase 
                  sx={{width: "unset"}}
                  type="text" 
                  placeholder="Add a comment..." 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className={styles.postCommentInputField}
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

    </Box>
  )
}

export default Comments