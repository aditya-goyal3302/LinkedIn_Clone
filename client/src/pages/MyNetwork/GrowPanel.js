import React, { useState } from 'react'
import styles from './MyNetwork.module.css'
import { Box } from '@mui/system'
import { Button, Typography } from '@mui/material'
import RequestUser from '../../components/RequestUserCard/RequestUser.Card'
import UserCard from '../../components/SugessionUserCard/index.Card'
import { useDispatch, useSelector } from 'react-redux'
import { setError } from '../../store/LoginSlice/Login.Slice'


function GrowPanel({ myConnections }) {
    const dispatch = useDispatch()
    const user = useSelector(state=>state.persistedReducer.user)
    const setSnackBarError = ()=>{
        dispatch(setError("Comming Soon"))
    }
    return (
        <>
            <Box className={styles.requestPanel}>
                <Box className={styles.requestPanelHead}>
                    <Typography className={styles.requestTitle}>{myConnections?.requests.length > 0 ? "Pending Requests" : "No pending invitations"}</Typography>
                    <Button className={styles.titleBtn} onClick={setSnackBarError}>Manage</Button>
                </Box>
                {/* <Box className={styles.requestPanelBody}> */}
                {myConnections.requests?.map((request, key) => {
                    return <RequestUser request={request} key={key} />
                })}
                {/* </Box> */}
            </Box>
            <Box className={styles.suggessionPanel}>
                <Box className={styles.suggessionPanelHead}>
                    <Typography className={styles.suggessionTitle} >People you may know based on your recent activity</Typography>
                    <Button className={`${styles.titleBtn} ${styles.titlebtn2}`} onClick={setSnackBarError}>See all</Button>
                </Box>
                <Box className={styles.suggessionPanelBody}>
                    {myConnections.Suggessions?.map((suggession, key) => {
                        return <UserCard user={suggession} key={key} />
                    })}
                </Box>
            </Box>
            <Box className={styles.suggessionPanel}>
                <Box className={styles.suggessionPanelHead}>
                    <Typography className={styles.suggessionTitle} >Existing Connections</Typography>
                    <Button className={`${styles.titleBtn} ${styles.titlebtn2}`} onClick={setSnackBarError}>See all</Button>
                </Box>
                <Box className={styles.suggessionPanelBody}>
                    {myConnections.myConnections?.map((suggession, key) => {
                        console.log('suggession: ', suggession);
                        return <UserCard user={suggession.requested_by._id === user._id ? suggession.sent_to:suggession.requested_by} key={key} isConnected={true} />
                    })}
                </Box>
            </Box>
        </>
    )
}

export default GrowPanel

