import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../../components/Navbar'
import styles from './home.module.css'
import { useNavigate } from 'react-router-dom'
import FeedPage from './FeedPage'
import MyNetwork from '../MyNetwork'
import Chat from '../Chat/index.Chat'
import Notification from '../Notification/index.Notification'

const Home = () => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.persistedReducer.user) || {}
    const [page, setPage] = useState("")
    useEffect(() => {
        if (user._id === undefined) {
            navigate('/login')
        }
        else{
            setPage('1')
        }
    }, [])
    return (
        <>
            <Navbar className={styles.navbar} setPage={setPage} />
            {page === '1' && <FeedPage />}
            {page === '2' && <MyNetwork />}
            {page === '5' && <Notification/>}
            {page === '3' && <div>Jobs</div>}
            {page === '4' && <Chat />}
        </>
    )
}

export default Home
