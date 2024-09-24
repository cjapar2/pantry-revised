import React from 'react'
import '../styles/LeftDrawer.css'
import { ButtonGroup, IconButton, Paper } from '@mui/material'
import PostAddIcon from '@mui/icons-material/PostAdd';
import MapIcon from '@mui/icons-material/Map';

export function LeftDrawer() {
  return (
    <div className='DrawerContainer'>
      <ButtonGroup orientation='vertical'>
        <IconButton>
          <PostAddIcon sx={{
            fontSize: '5rem',
            color: '#b8c4ac',
          }}
        />
        </IconButton>
        <IconButton>
          <MapIcon sx={{
            fontSize: '5rem',
            color: '#b8c4ac',
          }}
        />
        </IconButton>
      </ButtonGroup>
    </div>  
  )
}
