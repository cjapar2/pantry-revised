import React, { useContext } from 'react'
import '../styles/ItemListing.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { ItemsContext } from './ItemsContext';
import {format, isToday, isYesterday, parseISO } from 'date-fns';

export default function ItemListing({item, onEdit}) {
  
  const { deleteItem } = useContext(ItemsContext);

  function formatDate(dateString) {
    const date = parseISO(dateString);
    console.log('date:', date)
    if (isToday(date)) {
      return `Today at ${format(date, 'h:mm a')}`;
    } else if (isYesterday(date)) {
      return `Yesterday at ${format(date, 'h:mm a')}`;
    } else {
      return format(date, 'MMM d, yyyy');
    }
  };

  return (
    <div className='itemContainer'>
      <IconButton className='delete-button' size='small'
        onClick={() => deleteItem(item.id)}
      >
        <DeleteIcon />
      </IconButton>
      <div className='name'>{item.name}</div>
      <div className='amount'>{item.amount}</div>
      <div className='date'>{formatDate(item.date)}</div>
      <div className='comments'>{item.comments}</div>
    </div>
  )
}
