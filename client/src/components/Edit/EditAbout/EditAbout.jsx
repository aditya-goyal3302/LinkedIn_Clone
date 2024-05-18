import React, { useState } from 'react'
import { Box, IconButton, InputBase, Snackbar, Typography } from '@mui/material'
import styles from './EditAbout.module.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUser } from '../../../store/LoginSlice/Login.Slice'
import CustomModal from '../../CustomModal/CustomModal'
import CloseIcon from '@mui/icons-material/Close';
import DehazeIcon from '@mui/icons-material/Dehaze';

const EditAbout = ({ open, setOpen }) => {

  const dispatch = useDispatch()
  const state = useSelector(state => state.persistedReducer)
  const user = state.user
  const [snackbar, setSnackbar] = useState('')
  const [value, setValue] = useState({ about: { body: user.about?.body || '', skills: user.about?.skills || [] } })
  console.log('value: ', value);
  const handleClose = () => setOpen(false)
  const handleDelete = (item) =>{
    let arr = [...value.about.skills]
    arr.pop(item)
    setValue(pre=>({about:{...pre.about,skills:arr}}))
  }
  const handleSubmit = async () => {
    if (!value.about.body|| !value.about.skills) {
      setSnackbar("Check For Required Fields")
    }
    else {
      try {
        const resp = await axios.put(`${process.env.REACT_APP_IMG_BASE_URL}/users/`, { data: value }, {
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
        <Typography className={styles.label}>
          You can write about your years of experience, industry, or skills. People also talk about their achievements or previous job experiences.
        </Typography>
        <InputBase
          multiline
          className={styles.input}
          value={value.about.body}
          onChange={(e) => {
            if (e.target.value.length <= 3000) {
              setValue(pre => ({ about: { ...pre.about, body: e.target.value } }))
            }
          }
          }
        />
        <Typography className={styles.count}>
          {`${value.about.body.length}/3000`}
        </Typography>

        <Typography className={styles.heading}>Skills</Typography>
        <Typography className={styles.subHeading}>Show your top skills — add up to 5 skills you want to be known for. They’ll also appear in your Skills section.</Typography>
        {value.about.skills?.length > 0 && value.about.skills.map((item) => <SkillTile title={item} handleDelete={handleDelete} />)}

        {value.about.skills?.length < 5 && <InputBase className={styles.inputSkill} placeholder='Enter Skills Here then press Enter' onKeyDown={(e) => {
          if (e.key === "Enter") {
            let arr = [...value.about.skills, e.target.value]
            setValue(pre => ({ about: { ...pre.about, skills: arr } }))
            e.target.value = ''
          }
        }} />}
        {value.about.skills?.length === 5 && <Typography className={styles.warningMessage}>You’ve reached the 5 skills maximum.</Typography>}
        <Snackbar open={snackbar} message={snackbar} onClose={() => setSnackbar(null)} autoHideDuration={1000} />
      </Box>
    </CustomModal>
  )
}

const SkillTile = ({ title, handleDelete }) => {
  return (
    <Box className={styles.skillTile}>
      <Box className={styles.tileLeft}>
        <IconButton className={styles.skillIcon} onClick={()=>handleDelete(title)}>
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

export default EditAbout