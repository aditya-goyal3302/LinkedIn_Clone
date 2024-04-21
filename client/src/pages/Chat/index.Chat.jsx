import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/system";
import styles from "./Chat.module.css";
import ChatContact from "../../components/ChatContact/ChatContact.card";
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import AdPanalWithFooter from "../../components/AdPanelWithFooter";
import { Button, Divider, IconButton, InputBase, Typography } from "@mui/material";
import { SearchSvg } from "../../assets/svg/NavbarSvg";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import { Edit } from "../../assets/svg/Extras";
import io from "../../config/Socket";
import { getChats } from "../../store/ChatsSlice/Chats.Api";
import { getMessages } from "../../store/MessagingSlice/Messaging.Api";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesSuccess } from "../../store/MessagingSlice/Messaging.Slice";


function Chat() {
  const dispatch = useDispatch();
  const chatsData = useSelector((state) => state.chatsReducer);
  const loading = useRef(true)
  const MessagesData = useSelector((state) => state.messagingReducer);
  // const [initialLoad, setInitialLoad] = useState(false);
  const initialized = useRef(false)
  // console.log('MessagesData: ', MessagesData);
  // console.log('chatsData: ', chatsData.chats);
  const [currentChat, setCurrentChat] = useState({})
  // console.log('currentChat: ', currentChat);
  useEffect(() => {
    if (currentChat)
      io.emit('join', currentChat.uuid)
  }, [currentChat])

  useEffect(()=>{
    console.log(".");
    if(initialized.current === false){
      initialized.current = true
      io.on("receivemessage",(data)=>{
        // console.log(data)
        dispatch(getMessagesSuccess({ roomId: data.chat_room, data }))
      })
      // console.log("cndf")
    }
    return ()=>{
      initialized.current = false
      // console.log("off pre");
      io.off("receivemessage")
    }
  },[io])

  useEffect(() => {
    if (chatsData.chats.length === 0 && !chatsData.isLoading && loading.current) {
      loading.current = false
      dispatch(getChats());
    }
    if (chatsData.chats.length > 0)
      chatsData.chats.map((chat) => {
        dispatch(getMessages(chat.uuid))
      })
    setCurrentChat(chatsData.chats[0])
    // return ()=> loading.current = true
  }, [chatsData.chats])



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
              className={`${styles.optionBtnMain} ${searcAction === "main" ? styles.optionBtnActive : ""
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
              className={`${styles.optionBtn} ${searcAction === "Unread" ? styles.optionBtnActive : ""
                }`}
              onClick={() => {
                setSearcAction("Unread");
              }}
            >
              <Typography>{"Unread"}</Typography>
            </Button>
            <Button
              key={"My Connections"}
              className={`${styles.optionBtn} ${searcAction === "My Connections" ? styles.optionBtnActive : ""
                }`}
              onClick={() => {
                setSearcAction("My Connections");
              }}
            >
              <Typography>{"My Connections"}</Typography>
            </Button>
            <Button
              key={"InMail"}
              className={`${styles.optionBtn} ${searcAction === "InMail" ? styles.optionBtnActive : ""
                }`}
              onClick={() => {
                setSearcAction("InMail");
              }}
            >
              <Typography>{"InMail"}</Typography>
            </Button>
            <Button
              key={"Starred"}
              className={`${styles.optionBtn} ${searcAction === "Starred" ? styles.optionBtnActive : ""
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
                return <ChatContact key={chat._id} chat={chat} currentChat={currentChat} setCurrentChat={setCurrentChat} />
              })}
            </Box>
            <Box className={styles.chatBox}>
              <ChatWindow currentChat={currentChat} MessagesData={MessagesData} />
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
