import React from 'react'
import styles from './MyNetwork.module.css'
import { Box } from '@mui/system'
import { Button, Typography } from '@mui/material'
import RequestUser from '../../components/RequestUserCard/RequestUser.Card'
import UserCard from '../../components/SugessionUserCard/index.Card'


function GrowPanel({ myConnections }) {
  return (
    <>
        <Box className={styles.requestPanel}>
            <Box className={styles.requestPanelHead}>
                <Typography className={styles.requestTitle}>{myConnections?.requests.length>0 ? "Pending Requests" : "No pending invitations"}</Typography>
                <Button className={styles.titleBtn}>Manage</Button>
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
                <Button className={`${styles.titleBtn} ${styles.titlebtn2}`}>See all</Button>
            </Box>
            <Box className={styles.suggessionPanelBody}>
                {myConnections.Suggessions?.map((suggession, key) => {
                    return <UserCard user={suggession} key={key} />
                })}
            </Box>
        </Box>
    </>
  )
}

export default GrowPanel