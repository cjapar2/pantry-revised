import React from 'react'
import '../styles/ItemListing.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

export default function ItemListing({name, amount, dateAdded, comment}) {
  return (
    <div className='itemContainer'>
      <IconButton className='delete-button' size='small'>
        <DeleteIcon />
      </IconButton>
      <div className='name'>{name}</div>
      <div className='amount'>{amount}</div>
      <div className='dateAdded'>{dateAdded}</div>
      <div className='comments'>{comment}</div>
    </div>
  )
}
