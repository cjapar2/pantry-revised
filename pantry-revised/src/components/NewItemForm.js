import React, { useState, useContext, useEffect } from 'react'
import '../styles/NewItemForm.css'
import { styled } from '@mui/material/styles';
import { Button, Grid, Box, TextField, Paper} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { parseISO } from 'date-fns';
import { ItemsContext } from './ItemsContext'

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

      useEffect(() => {
        // if we edit an item -> item exists -> we're editing so autofill form with item's values
        if (item) {
            setName(item.name);
            setAmount(item.amount);
            setDate(parseISO(item.date));
            setComments(item.comments);
        }
        // if we select add button -> no item exists yet -> autofill form with default values
        else {
            setName('');
            setAmount(1);
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
          updateItem(item.id, { name, amount, date: date.toISOString(), comments, imageSrc });
        }
        else {
          addItem(name, amount, date.toISOString(), comments, imageSrc);
        }
        setName('');
        setAmount(1);
        setDate(new Date());
        setComments('');
        
      }

  return (
    <Box className='itemFormContainer'>
    <Grid container spacing={2} className='itemFormGrid'>
      {/* Item Name TextField */}
      <Grid item xs={12}>
        <CustomTextField
          size='small'
          label="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='name-field'
          fullWidth
        />
      </Grid>
      {/* Amount TextField */}
      <Grid item xs={4}>
        <CustomTextField
          size='small'
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
        />
      </Grid>
      {/* Amount Unit TextField */}
      <Grid item xs={8}>
        <CustomTextField
          size='small'
          label="Unit"
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
        />
      </Grid>
      {/* Date Picker */}
      <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            onChange={(e) => setDate(e)}
            slotProps={{
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
            }}
          />
        </LocalizationProvider>
      </Grid>
      {/* Comments TextField */}
      <Grid item xs={12}>
      <CustomTextField
          size='small'
          label="Comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          multiline // Multiline and rows={5} lets textfield take a bigger space
          rows={5}
          fullWidth
        />
      </Grid>
      {/* Tags TextField */}
      <Grid item xs={12}>
        <CustomTextField
          size='small'
          label='Tags'
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Button
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
