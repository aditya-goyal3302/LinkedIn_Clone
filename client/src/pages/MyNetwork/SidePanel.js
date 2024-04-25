import { Accordion, AccordionDetails, AccordionSummary, MenuItem,Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import contactImg from '../../assets/images/book-mark.png'
import calenderImg from '../../assets/images/calendar.png'
import connectionsImg from '../../assets/images/group.png'
import groupImg from '../../assets/images/group2.png'
import hashtagImg from '../../assets/images/hashtag.png'
import newsLetterImg from '../../assets/images/newspaper.png'
import pageImg from '../../assets/images/office.png'
import peopleImg from '../../assets/images/man.png'
import styles from './MyNetwork.module.css'
import React from "react";
import AdPanalWithFooter from '../../components/AdPanelWithFooter';
import { useSelector } from 'react-redux';

const SidePanel = () => {
  const connections = useSelector(state=>state.myConnectionReducer)
  return (
    <>
      <Accordion className={`myNetworkAccordion ${styles.myNetworkAccordion}`}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography className={styles.accordionHead}>
            Manage my network
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={styles.MyNetworkMenu}>
          <MenuItem className={styles.menuBtn} >
            <Typography>
              <img alt="" className={styles.menuBtnImg} src={connectionsImg} />
              Connections
            </Typography>
            <Typography>{connections.myConnections.length}</Typography>
          </MenuItem>
          <MenuItem className={styles.menuBtn} >
            <Typography>
              <img alt="" className={styles.menuBtnImg} src={contactImg} />
              Contacts
            </Typography>
            <Typography>0</Typography>
          </MenuItem>
          <MenuItem className={styles.menuBtn} >
            <Typography>
              <img alt="" className={styles.menuBtnImg} src={peopleImg} />
              Following & followers
            </Typography>
            <Typography>0</Typography>
          </MenuItem>
          <MenuItem className={styles.menuBtn} >
            <Typography>
              <img alt="" className={styles.menuBtnImg} src={groupImg} />
              Groups
            </Typography>
            <Typography>0</Typography>
          </MenuItem>
          <MenuItem className={styles.menuBtn} >
            <Typography>
              <img alt="" className={styles.menuBtnImg} src={calenderImg} />
              Events
            </Typography>
            <Typography>0</Typography>
          </MenuItem>
          <MenuItem className={styles.menuBtn} >
            <Typography>
              <img alt="" className={styles.menuBtnImg} src={pageImg} />
              Pages
            </Typography>
            <Typography>0</Typography>
          </MenuItem>
          <MenuItem className={styles.menuBtn} >
            <Typography>
              <img alt="" className={styles.menuBtnImg} src={newsLetterImg} />
              Newsletter
            </Typography>
            <Typography>0</Typography>
          </MenuItem>
          <MenuItem className={styles.menuBtn} >
            <Typography>
              <img alt="" className={styles.menuBtnImg} src={hashtagImg} />
              Hashtags
            </Typography>
            <Typography>0</Typography>
          </MenuItem>
        </AccordionDetails>
      </Accordion>
      <AdPanalWithFooter/>
    </>
  );
};

export default SidePanel;
