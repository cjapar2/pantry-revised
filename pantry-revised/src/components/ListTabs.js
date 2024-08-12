import { Box, Tabs, Tab } from '@mui/material'
import React, { useContext } from 'react'
import '../styles/ListTabs.css';
import { ListsContext } from './contexts/ListsContext';
import { List } from './List';
import { ItemsProvider } from './contexts/ItemsContext';

export function ListTabs() {

  const { lists, activeList, switchList} = useContext(ListsContext);

  console.log('activeList:', activeList, lists);

  function handleTabChange(event, newIndex) {
    switchList(newIndex);
  }


  return (
      <Box className='Dashboard'>
        {lists.length > 0 && (
          <ItemsProvider items={activeList.items}>
            <List list={lists[activeList]} listId={lists[activeList].id}/>
          </ItemsProvider>
        )}
      </Box>
  )
}
