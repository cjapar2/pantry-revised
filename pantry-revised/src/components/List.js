import React, { useState } from 'react';
import '../styles/List.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import AddItemForm from './AddItemForm';
import Modal from '@mui/material/Modal';
import ItemListing from './ItemListing';
// import { LeftDrawer } from './LeftDrawer';

export function List() {

  const [items, setItems] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  // Add itemlisting to list of itemlistings
  const addItem = (itemObj) => {
    setItems([...items, itemObj]);
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
        <div className='labelsContainer'>
          <div className='labels'>
            <div>Name</div>
            <div>Amount</div>
            <div>Comments</div>
          </div>
        </div>
        
        {/* Container that contains item listings */}
        <div className='listingsContainer'>
          {/* Map out the list of itemlistings into individual components */}
          {items.map((itemObj) =>
            <ItemListing 
              itemName={itemObj.itemName}
              amount={itemObj.amount}
              comment={itemObj.comment}
            />
          )}
        </div>
      </div>
    </div>
  )
}
