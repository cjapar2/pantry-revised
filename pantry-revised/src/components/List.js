import React, { useEffect, useState } from 'react';
import '../styles/List.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import AddItemForm from './AddItemForm';
import Modal from '@mui/material/Modal';
import ItemListing from './ItemListing';
import { Button } from '@mui/material';
import { ArrowDownward, ArrowUpward, SwapVert } from '@mui/icons-material';
// import { LeftDrawer } from './LeftDrawer';

export function List() {
  const initialItems = JSON.parse(localStorage.getItem('items')) || [];

  // State to show addItemForm
  const [showAddForm, setShowAddForm] = useState(false);

  // States to reorder list
  const [sortOrder, setsortOrder] = useState('default');

  // Function to sort items by name
  function sortItems(sortOrder) {
    let sortedItems;
    switch (sortOrder) {
      case 'ascending':
        console.log('items:', items);
        sortedItems = [...items].sort((a, b) => a.itemName.localeCompare(b.itemName));
        break;
      case 'descending':
        sortedItems = [...items].sort((a, b) => b.itemName.localeCompare(a.itemName));
        break;
      case 'default':
        sortedItems = initialItems;
    }
    setItems(sortedItems);
  }

  function handleNameSort() {
    const nextSortOrder = sortOrder === 'default' ? 'ascending' : sortOrder === 'ascending' ? 'descending' : 'default';
    setsortOrder(nextSortOrder);
    sortItems(nextSortOrder);
  }

  // State to show items from localStroage
  const [items, setItems] = useState(() => {
    // Initialize state from localStorage
    const storedItems = JSON.parse(localStorage.getItem('items'));
    console.log('Initializing items from localStorage:', storedItems); // Log initialization
    return storedItems || [];
  });

  // Store items in localStorage whenever items change
  useEffect(() => {
    console.log('Updating localStorage with items:', items); // Log updates
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  // Add itemlisting to list of itemlistings
  function addItem(itemObj) {
    setItems((prevItems) => [...prevItems, itemObj]);
  };

  return (
    <div className='ListDashboard'>
      <div className="ListContainer">
        <h1 className="ListTitle">Fridge</h1>
        <FontAwesomeIcon icon={faSquarePlus} size="2xl" className="OpenAddFormBtn"
          onClick={() => setShowAddForm(true)}
        />
        {/* Modal that shows form to add items depending on button press */}
        <Modal open={showAddForm} onClose={() => setShowAddForm(false)}>
          <AddItemForm addItem={addItem}/>
        </Modal>
        
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
            {sortOrder}
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
          {items.map((itemObj) =>
            <ItemListing 
              itemName={itemObj.itemName}
              amount={itemObj.amount}
              dateAdded={itemObj.dateAdded}
              comment={itemObj.comment}
            />
          )}
        </div>
      </div>
    </div>
  )
}
