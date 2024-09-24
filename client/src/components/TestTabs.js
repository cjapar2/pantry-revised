import { Box, Tabs, Tab } from '@mui/material'
import React, { useContext } from 'react'
import '../styles/TestTabs.css';
import { ListsContext } from './contexts/ListsContext';
import { List } from './List';
import { ItemsProvider } from './contexts/ItemsContext';

export function TestTabs() {

  const { lists, activeListIndex, switchList} = useContext(ListsContext);

  function handleTabChange(event, newIndex) {
    switchList(newIndex);
  }
  console.log('lists:', lists);

  return (
    <div className='testTabContainer'>
          <div className='testTabs'>
            <Tabs
            sx={{
              '& button': {
                backgroundColor: 'beige',
                borderRadius: '15px 15px 0px 0px',
                marginRight: '8px',
                fontFamily: 'McLaren',
                textTransform: 'none',
                width: '20px',
            }
            }}>
              <Tab label='List 1'>List 1</Tab>
              <Tab label='List 2'>List 2</Tab>
              <Tab label='List 3'>List 3</Tab>
            </Tabs>
          </div>
      </div>
  )
}
