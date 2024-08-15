import React, { useState, useContext, useEffect } from 'react'
import '../styles/AddItemForm.css'
import { Button, Stack, Modal } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { parseISO } from 'date-fns';
import { ItemsContext } from './contexts/ItemsContext'




export function AddItemForm({ open, handleClose, item }) {

  const { addItem, updateItem } = useContext(ItemsContext);

  const [name, setName] = useState('');
  const [amount, setAmount] = useState(1);
  const [unit, setUnit] = useState('');
  const [date, setDate] = useState(new Date());
  const [comments, setComments] = useState('');
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (imageSrc) {
      const reader = new FileReader();
      reader.onloaded = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(imageSrc);
    } 
  }, [imageSrc]);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImageSrc(file);
    }
  };

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
      updateItem(item.id, { name, amount, unit, date: date.toISOString(), comments, imageSrc });
    }
    else {
      addItem(name, amount, unit, date.toISOString(), comments, imageSrc);
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
            <h1>{item ? 'Edit an Item!' : 'Add an Item!'}</h1>
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
                <input type='file' accept='image/*' onChange={handleFileChange} />
            </Stack>
        </form>
        </div>
    </Modal>
  )
}
