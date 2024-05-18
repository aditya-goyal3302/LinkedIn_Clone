import { Box, Button, IconButton, Modal, Typography } from '@mui/material'
import React from 'react'
import styles from './CustomModal.module.css'
import CloseIcon from '@mui/icons-material/Close';

const CustomModal = ({ open, handleClose, title, children, newMode, editMode, handelSubmit }) => {
    return (
        <div>

            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box className={styles.root}>
                    <Box className={styles.Head}>
                        <Typography className={styles.title}>
                            {title}
                        </Typography>
                        <IconButton className={styles.closeBtn} onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {/* <Box sx={{width:"100%", height:"100%"}}> */}
                        {children}

                    {/* </Box> */}

                    <Box className={styles.footer}>
                        <Box className={styles.btnWraper}>
                            {editMode && <Button className={styles.deleteBtn}>
                                Delete
                            </Button>}
                        </Box>
                        <Box className={styles.btnWraper}>
                            {editMode && <Button className={styles.saveBtn} onClick={handelSubmit}>
                                Save Changes
                            </Button>}
                            {newMode && <Button className={styles.saveBtn} onClick={handelSubmit}   >
                                Save
                            </Button>}
                        </Box>
                    </Box>
                </Box>
            </Modal >
        </div>
    )
}



export default CustomModal