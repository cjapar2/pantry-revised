import { Tabs, Tab, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import React, { useContext } from 'react'
import '../styles/TestTabs.css';
import { ListsContext } from './contexts/ListsContext';
import { List } from './List';
import { ItemsProvider } from './contexts/ItemsContext';

const CustomTab = styled(Tab)(({ theme }) => ({
  minHeight: '0rem', // Keeps the size of the tab small
}));

const TabTitle = styled(Typography)(({ theme }) => ({
  // Text styling
  fontSize: '1.2rem',
  fontFamily: 'McLaren',
  /* Restrict name to one line */
  whiteSpace: 'nowrap',
  /* Hide text after width is 8rem */
  width: '8rem',
  // Hide text overflow using ellipsis
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  justifyContent: 'center', // Center align the label
  // Adjusts padding of tabs
  // This probably isn't good practice? But adding padding to CustomTab broke the spacing of text
  margin: '-6px 0px',
}));


export function TestTabs() {

  const { lists, activeListIndex, switchList} = useContext(ListsContext);

  function handleTabChange(event, newIndex) {
    switchList(newIndex);
  }
  console.log('lists:', lists);

  return (
    <div className='testTabContainer'>
      <div className='testTabs'>
        <Tabs variant='scrollable'
        sx={{
          '& button': {
            backgroundColor: 'beige',
            borderRadius: '15px 15px 0px 0px',
            marginRight: '8px',
            fontFamily: 'McLaren',
            textTransform: 'none',
        }
        }}>
          <CustomTab label={<TabTitle variant='body2'>Fridge</TabTitle>}>List 1</CustomTab>
          <CustomTab label={<TabTitle>teswaefwafawfwefewwafewt</TabTitle>}>List 2</CustomTab>
          <CustomTab label={<TabTitle>teswaefwafawfwefewwafewt</TabTitle>}>List 3</CustomTab>
          <CustomTab label={<TabTitle variant='body2'>Fridge</TabTitle>}>List 1</CustomTab>
          <CustomTab label={<TabTitle>teswaefwafawfwefewwafewt</TabTitle>}>List 2</CustomTab>
          <CustomTab label={<TabTitle>teswaefwafawfwefewwafewt</TabTitle>}>List 3</CustomTab>
        </Tabs>
      </div>
    </div>
  )
}
