import React, { useEffect, useState } from 'react'
import CustomModal from '../../CustomModal/CustomModal'
import { Box, FormGroup, FormLabel, Snackbar, Typography } from '@mui/material'
import DZicon from '../../../assets/svg/DZicon.svg'
import styles from './EditProfilePic.module.css'
import { MyDropzone } from '../../Dropzone'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../../store/LoginSlice/Login.Slice'

const EditProfilePicture = ({ open, setOpen }) => {
    // const handleOpen = () =>setOpen(true)
    const user = useSelector(state => state.persistedReducer)
    const dispatch  = useDispatch()
    const [file, setFile] = useState([])
    const [snackbar, setSnackbar] = useState()
    useEffect(() => {
        if (file.length > 0 && file[0]?.url === undefined && (file[0].type === 'image/jpeg' || file[0].type === 'image/jpg' || file[0].type === 'image/png')) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setFile([{ data: file, url: e.target?.result }])
            }
            reader.readAsDataURL(file[0])
        }
    }, [file])
    const handleClose = () => setOpen(false)

    const handelSubmit = async () => {
        if(file.length > 0){
            const form = new FormData()
            // console.log(file[0].data)
            form.append('image', file[0].data)
            // console.log(form.get('image'))
            try {
                const resp = await axios.post(`${process.env.REACT_APP_IMG_BASE_URL}/users/profile_pic`, form, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: user.token
                    }
                })
                dispatch(setUser(resp.data))
                if (resp) {
                    setSnackbar("Sucessfully Changed Profile Picture")
                    const timeout = setTimeout(() => {
                        handleClose()
                    }, 5000)
                }
            } catch (error) {
                console.log('error_in_PP_upload: ', error);
                setSnackbar("Error in Changing Profile Picture")
                const timeout = setTimeout(() => {
                    handleClose()
                }, 5000)
            }
        }
        else
            setSnackbar("Select a Image First")
    }

    return (
        <CustomModal open={open} handleClose={handleClose} title={'Profile Picture'} newMode={true} handelSubmit={handelSubmit}>
            <Box className={styles.root}>
                <MyDropzone setFiles={setFile} className={styles.dropzone} multiple={false} >
                    <Snackbar open={snackbar} message={snackbar} onClose={() => setSnackbar(null)} autoHideDuration={4500} />
                    <Box className={styles.dropzoneWrap}>
                        <img src={DZicon} alt='img' />
                        <Typography className={styles.DZtext}>Drop your images here, or browse</Typography>
                        <Typography className={styles.DZtext}>Jpeg,png are allowed</Typography>
                    </Box>
                </MyDropzone>
                {file[0]?.url && <Box className={styles.previewWrap}>
                    <Typography className={styles.previewText}>Preview: </Typography>
                    <img className={styles.preview} src={file[0].url} alt='' />
                </Box>}
            </Box>
        </CustomModal>
    )
}
export default EditProfilePicture

                                                                                                                                                                                                                                                                         