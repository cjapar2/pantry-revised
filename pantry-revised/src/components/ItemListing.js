import React from 'react'
import '../styles/ItemListing.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

export default function ItemListing({itemName, amount, dateAdded, comment}) {
  return (
    <div className='itemContainer'>
      <IconButton size='small'>
        <DeleteIcon className='deleteButton'/>
      </IconButton>
      <div className='name'>{itemName}</div>
      <div className='amount'>{amount}</div>
      <div className='dateAdded'>{dateAdded}</div>
      <div className='comments'>{comment}</div>
    </div>
  )
}
