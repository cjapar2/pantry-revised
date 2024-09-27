import { Tabs, Tab } from '@mui/material'
import { styled } from '@mui/material/styles';
import React, { useContext } from 'react'
import '../styles/TestTabs.css';
import { ListsContext } from './contexts/ListsContext';
import { List } from './List';
import { ItemsProvider } from './contexts/ItemsContext';

const CustomTab = styled(Tab)(({ theme }) => ({
  minHeight: '0rem',
  lineHeight: '5px',
  padding: '1', // Padding next to text
  /* Restrict name to one line */
  whiteSpace: 'nowrap',
  /* Hide text after width is 10rem */
  width: '7rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: 'flex',
  justifyContent: 'center', // Center align the label
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
            <Tabs
            sx={{
              '& button': {
                backgroundColor: 'beige',
                borderRadius: '15px 15px 0px 0px',
                marginRight: '8px',
                fontFamily: 'McLaren',
                textTransform: 'none',
            }
            }}>
              <CustomTab label='Default Listwefwaffe'>List 1</CustomTab>
              <CustomTab label='List 2'>List 2</CustomTab>
              <CustomTab label='List 3'>List 3</CustomTab>
            </Tabs>
          </div>
      </div>
  )
}
