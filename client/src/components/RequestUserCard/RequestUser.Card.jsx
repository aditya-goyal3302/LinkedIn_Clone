import { Avatar, Button, Card, CardContent, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import styles from './RequestUser.module.css'
import { useDispatch } from 'react-redux'
import { responseConnectionRequest } from '../../store/MyConnections/MyConnection.Api'
import { useNavigate } from 'react-router'

function RequestUser({ request }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [state, setState] = useState(0)
    const [stateView, setStateView] = useState(0)
    const cal_days = (date) => {
        const date1 = new Date(date);
        const date2 = Date.now();
        const diffTime = Math.abs(date2 - date1);
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffTime < (1000 * 60 * 60 * 24)) return "Today";
        else if (days < 2) return "Yesterday";
        else if (days < 7) return `${days} days ago`;
        else if (days < 13) return `1 week ago`;
        else if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
        else if (days < 31) return `${Math.floor(days / 30)} month ago`;
        else if (days < 365) return `${Math.floor(days / 30)} months ago`;
        else return `${Math.floor(days / 365)}y`;
    }
    const handleAccept = async () => {
        setState(1)
        const response = await dispatch(responseConnectionRequest({ id: request._id, requested_by: request.requested_by._id, status: 'accepted' }))
        if (response.payload.status === 'accepted') {
            setState(2)
            setTimeout(() => {
                setStateView(2)
            }, 2000);
        }
    }
    if (stateView === 2) {
        return null
    }
    else
        return (
            <Card className={styles.root}>
                <CardContent className={styles.content}>
                    <Box className={styles.wrapUser} onClick={() => { navigate(`/in/${request?.requested_by._id}`) }}>
                        <Avatar className={styles.avatar} src={request?.requested_by?.image ? `${process.env.REACT_APP_IMG_BASE_URL}/${request?.requested_by?.image}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQbi0Cq6ANBTGJwu8uGYunx3XKWJJW38NECclo4Iidgg&s"} />
                        <Box className={styles.userData}>
                            <Typography className={styles.userName}>{request?.requested_by.first_name ? `${request?.requested_by.first_name || ''} ${request?.requested_by.last_name || ''}` : `Linkedin User`}</Typography>
                            <Typography className={styles.userHeading}>{request?.requested_by.headline ? `${request?.requested_by.headline}` : `Linkedin User Heading`}</Typography>
                            <Typography className={styles.userTime}>{`Sent ${cal_days(request.createdAt)}`}</Typography>
                        </Box>
                    </Box>
                    <Box className={styles.wrapBtns}>
                        <Button className={styles.rejectBtn}>Ignore</Button>
                        <Button onClick={handleAccept} className={styles.acceptBtn} disabled={state >= 1 ? true : false}>{state === 0 ? 'Accept' : state === 2 ? "Accepted" : 'Pending'}</Button>
                    </Box>
                </CardContent>
            </Card>
        )
}

export default RequestUser