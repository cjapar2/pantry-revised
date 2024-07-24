import React, { useContext } from 'react'
import '../styles/ItemListing.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { ItemsContext } from './ItemsContext';

export default function ItemListing({item, onEdit}) {
  
  const { deleteItem } = useContext(ItemsContext);

  return (
    <div className='itemContainer'>
      <IconButton className='delete-button' size='small'
        onClick={() => deleteItem(item.id)}
      >
        <DeleteIcon />
      </IconButton>
      <div className='name'>{item.name}</div>
      <div className='amount'>{item.amount}</div>
      <div className='date'>{item.date}</div>
      <div className='comments'>{item.comment}</div>
    </div>
  )
}
