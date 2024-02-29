import { Avatar, Button, Card, CardContent, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import styles from './RequestUser.module.css'
import { useDispatch } from 'react-redux'
import { responseConnectionRequest } from '../../store/MyConnections/MyConnectionThunk'

function RequestUser({ request }) {
    const dispatch = useDispatch()
    const handleAccept = () => {
        dispatch(responseConnectionRequest({id:request._id,requested_by:request.requested_by._id,status:'accepted'}))
    }
    return (
        <Card className={styles.root}>
            <CardContent className={styles.content}>
                <Box className={styles.wrapUser}>
                    <Avatar className={styles.avatar} src={request?.requested_by?.image ? `${process.env.REACT_APP_IMG_BASE_URL}/${request?.requested_by?.image}`: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQbi0Cq6ANBTGJwu8uGYunx3XKWJJW38NECclo4Iidgg&s"} />
                    <Box className={styles.userData}>
                        <Typography className={styles.userName}>{request?.requested_by.firstname ? `${request?.requested_by.firstname} ${request?.requested_by.lastname}`:`Linkedin User`}</Typography>
                        <Typography className={styles.userHeading}>{request?.requested_by.heading ? `${request?.requested_by.heading}`:`Linkedin User Heading`}</Typography>
                        <Typography className={styles.userTime}>Sent 1 day ago</Typography>
                    </Box>
                </Box>
                <Box className={styles.wrapBtns}>
                    <Button onClick={handleAccept} className={styles.rejectBtn}>Ignore</Button>
                    <Button className={styles.acceptBtn}>Accept</Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default RequestUser