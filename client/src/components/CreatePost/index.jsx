import * as React from 'react';
import { Box } from '@mui/system'
import styles from './CreatePost.module.css'
import './CreatePost.css'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Avatar, Divider, Fab, InputBase } from '@mui/material';
import { createPost } from '../../store/PostSlice/Post.api';
import PhotoSizeSelectActualRoundedIcon from '@mui/icons-material/PhotoSizeSelectActualRounded';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import {ThreeCircles} from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

function CreatePost({ open, setOpen}) {
    const dispatch = useDispatch()
    const [data, setData] = React.useState({})
    // console.log('data: ', data);
    const [file, setFile] = React.useState(null)
    
    const handleClose = () => {
        setOpen(false);
    };
    const [isLoading, setIsLoading] = useState(false)
    const user = useSelector((state) => state.persistedReducer.user)
    // console.log('user: ', user);
    const handleSubmit = async () => {
        console.log(file)
        try {
            setIsLoading(true)
            const formData = new FormData()
            formData.append('title', data.title)
            formData.append('content', data.content)
            if (file) {
                for (let i = 0; i < file.length; i++) {
                    formData.append('link', file[i])
                }
            }
            const res = await dispatch(createPost(formData))
            console.log(res)
            setData({})
            setFile(null)
            setOpen(false)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }

    }
    
    return (
        <React.Fragment>
            <Dialog 
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                // height="100%"
                className={`dialogbox ${styles.dialog}`}
            >
                {isLoading &&
                    <Box className={styles.loader}>
                    <ThreeCircles
                        visible={true}
                        height="100"
                        width="100"
                        color="#4fa94d"
                        ariaLabel="three-circles-loading"
                        // wrapperStyle={{backgroundColor: "#00000050"}}
                        wrapperClass={styles.loaderWrapper}
                    />
                </Box>}
                <DialogTitle className={styles.dialogTitle} >
                    <Box className={styles.dialogHeader}>
                        <Avatar className={styles.avatar} src={user?.image ?
                                    `${process.env.REACT_APP_IMG_BASE_URL}/${user.image}` :
                                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQbi0Cq6ANBTGJwu8uGYunx3XKWJJW38NECclo4Iidgg&s"
                                } />
                        <Box className={styles.dialogHeaderText}>
                            <Typography variant="h6">{`${user.first_name} ${user.last_name}`}</Typography>
                            <Typography>Post to Anyone</Typography>
                        </Box>
                    </Box>
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent sx={{padding:2}} className={styles.dialogContent}>
                    <InputBase
                        disabled ={isLoading} 
                        className={styles.title}
                        value={data.title}
                        placeholder='Title'
                        onChange={(e) => setData((pre) => { return { ...pre, title: e.target.value } })}
                    />
                    <InputBase
                        disabled ={isLoading} 
                        className={styles.content}
                        multiline
                        placeholder='What do you want to talk about?'
                        value={data.content}
                        onChange={(e) => setData((pre) => { return { ...pre, content: e.target.value } })}
                    />

                    <Box className={styles.createPostBtns}>
                        <Button className={`${styles.aibtn} ${styles.contentImgBtn}`} > <AutoAwesomeIcon sx={{color:'#c37d16', height:"16px"}}/>Rewrite with AI </Button>
                        <input type="file" id="file-picker" multiple onChange={(e) => setFile(e.target.files)} hidden />
                        <Button disabled ={isLoading} onClick={(e) => { e.preventDefault(); document.getElementById("file-picker").click() }} className={styles.contentImgBtn}><PhotoSizeSelectActualRoundedIcon sx={{color:'#00000099', height:"20px"}}/>&nbsp; </Button>
                        <Button className={styles.contentImgBtn}  > <CalendarMonthRoundedIcon sx={{color:'#00000099', height:"20px"}}/>&nbsp; </Button>
                    </Box>
                </DialogContent>
                <Divider style={{ margin: "0px !important" }} />
                <DialogActions sx={{padding: "12px 24px 12px 16px" }}>
                    <Fab
                        className={styles.postBtn}
                        variant='extended'
                        disabled={((data.content && file && data.title) ? false : true)|| isLoading}
                        onClick={handleSubmit}
                    >
                        Post
                    </Fab>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}


export default CreatePost