import React, { useState, useContext, useEffect } from 'react'
import '../styles/AddItemForm.css'
import { Button, Stack, Modal } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { parseISO } from 'date-fns';
import { ItemsContext } from './ItemsContext'




export default function AddItemForm({ open, handleClose, item }) {

  const { addItem, updateItem } = useContext(ItemsContext);

  const [name, setName] = useState('');
  const [amount, setAmount] = useState(1);
  const [date, setDate] = useState(new Date());
  const [comments, setComments] = useState('');

  useEffect(() => {
    if (open) {
      if (item) {
        setName(item.name);
        setAmount(item.amount);
        setDate(parseISO(item.date));
        setComments(item.comments);
      }
      else {
        setName('');
        setAmount(1);
        setDate(new Date());
        setComments('');
      }
    }
  }, [open, item]);

  const handleItemSubmit = () => {
    if (item) {
      updateItem(item.id, { name, amount, date: date.toISOString(), comments });
    }
    else {
      addItem(name, amount, date.toISOString(), comments);
    }
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}
      // BackdropProps={{ onClick: handleClose }} // This line ensures the modal closes on backdrop click
      disableAutoFocus={true} // Disables the hideous blue highlight when opening modal
    >
        <div className="AddItemContainer">
          <form onSubmit={handleItemSubmit}>
            <h1>Add an item!</h1>
            <Stack className="AddFormStack" spacing={3}>
                <input type="text" placeholder='Name of Item' onChange={(e) => setName(e.target.value)}  required/>
                <input type="text" placeholder='Amount' onChange={(e) => setAmount(e.target.value)} />
                {/* <input type="text" placeholder='Date' onChange={(e) => setDate(e.target.value)}></input> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    onChange={(e) => setDate(e)}
                  />
                </LocalizationProvider>
                <input type="text" placeholder='Comments' onChange={(e) => setComments(e.target.value)}></input>
                <Button variant="contained" style={{backgroundColor: '#006769'}} type="submit">Submit</Button>
            </Stack>
        </form>
        </div>
    </Modal>
  )
}
