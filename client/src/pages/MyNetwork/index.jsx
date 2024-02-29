import React,{useEffect, useState} from 'react'
import styles from './MyNetwork.module.css'
import { Box } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'  
import { fetchMyConnections,fetchRequests,fetchSuggessions} from '../../store/MyConnections/MyConnectionThunk'
import UserCard from '../../components/UserCard/index.Card'
import { Typography } from '@mui/material'

function MyNetwork() {
    const dispatch = useDispatch()
    const myConnections = useSelector((state) => state.myConnectionReducer)
    console.log('myConnections: ', myConnections.Suggessions);
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
                        <Typography className={styles.requestTitle}>No pending invitations</Typography>
                    </Box>
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