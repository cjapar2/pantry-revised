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
    <div >
      <Box className='TabGroup'>
        <Tabs value={activeList} onChange={handleTabChange} >
          {lists.map((list, index) => (
            <Tab key={list.id} label={list.name} />
          ))}
        </Tabs>
        {lists.length > 0 && (
          <ItemsProvider items={lists[activeList].items}>
            <List />
          </ItemsProvider>
        )}
      </Box>
    </div>
  )
}
