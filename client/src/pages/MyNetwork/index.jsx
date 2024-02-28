import React,{useEffect} from 'react'
import styles from './MyNetwork.module.css'
import { Box } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'  
import { fetchMyConnections,fetchRequests,fetchSuggessions,sendConnectionRequest,responseConnectionRequest } from '../../store/MyConnections/MyConnectionThunk'


function MyNetwork() {
    const dispatch = useDispatch()
    const myConnections = useSelector((state) => state.myConnectionReducer)
    console.log('myConnections: ', myConnections);
    useEffect(() => {
        dispatch(fetchMyConnections())
        dispatch(fetchRequests())
        console.log(myConnections)
    },[])
    return (
        <Box className={styles.root}>
            <Box className={styles.LeftPanel}>

            </Box>
            <Box className={styles.RightPanel}>

            </Box>
        </Box>
    )
}

export default MyNetwork