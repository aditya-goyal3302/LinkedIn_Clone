import React from 'react'
import CustomModal from '../../CustomModal/CustomModal'

const EditAbout = ({ open, setOpen }) => {
    const handleClose = () => setOpen(false)
    return (
    <CustomModal title={'Edit About'} open={open} handleClose={handleClose} newMode={true} > 
        <>
        vfdjiuf
        </>
    </CustomModal>
  )
}

export default EditAbout