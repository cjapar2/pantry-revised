import React, { useState } from 'react';
import '../styles/List.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import AddItemForm from './AddItemForm';
import Modal from '@mui/material/Modal';

export function List() {

  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="ListContainer">
        <h1 className="ListTitle">Fridge</h1>
        <FontAwesomeIcon icon={faSquarePlus} size="2xl" className="AddItemButton"
          onClick={() => setShowAddForm(true)}
        />
        <Modal open={showAddForm} onClose={() => setShowAddForm(false)}>
          <AddItemForm />
        </Modal>
    </div>
  )
}
