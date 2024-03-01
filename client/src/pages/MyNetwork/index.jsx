import React, { useEffect, useState } from 'react'
import styles from './MyNetwork.module.css'
import { Box } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMyConnections, fetchRequests, fetchSuggessions } from '../../store/MyConnections/MyConnectionThunk'
import UserCard from '../../components/SugessionUserCard/index.Card'
import { Accordion, AccordionDetails, AccordionSummary, MenuItem, Tab, Tabs, Typography } from '@mui/material'
import RequestUser from '../../components/RequestUserCard/RequestUser.Card'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GrowPanel from './GrowPanel'
import CatchUpPanel from './CatchUpPanel'

function MyNetwork() {
    
    const dispatch = useDispatch()
    const myConnections = useSelector((state) => state.myConnectionReducer)
    const [rightPanalTab, setRightPanalTab] = useState('1')
    console.log('myConnections: ', myConnections);
    useEffect(() => {
        // dispatch(fetchMyConnections())
        dispatch(fetchRequests())
        dispatch(fetchSuggessions())
        console.log(myConnections)
    }, [])
    const handleChange = (event, newValue) => {
        setRightPanalTab(newValue);
    };

    return (
        <Box className={styles.root}>
            <Box className={styles.LeftPanel}>
                <Accordion className={`myNetworkAccordion ${styles.myNetworkAccordion}`}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <Typography className={styles.accordionHead}>Manage my network</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={styles.MyNetworkMenu}>
                        <MenuItem className={styles.menuBtn} onClick={''}><Typography>Connections</Typography><Typography>0</Typography></MenuItem>
                        <MenuItem className={styles.menuBtn} onClick={''}><Typography>Contacts</Typography><Typography>0</Typography></MenuItem>
                        <MenuItem className={styles.menuBtn} onClick={''}><Typography>Following & followers</Typography><Typography>0</Typography></MenuItem>
                        <MenuItem className={styles.menuBtn} onClick={''}><Typography>Groups</Typography><Typography>0</Typography></MenuItem>
                        <MenuItem className={styles.menuBtn} onClick={''}><Typography>Events</Typography><Typography>0</Typography></MenuItem>
                        <MenuItem className={styles.menuBtn} onClick={''}><Typography>Pages</Typography><Typography>0</Typography></MenuItem>
                        <MenuItem className={styles.menuBtn} onClick={''}><Typography>Newsletter</Typography><Typography>0</Typography></MenuItem>
                        <MenuItem className={styles.menuBtn} onClick={''}><Typography>Hashtags</Typography><Typography>0</Typography></MenuItem>
                    </AccordionDetails>
                </Accordion>
            </Box>
            <Box className={styles.RightPanel}>
                <Box className={styles.tabPanel} >
                    <Tabs  value={rightPanalTab} className={styles.tabsBar} onChange={handleChange} aria-label="Right panal">
                        <Tab value='1' className={styles.tabBtn} label="Grow" />
                        <Tab value='2' className={styles.tabBtn} label="Catch up" />
                    </Tabs>
                </Box>
                {rightPanalTab === '1' && <GrowPanel myConnections={myConnections} />}
                {rightPanalTab === '2' && <CatchUpPanel />}
            </Box>
        </Box>
    )
}

export default MyNetwork