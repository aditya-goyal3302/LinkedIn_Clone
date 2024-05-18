import React, { useEffect, useState } from 'react'
import styles from './MyNetwork.module.css'
import { Box } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRequests, fetchSuggessions } from '../../store/MyConnections/MyConnection.Api'
import { Tab, Tabs } from '@mui/material'
import GrowPanel from './GrowPanel'
import CatchUpPanel from './CatchUpPanel'
import SidePanel from './SidePanel'

function MyNetwork() {
    
    const dispatch = useDispatch()
    const myConnections = useSelector((state) => state.myConnectionReducer)
    const [rightPanalTab, setRightPanalTab] = useState('1')
    useEffect(() => {
        dispatch(fetchRequests())
        dispatch(fetchSuggessions())
    }, [])
    const handleChange = (event, newValue) => {
        setRightPanalTab(newValue);
    };

    return (
        <Box className={styles.root}>
            <Box className={styles.LeftPanel}>
                <SidePanel />
            </Box>
            <Box className={styles.RightPanel}>
                <Box className={styles.tabPanel} >
                    <Tabs value={rightPanalTab} className={styles.tabsBar} onChange={handleChange} indicatorColor="secondary" aria-label="Right panal">
                        <Tab value='1' className={`${styles.tabBtn} ${rightPanalTab ==='1' ? styles.tabBtnActive:""}`} label="Grow" />
                        <Tab value='2' className={`${styles.tabBtn} ${rightPanalTab ==='2' ? styles.tabBtnActive:""}`} label="Catch up" />
                    </Tabs>
                </Box>
                {rightPanalTab === '1' && <GrowPanel myConnections={myConnections} />}
                {rightPanalTab === '2' && <CatchUpPanel />}
            </Box>
        </Box>
    )
}

export default MyNetwork