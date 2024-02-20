import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFeed } from '../../store/FeedSlice/Feed.Thunk'
import Post from '../../components/Posts/Post'

const Home = () => {
    const dispatch = useDispatch()
    const state = useSelector((state) => state.feed_reducer)
    useEffect(() => {
        dispatch(fetchFeed("hlo"))
    }, [dispatch])

    useEffect(() => {
        console.log(state)
    },[state])

    return (
        <div>
            {state.feed.map((post) => { 
                return <Post key={post._id} post={post} />
            })}
        </div>
    )
}

export default Home
