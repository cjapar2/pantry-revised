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
    <div className='tabDashboard'>

      {/* <div className='tabsContainer'>
        <Tabs
        sx={{
          '& button': {
            backgroundColor: 'beige',
            borderRadius: '15px 15px 0px 0px',}
        }}>
          <Tab label='list 1'>List 1</Tab>
          <Tab label='list 2'>List 2</Tab>
          <Tab label='list 3'>List 3</Tab>
        </Tabs>
      </div> */}
          {lists.length > 0 && (
            <ItemsProvider items={activeListIndex.items}>
              <List list={lists[activeListIndex]} listId={lists[activeListIndex].id}/>
            </ItemsProvider>
          )}
    </div>
  )
}
