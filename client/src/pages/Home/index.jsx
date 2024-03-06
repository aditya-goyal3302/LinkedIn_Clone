import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../../components/Navbar'
import CreatePost from '../../components/CreatePost'
import styles from './home.module.css'
import { useNavigate } from 'react-router-dom'
import FeedPage from './FeedPage'
import MyNetwork from '../MyNetwork'
import Chat from '../Chat/index.Chat'

const Home = () => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.persistedReducer.user) || {}
    const [open, setOpen] = useState(false)
    const [page, setPage] = useState("1")
    useEffect(() => {
        if (user._id === undefined) {
            navigate('/login')
        }
    }, [])
    return (
        <>
            <Navbar className={styles.navbar} setPage={setPage} />
            <CreatePost open={open} setOpen={setOpen} user={user} />
            {page === '1' && <FeedPage setOpen={setOpen} />}
            {page === '2' && <MyNetwork />}
            {page === '5' && <div>Notifications</div>}
            {page === '3' && <div>Jobs</div>}
            {page === '4' && <Chat />}
        </>
    )
}

export default Home
