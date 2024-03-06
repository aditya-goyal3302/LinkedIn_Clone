import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import styles from "./Chat.module.css";
import ChatContact from "../../components/ChatContact/ChatContact.card";
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import AdPanalWithFooter from "../../components/AdPanelWithFooter";
import {
  Button,
  Divider,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import { SearchSvg } from "../../assets/svg/NavbarSvg";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import { Edit } from "../../assets/svg/Extras";
import io from "../../config/Socket";
import { getChats } from "../../store/ChatsSlice/Chats.Api";
import { useDispatch, useSelector } from "react-redux";  

function Chat() {
  const dispatch = useDispatch();
  const chatsData = useSelector((state) => state.Chats_reducer);
  console.log('chatsData: ', chatsData.chats);
  useEffect(()=>{
    if(chatsData.chats.length === 0 && !chatsData.isLoading)
      dispatch(getChats());
    io.emit('abc',{name:"abc"})
  },[])
  const [searcAction, setSearcAction] = useState("main");
  return (
    <Box className={styles.root}>
      <Box className={styles.panelWrapper}>
        <Box className={styles.leftPanel}>
          <Box className={styles.chatSearchBar}>
            <Box className={styles.chatSearchBarPart}>
              <Typography className={styles.chatSearchBarText}>
                Messaging
              </Typography>
              <InputBase
                className={styles.SearchBar}
                placeholder="Search Messages"
                startAdornment={
                  <i className={styles.searchIcon}>
                    {" "}
                    <SearchSvg />{" "}
                  </i>
                }
              />
            </Box>
            <Box className={styles.chatSearchBarPart2}>
              <IconButton className={styles.chatOptionBtn}>
                <MoreHoriz />
              </IconButton>
              <IconButton className={styles.chatOptionBtn}>
                <Edit />
              </IconButton>
            </Box>
          </Box>
          <Box className={styles.chatBtnsBar}>
            <Button
              key={"main"}
              className={`${styles.optionBtnMain} ${
                searcAction === "main" ? styles.optionBtnActive : ""
              }`}
              onClick={() => {
                setSearcAction("main");
              }}
            >
              <Typography>{"Focused"}</Typography>
              <ArrowDropDownIcon />
            </Button>
            <Divider
              orientation="vertical"
              className={styles.dividerBtns}
              flexItem
            />
            <Button
              key={"Unread"}
              className={`${styles.optionBtn} ${
                searcAction === "Unread" ? styles.optionBtnActive : ""
              }`}
              onClick={() => {
                setSearcAction("Unread");
              }}
            >
              <Typography>{"Unread"}</Typography>
            </Button>
            <Button
              key={"My Connections"}
              className={`${styles.optionBtn} ${
                searcAction === "My Connections" ? styles.optionBtnActive : ""
              }`}
              onClick={() => {
                setSearcAction("My Connections");
              }}
            >
              <Typography>{"My Connections"}</Typography>
            </Button>
            <Button
              key={"InMail"}
              className={`${styles.optionBtn} ${
                searcAction === "InMail" ? styles.optionBtnActive : ""
              }`}
              onClick={() => {
                setSearcAction("InMail");
              }}
            >
              <Typography>{"InMail"}</Typography>
            </Button>
            <Button
              key={"Starred"}
              className={`${styles.optionBtn} ${
                searcAction === "Starred" ? styles.optionBtnActive : ""
              }`}
              onClick={() => {
                setSearcAction("Starred");
              }}
            >
              <Typography>{"Starred"}</Typography>
            </Button>
          </Box>
          <Box className={styles.chatBoxWrapper}>
            <Box className={styles.contactBox}>
              {chatsData.chats.map((chat) => {
                  return <ChatContact key={chat._id} chat={chat} />
              })}
            </Box>
            <Box className={styles.chatBox}>
              <ChatWindow />
            </Box>
          </Box>
        </Box>
        <Box className={styles.rightPanel}>
          <AdPanalWithFooter />
        </Box>
      </Box>
    </Box>
  );
}

export default Chat;
