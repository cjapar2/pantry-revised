import React, { useContext, useState } from 'react';
import '../styles/List.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { AddItemForm } from './AddItemForm';
import ItemListing from './ItemListing';
import { Button, Tab, Tabs } from '@mui/material';
import { ArrowDownward, ArrowUpward, SwapVert } from '@mui/icons-material';
import { ItemsContext } from'./contexts/ItemsContext';
import { SidePanel } from './sidePanelComponents/SidePanel';
import { ListsContext } from './contexts/ListsContext';
import { TestTabs } from './TestTabs';

export function List({ list, listId}) {

  const { items, sortItems, sortOrder } = useContext(ItemsContext);
  const { lists, activeListIndex } = useContext(ListsContext);

  // State to show addItemForm
  const [showAddForm, setShowAddForm] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  function handleNameSort(key) {
    const direction = sortOrder.key === key && sortOrder.direction === 'ascending' ? 'descending' : 'ascending';
    sortItems(key, direction);
  };

  function handleOpenAddForm(item = null) {
    console.log('opening add form')
    setSelectedItem(item);
    setShowAddForm(true);
  };

  function handleCloseAddForm() {
    console.log('closing add form')
    setShowAddForm(false);
    setSelectedItem(null);
  };

  const activeListItems = lists[activeListIndex]?.items || [];

  return (
    <div className='listDashboard'>
    <TestTabs />
    {/* Render SidePanel behind ListContainer */}
    <SidePanel />
      <div className="listContainer" style={{backgroundColor: '#E4EBB1'}}>
        <h1 className="listTitle">{lists[activeListIndex]?.name || 'No List Detected?'}</h1>
        {/* Button that opens AddItemForm and add items */}
        <FontAwesomeIcon icon={faSquarePlus} size="2xl" className="openAddFormBtn"
          onClick={() => handleOpenAddForm()}
        />
        {/* Modal component that shows form to add items depending on button press */}
        <AddItemForm 
          open={showAddForm}
          handleClose={handleCloseAddForm}
          item={selectedItem}
          onClose={handleCloseAddForm}
        />
        
        {/* Container that contains labels */}
        {/* <div className='labelsContainer'> */}
          {/* Buttons for sorting list */}
          {/* <Button className='nameLabel'
            variant="contained" color="primary"
            onClick={handleNameSort}
            endIcon={
              sortOrder === 'default' ? <ArrowDownward /> :
              sortOrder === 'ascending' ? <ArrowUpward /> : <SwapVert />
            }
          >
            {sortOrder.direction}
          </Button>
          <Button className='amountLabel'
            variant='contained'
          >
            Amount
          </Button>
        </div> */}
        
        {/* Container that contains item listings */}
        <div className='listingsContainer'>
          {/* Map out the list of itemlistings into individual components */}
          {items.filter(item => item.listId === listId).map((item) => (
            <ItemListing key={item.id} item={item} onEdit={() => handleOpenAddForm(item)}></ItemListing>
          ))}
        </div>
      </div>
    </div>
  )
}
