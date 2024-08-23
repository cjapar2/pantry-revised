import { Box, Tabs, Tab } from '@mui/material'
import React, { useContext } from 'react'
import '../styles/ListTabs.css';
import { ListsContext } from './contexts/ListsContext';
import { List } from './List';
import { ItemsProvider } from './contexts/ItemsContext';

export function ListTabs() {

  const { lists, activeListIndex, switchList} = useContext(ListsContext);

  function handleTabChange(event, newIndex) {
    switchList(newIndex);
  }

  return (
      <Box className='TabDashboard'>
        <Tabs className='TabContainer'>
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>

        {lists.length > 0 && (
          <ItemsProvider items={activeListIndex.items}>
            <List list={lists[activeListIndex]} listId={lists[activeListIndex].id}/>
          </ItemsProvider>
        )}
      </Box>
  )
}
