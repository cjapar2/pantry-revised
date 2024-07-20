import React, { useEffect, useState } from 'react';
import '../styles/List.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import AddItemForm from './AddItemForm';
import Modal from '@mui/material/Modal';
import ItemListing from './ItemListing';
// import { LeftDrawer } from './LeftDrawer';

export function List() {

  const [items, setItems] = useState(() => {
    // Initialize state from localStorage
    const storedItems = JSON.parse(localStorage.getItem('items'));
    console.log('Initializing items from localStorage:', storedItems); // Log initialization
    return storedItems || [];
  });
  
  // State to show addItemForm
  const [showAddForm, setShowAddForm] = useState(false);

  // Store items in localStorage whenever items change
  useEffect(() => {
    console.log('Updating localStorage with items:', items); // Log updates
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  // Add itemlisting to list of itemlistings
  const addItem = (itemObj) => {
    setItems((prevItems) => [...prevItems, itemObj]);
  };

  return (
    <div className='ListDashboard'>
      <div className="ListContainer">
        <h1 className="ListTitle">Fridge</h1>
        <FontAwesomeIcon icon={faSquarePlus} size="2xl" className="OpenAddFormBtn"
          onClick={() => setShowAddForm(true)}
        />
        <Modal open={showAddForm} onClose={() => setShowAddForm(false)}>
          <AddItemForm addItem={addItem}/>
        </Modal>
        
        {/* List Labels */}
        {/* <div className='labelsContainer'>
          <div className='labels'>
            <div>Name</div>
            <div>Amount</div>
            <div>Comments</div>
          </div>
        </div> */}
        
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
