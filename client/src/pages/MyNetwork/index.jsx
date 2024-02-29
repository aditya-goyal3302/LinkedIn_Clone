import React,{useEffect, useState} from 'react'
import styles from './MyNetwork.module.css'
import { Box } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'  
import { fetchMyConnections,fetchRequests,fetchSuggessions} from '../../store/MyConnections/MyConnectionThunk'
import UserCard from '../../components/SugessionUserCard/index.Card'
import { Typography } from '@mui/material'
import RequestUser from '../../components/RequestUserCard/RequestUser.Card'

function MyNetwork() {
    const dispatch = useDispatch()
    const myConnections = useSelector((state) => state.myConnectionReducer)
    console.log('myConnections: ', myConnections);
    useEffect(() => {
        // dispatch(fetchMyConnections())
        dispatch(fetchRequests())
        dispatch(fetchSuggessions())
        console.log(myConnections)
    },[])
    
    return (
        <Box className={styles.root}>
            <Box className={styles.LeftPanel}>

            </Box>
            <Box className={styles.RightPanel}>
                <Box className={styles.requestPanel}>
                    <Box className={styles.requestPanelHead}>
                        <Typography className={styles.requestTitle}>{myConnections?.requests ? "Pending Requests": "No pending invitations"}</Typography>
                    </Box>
                    {/* <Box className={styles.requestPanelBody}> */}
                        {myConnections.requests?.map((request,key) => {
                            return <RequestUser request={request} key={key}/>
                        })}
                    {/* </Box> */}
                </Box>
                <Box className={styles.suggessionPanel}>
                    <Box className={styles.suggessionPanelHead}>
                        <Typography className={styles.suggessionTitle} >People you may know based on your recent activity</Typography>
                    </Box>
                    <Box className={styles.suggessionPanelBody}>
                        {myConnections.Suggessions?.map((suggession,key) => {
                            return <UserCard user={suggession} key={key}/>
                        })}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default MyNetwork