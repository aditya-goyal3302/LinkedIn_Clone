import React, { useState } from 'react'
import { Box, IconButton, InputBase, Snackbar, Typography } from '@mui/material'
import styles from './EditSkills.module.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUser } from '../../../store/LoginSlice/Login.Slice'
import CustomModal from '../../CustomModal/CustomModal'
import CloseIcon from '@mui/icons-material/Close';
import DehazeIcon from '@mui/icons-material/Dehaze';

const EditSkills = ({ open, setOpen }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => state.persistedReducer)
    const user = state.user
    const [snackbar, setSnackbar] = useState('')
    const [value, setValue] = useState(user?.skills || [])
    console.log('value: ', value);
    const handleClose = () => setOpen(false)
    const handleDelete = (item) => {
        let arr = [...value]
        arr.pop(item)
        setValue(arr)
    }
    const handleSubmit = async () => {
        if (!value) {
            setSnackbar("Check For Required Fields")
        }
        else {
            try {
                const resp = await axios.put(`${process.env.REACT_APP_IMG_BASE_URL}/users/`, { data: {skills:value} }, {
                    headers: {
                        Authorization: state.token
                    }
                })
                dispatch(setUser(resp.data))
                if (resp) {
                    setSnackbar("Sucessfully Updated Data")
                    setTimeout(() => {
                        handleClose()
                    }, 5000)
                }
            } catch (error) {
                console.log('error_in_PP_upload: ', error);
                setSnackbar("Error in Updating Data")
                setTimeout(() => {
                    handleClose()
                }, 5000)
            }
        }
    }

    return (
        <CustomModal title={'Edit About'} open={open} handleClose={handleClose} newMode={true} handelSubmit={handleSubmit} >
            <Box className={styles.root}>
                <Typography className={styles.heading}>Skills</Typography>
                {value?.length > 0 && value.map((item) => <SkillTile title={item} handleDelete={handleDelete} />)}

                {value?.length < 15 && <InputBase className={styles.inputSkill} placeholder='Enter Skills Here then press Enter' onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        let arr = [...value, e.target.value]
                        setValue(arr)
                        e.target.value = ''
                    }
                }} />}
                {value?.length === 15 && <Typography className={styles.warningMessage}>You’ve reached the 15 skills maximum.</Typography>}
                <Snackbar open={snackbar} message={snackbar} onClose={() => setSnackbar(null)} autoHideDuration={1000} />
            </Box>
        </CustomModal>
    )
}

const SkillTile = ({ title, handleDelete }) => {
    return (
        <Box className={styles.skillTile}>
            <Box className={styles.tileLeft}>
                <IconButton className={styles.skillIcon} onClick={() => handleDelete(title)}>
                    <CloseIcon />
                </IconButton>
                <Typography className={styles.skillName}>
                    {title}
                </Typography>
            </Box>
            <Box className={styles.tileRight}>
                <IconButton className={styles.skillIcon}>
                    <DehazeIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

export default EditSkills