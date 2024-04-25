import React, { useState } from 'react'
import CustomModel from '../../CustomModal/CustomModal'
import { Box, FormGroup, FormLabel, InputBase, Snackbar } from '@mui/material'
import styles from './EditProfileData.module.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUser } from '../../../store/LoginSlice/Login.Slice'

const EditProfileData = ({ open, setOpen, }) => {
    const dispatch = useDispatch()
    const state = useSelector(state=>state.persistedReducer)
    const user = state.user
    const [snackbar, setSnackbar] = useState()
    // console.log('user: ', user);
    const [value, setValue] = useState({
        first_name:user?.first_name||'',
        last_name:user?.last_name||"",
        headline:user?.headline||"",
        current_position:user?.current_position||'',
        country:user?.country||"",
        city:user?.city||'',
        phone_number:user?.phone_number||"",
        fax_number:user?.fax_number||"",
        email:user?.email||"",
        // username:user?.username ||"",
        // summary:user?.summary||""
    })
    const handleClose = () => setOpen(false)
    // console.log('value: ', value);

    const handleSubmit = async () =>{
        if(!value.first_name || !value.last_name || !value.headline ||  !value.city || !value.country){
            setSnackbar("Check For Required Fields")
        }
        else{
            try {
                const resp = await axios.put(`${process.env.REACT_APP_IMG_BASE_URL}/users/`, {data:value}, {
                    headers: {
                        // "Content-Type": "multipart/form-data",
                        Authorization: state.token
                    }
                })
                // console.log('resp: ', resp);
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
        <CustomModel title={"Edit Intro"} open={open} newMode={true} handleClose={handleClose} handelSubmit={handleSubmit} >
            <Box className={styles.root}>

                <FormSet title={"First Name"} required={true} tag={'first_name'} value={value.first_name} setValue={setValue} />
                <FormSet title={"Last Name"} required={true} tag={'last_name'} value={value.last_name} setValue={setValue} />
                <FormSet title={"Headline"} type={'textarea'} required={true} tag={'headline'} value={value.headline} setValue={setValue} />
                {/* <FormSet title={"Current Position"} required={true} tag={'current_position'} value={value.current_position} setValue={setValue} /> */}
                {/* <FormSet title={"Summary"} type={'textarea'} required={true} tag={'summary'} value={value.summary} setValue={setValue} /> */}

                <FormLabel className={styles.wrapperLabel}>Location</FormLabel>
                <FormSet title={"Counrty/Region"} required={true} tag={'country'} value={value.country} setValue={setValue} />
                <FormSet title={"City"} required={true} tag={'city'} value={value.city} setValue={setValue} />

                <FormLabel className={styles.wrapperLabel}>Contact Info</FormLabel>
                <FormSet title={"Phone Number"} required={false} tag={'phone_number'} value={value.phone_number} setValue={setValue} />
                <FormSet title={"Fax Number"} required={false} tag={'fax_number'} value={value.fax_number} setValue={setValue} />
                <FormSet title={"Email (Can't be changed from here)"} disabled={true} required={false} tag={'email'} value={value.email} setValue={setValue} />
                {/* <FormSet title={"Username (Can't be changed from here)"} disabled={true} required={false} tag={'username'} value={value.username} setValue={setValue} /> */}

                <Snackbar open={snackbar} message={snackbar} onClose={() => setSnackbar(null)} autoHideDuration={1000} />

            </Box>
        </CustomModel>
    )
}
const FormSet = ({ title, value, setValue, type, tag, required, disabled }) => {
    return (
        <FormGroup className={styles.formGroup}>
            <FormLabel className={styles.label} required={required}>
                {title}
            </FormLabel>
            <InputBase className={styles.input} disabled={disabled||false} value={value} type={type} multiline={type === 'textarea'} onChange={(e) => { setValue(pre => ({ ...pre, [tag]: e.target.value })) }} />
        </FormGroup>
    )
}

export default EditProfileData
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   