import React, { useContext } from 'react'
import '../styles/ItemListing.css'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, ButtonGroup, Tooltip } from '@mui/material';
import { ItemsContext } from './contexts/ItemsContext';
import {format, isToday, isYesterday, parseISO } from 'date-fns';

export default function ItemListing({item, onEdit}) {
  
  const { deleteItem } = useContext(ItemsContext);
  console.log('item in itemlisting.js:', item)
  
  function formatDate(dateString) {
    console.log('d:', dateString);
    const date = parseISO(dateString);
    console.log('date:', date);
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
      <div className='imageContainer'>
        <img src={item.imageSrc} alt={item.name} className='image'/>
      </div>
      <div className='name'>{item.name}</div>
      <div className='amount'>{item.amount}</div>
      {/* <div className='unit'>{item.unit}</div> */}
      <div className='date'>{formatDate(item.date)}</div>
      <div className='comments'>{item.comments}</div>

      {/* Edit and Delete buttons */}
      <ButtonGroup className='action-buttons'>
        <Tooltip title='Edit' placement='top'>
          <IconButton className='edit-button' size='small'
            onClick={() => onEdit(item)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Delete' placement='top'>
          <IconButton className='delete-button' size='small'
            onClick={() => deleteItem(item.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </ButtonGroup>
    </div>
  )
}
