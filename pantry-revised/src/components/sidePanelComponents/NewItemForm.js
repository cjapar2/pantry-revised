import React, { useState, useContext, useEffect } from 'react'
import '../../styles/sidePanelStyles/NewItemForm.css'
import { styled } from '@mui/material/styles';
import { Button, Grid, Box, TextField, IconButton, Avatar, Input, Select, MenuItem, Tooltip } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { parseISO } from 'date-fns';
import { ItemsContext } from '../contexts/ItemsContext'
import defaultItemIcon from '../../assets/default_item_image.png'

const CustomDatePickerStyle = {
  textField: {
    size: 'small',
    sx: {
      width: '100%', // using width here because 'xs={12}' prop doesn't take upp the entire row
      backgroundColor: '#568A80',
  '& .MuiOutlinedInput-root': {
    height: '50px',
    color: 'white', // Text color
    '& fieldset': {
      borderColor: 'white', // Border color
    },
    '&:hover fieldset': {
      borderColor: 'white', // Border color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white', // Border color when focused
    },
  },
  '& .MuiInputLabel-root': {
    color: 'white', // Label color
  },
  '&:hover .MuiInputLabel-root': {
    color: 'white', // Label color on hover
  },
  '& .Mui-focused .MuiInputLabel-root': {
    color: 'white', // Label color when focused
  },
    }
  }
};

// Custom style for MUI Textfields to override their MUI styles
const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#568A80',
    '& fieldset': {
      borderColor: 'white', // Default border color
    },
    '&:hover fieldset': {
      borderColor: 'white', // Border color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white', // Border color when focused
    },
  },
  '& .MuiInputLabel-root': {
    color: 'white', // Default label color
  },
  '&:hover .MuiInputLabel-root': {
    color: 'white', // Label color on hover
  },
  '& .Mui-focused .MuiInputLabel-root': {
    color: 'white', // Label color when focused
  },
});

export function NewItemForm({item}) {

    const { addItem, updateItem } = useContext(ItemsContext);

    const [name, setName] = useState('');
    const [amount, setAmount] = useState(1);
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState(new Date());
    const [comments, setComments] = useState('');
    const [imageSrc, setImageSrc] = useState(defaultItemIcon);

    // useEffect(() => {
    //     if (imageSrc) {
    //       const reader = new FileReader();
    //       reader.onloaded = () => {
    //         setImageSrc(reader.result);
    //       };
    //       reader.readAsDataURL(imageSrc);
    //     } 
    //   }, [imageSrc]);

      useEffect(() => {
        // if we edit an item -> item exists -> we're editing so autofill form with item's values
        if (item) {
            setName(item.name);
            setAmount(item.amount);
            setUnit(item.unit);
            setDate(parseISO(item.date));
            setComments(item.comments);
        }
        // if we select add button -> no item exists yet -> autofill form with default values
        else {
            setName('');
            setAmount(1);
            setUnit('');
            setDate(new Date());
            setComments('');
        }
      }, [item]);

      function handleFileChange(e) {
        const file = e.target.files[0];
        if (file) {
          setImageSrc(file);
        }
      };

      function handleItemSubmit() {
        if (item) {
          updateItem(item.id, { name, amount, unit, date: date.toISOString(), comments, imageSrc });
        }
        else {
          addItem(name, amount, unit, date.toISOString(), comments, imageSrc);
        }

        // Reset values
        setName('');
        setAmount(1);
        setDate(new Date());
        setComments('');
      }

  return (
    <Box component='form' className='itemFormContainer' onSubmit={handleItemSubmit}>
      <Grid container spacing={2} className='itemFormGrid' justifyContent="center" alignItems="center">
        {/* Image Picker */}
        <Grid item xs={0}>
          <Tooltip placement='top' title='Upload Image'>
            <IconButton>
              <Avatar
                src={defaultItemIcon}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '15px',
                }}></Avatar>
              </IconButton>
            </Tooltip>
        </Grid>
        {/* Item Name TextField */}
        <Grid item xs={12}>
          <CustomTextField
            size='small'
            label="Item Name"
            value={name}
            className='name-field'
            fullWidth
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        {/* Amount TextField */}
        <Grid item xs={4}>
          <CustomTextField
            size='small'
            label="Amount"
            type="number"
            value={amount}
            fullWidth
            onChange={(e) => setAmount(e.target.value)}
          />
        </Grid>
        {/* Amount Unit TextField */}
        <Grid item xs={8}>
          <CustomTextField
            size='small'
            label='Unit'
            select
            fullWidth
            onChange={(e) => setUnit(e.target.value)}
          >
            <MenuItem value='gallon'>Gallon</MenuItem>
          </CustomTextField>
        </Grid>
        {/* Date Picker */}
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              onChange={(e) => setDate(e)}
              slotProps={CustomDatePickerStyle}
            />
          </LocalizationProvider>
        </Grid>
        {/* Comments TextField */}
        <Grid item xs={12}>
        <CustomTextField
            size='small'
            label="Comments"
            value={comments}
            multiline // Multiline and rows={5} lets textfield take a bigger space
            rows={5}
            fullWidth
            onChange={(e) => setComments(e.target.value)}
          />
        </Grid>
        {/* Tags TextField */}
        <Grid item xs={12}>
          <CustomTextField
            size='small'
            label='Tags'
            fullWidth
            onChange={(e) => setAmount(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type='submit'
            variant="contained"
            onClick={handleItemSubmit}
            fullWidth
            sx={{
              backgroundColor: '#FFF3CA', // Submit button background color
              color: '#000', // Text color black
              '&:hover': {
                backgroundColor: '#FFF3CA', // Maintain same color on hover
              },
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
