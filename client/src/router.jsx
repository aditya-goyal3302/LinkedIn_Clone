import { Navigate } from 'react-router-dom'
import BaseLayout from './layout/BaseLayout'
import NavbarLayout from './layout/NavbarLayout'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home/FeedPage';
import MyNetwork from './pages/MyNetwork';
import Chat from './pages/Chat/index.Chat';
import Notification from './pages/Notification/index.Notification'
import Profile from './pages/Profile/index.Profile';
import NotFound from './pages/NotFound/index';

const route = (isLogined) => {
    const routes = [
        {
            path: 'auth',
            element: isLogined ? <Navigate to={'/'} /> : <BaseLayout />,
            children: [
                {
                    path: 'login',
                    element: <Login />
                },
                {
                    path: 'signup',
                    element: <Signup />
                },
            ]
        },
        {
            path: '',
            element: isLogined? <NavbarLayout /> : <Navigate to={"/auth/login"}/>,
            children: [
                {
                    path: '',
                    element: <Home />
                },
                {
                    path: 'chat',
                    element: <Chat />
                },
                {
                    path: 'my-network',
                    element: <MyNetwork />
                },
                {
                    path: "notifications",
                    element:<Notification/>
                }, 
                {
                    path: "jobs",
                    element: <div>Jobs in progerss </div>
                },
                {
                    path:"in",
                    children:[
                        {
                            path:'',
                            element:<Profile loginedUser={true}/>
                        },
                        {
                            path:':user_id',
                            element:<Profile loginedUser={false}/>
                        }
                    ]
                }
            ]
        },{
            path:"*",
            element:<NotFound/>
        }
    ]
    return routes
}
export default route