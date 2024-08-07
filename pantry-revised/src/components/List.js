import React, { useContext, useState } from 'react';
import '../styles/List.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { AddItemForm } from './AddItemForm';
import Modal from '@mui/material/Modal';
import ItemListing from './ItemListing';
import { Button } from '@mui/material';
import { ArrowDownward, ArrowUpward, SwapVert } from '@mui/icons-material';
import { ItemsContext } from'./contexts/ItemsContext';
import { SidePanel } from './sidePanelComponents/SidePanel';
// import { LeftDrawer } from './LeftDrawer';

export function List() {

  const { items, sortItems, sortOrder } = useContext(ItemsContext);

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


  return (
    <div className='ListDashboard'>
    {/* Render SidePanel behind ListContainer */}
    <SidePanel />
      <div className="ListContainer">
        <h1 className="ListTitle">Fridge</h1>
        {/* Button that opens AddItemForm and add items */}
        <FontAwesomeIcon icon={faSquarePlus} size="2xl" className="OpenAddFormBtn"
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
        <div className='labelsContainer'>
          {/* Buttons for sorting list */}
          <Button className='nameLabel'
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
        </div>
        
        {/* Container that contains item listings */}
        <div className='listingsContainer'>
          {/* Map out the list of itemlistings into individual components */}
          {items.map((item) =>
            <ItemListing 
              key={item.id}
              item={item}
              onEdit={() => handleOpenAddForm(item)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
