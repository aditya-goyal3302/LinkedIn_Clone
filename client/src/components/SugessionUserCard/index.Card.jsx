import { Avatar, Button, Card, CardActions, CardContent,  IconButton, Link, Typography } from '@mui/material'
import React, { useState } from 'react'
import styles from './UserCard.module.css'
import { Box } from '@mui/system'
import coverImg from '../../assets/images/cover_img.webp'
import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import { useDispatch } from 'react-redux';
import { sendConnectionRequest} from '../../store/MyConnections/MyConnection.Api'

function UserCard({user}) {
  const dispatch = useDispatch()
  const [removed, setRemoved] = useState(false)
  const [pending, setPending] = useState(false)
  const handleConnect = () => {
    dispatch(sendConnectionRequest(user._id))
    setPending(true)
    // console.log('user._id: ', user._id);
  }
  // const 
  if(removed) return null
  return (
    <Card className={styles.root}>
        <CardContent className={styles.content} onClick={""}>
          <Box>
              <img src={user?.cover_image?`${process.env.REACT_APP_IMG_BASE_URL}/${user.cover_image}`:coverImg} alt="Cover_Photo" className={styles.coverImg} />
              <IconButton className={styles.clearBtn}>
                  <CloseIcon onClick={()=>setRemoved(true)}/>
              </IconButton>
          </Box>
          <Avatar src={user?.image?`${process.env.REACT_APP_IMG_BASE_URL}/${user.image}`:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQbi0Cq6ANBTGJwu8uGYunx3XKWJJW38NECclo4Iidgg&s"} alt={user.first_name||"A"} className={styles.Avatar} />
          {/* <CardHeader title={user?.name||"LinkedIn User"} subheader={user?.heading||"Full Stack Developer"} /> */}
          <Link className={styles.UserName}>{user?.first_name ? `${user?.first_name} ${user?.last_name}`:"LinkedIn User"}</Link>
          <Typography className={styles.UserRole}>{user?.heading||"Full Stack Developer"}</Typography>
        </CardContent>
        <CardActions className={styles.CardAction}>
          <Box className={styles.Reference}> </Box>
          {pending === false && <Button onClick={handleConnect} className={styles.connectBtn}><PersonAddIcon/> Connect</Button>}
          {pending === true && <Button onClick={handleConnect} className={styles.PendingBtn} ><QueryBuilderIcon/> Pending</Button>}
          
        </CardActions>
    </Card>
  )
}

export default UserCard