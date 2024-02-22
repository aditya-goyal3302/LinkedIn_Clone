import * as React from 'react';
import { Box } from '@mui/system'
import styles from './CreatePost.module.css'
import './CreatePost.css'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Avatar, Divider, Fab, InputBase } from '@mui/material';
import { createPost } from '../../store/PostSlice/Post.api';
import { useDispatch } from 'react-redux';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function CustomizedDialogs() {
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState({})
    console.log('data: ', data);
    const [file, setFile] = React.useState(null)
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
    const handleSubmit = async () => {
        console.log(file)
        try {
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
            
        } catch (error) {
            console.log(error)
        }

    }
    
    return (
        <React.Fragment>

            <button onClick={handleSubmit}>Upload</button>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open dialog
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                className={styles.dialogbox}
            >
                <DialogTitle className={styles.dialogTitle} >
                    <Box className={styles.dialogHeader}>
                        <Avatar className={styles.avatar} />
                        <Box className={styles.dialogHeaderText}>
                            <Typography variant="h6">Username</Typography>
                            <Typography>Location</Typography>
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
                <DialogContent className={styles.dialogContent}>
                    <InputBase
                        className={styles.title}
                        value={data.title}
                        placeholder='Title'
                        onChange={(e) => setData((pre) => { return { ...pre, title: e.target.value } })}
                    />
                    <InputBase
                        className={styles.content}
                        multiline
                        placeholder='What do you want to talk about?'
                        value={data.content}
                        onChange={(e) => setData((pre) => { return { ...pre, content: e.target.value } })}
                    />
                    <input type="file" id="file-picker" multiple onChange={(e) => setFile(e.target.files)} hidden />
                    <Button onClick={(e) => { e.preventDefault(); document.getElementById("file-picker").click() }} className={styles.contentImgBtn}>img</Button>
                </DialogContent>
                <Divider style={{ margin: "0px !important" }} />
                <DialogActions style={{ padding: "12px 24px 12px 16px" }} >
                    <Fab
                        className={styles.postBtn}
                        variant='extended'
                        disabled={(data.content || file) ? false : true}
                        onClick={handleSubmit}
                    >
                        Post
                    </Fab>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}

function CreatePost() {
    return (
        <></>
        // <Box className={styles.root}>
        //     <Dialog open={true} className={styles.dialogbox}>
        //         <Box className={styles.dialogHeader}>
        //             d
        //         </Box>
        //     </Dialog>
        // </Box>
    )
}

export default CustomizedDialogs