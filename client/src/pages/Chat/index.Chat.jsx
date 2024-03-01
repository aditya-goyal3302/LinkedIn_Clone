import React from 'react'
import { Box } from '@mui/system'
import styles from './Chat.module.css'
import ChatContact from '../../components/ChatContact/ChatContact.card'
import ChatWindow from '../../components/ChatWindow/ChatWindow'

function Chat() {
  return (
    <Box className={styles.root}>
      <Box className={styles.panelWrapper}>
        <Box className={styles.leftPanel}>
          <Box className={styles.chatSearchBar}></Box>
          <Box className={styles.chatBtnsBar}></Box>
          <Box className={styles.chatBoxWrapper}>
            <Box className={styles.contactBox}>
              <ChatContact />
            </Box>
            <Box className={styles.chatBox}>
              <ChatWindow />
            </Box>
          </Box>
        </Box>
        <Box className={styles.rightPanel}>
          Side_panel
        </Box>
      </Box>
    </Box>
  )
}

export default Chat