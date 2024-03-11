import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import styles from "./NotificationCard.module.css";
import MoreHoriz from "@mui/icons-material/MoreHoriz";

const NotificationCard = ({ data }) => {
  const user = data?.user;
  return (
    <Card className={styles.root}>
      <CardContent className={styles.content}>
        <Avatar className={styles.avatar} src={
                user?.image
                  ? `${process.env.REACT_APP_IMG_BASE_URL}/${user.image}`
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQbi0Cq6ANBTGJwu8uGYunx3XKWJJW38NECclo4Iidgg&s"
              }/>
        <Box className={styles.textBox}>
          <Typography className={styles.text}>{data?.content || "Notification : it a sample post cdsuyvf bdkz fbaj fr ae bfuefbau dsu b vfdvfdvd"}</Typography>
        </Box>
        <Box className={styles.action}>
          <Typography className={styles.time}>{"N/A"}</Typography>
          <IconButton className={styles.moreButton}>
            <MoreHoriz className={styles.buttonSvg}/>
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
