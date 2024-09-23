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
      <div>
        <div className='tabDashboard'>
          <Tabs
            sx={{
              position: 'relative',
              top: '3rem',
              '& button': {
                backgroundColor: 'beige',
                borderRadius: '15px 15px 0px 0px',}
            }}
          >
            <Tab label="Default List" />
            <Tab label="List #2" />
            <Tab label="List #3" />
          </Tabs>
        </div>

        {lists.length > 0 && (
          <ItemsProvider items={activeListIndex.items}>
            <List list={lists[activeListIndex]} listId={lists[activeListIndex].id}/>
          </ItemsProvider>
        )}
      </div>
  )
}
