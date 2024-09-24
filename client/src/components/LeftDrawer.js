import React from 'react'
import '../styles/LeftDrawer.css'
import { ButtonGroup, IconButton, Paper } from '@mui/material'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

export function LeftDrawer() {
  return (
    <div className='DrawerContainer'>
      <ButtonGroup>
        <IconButton >
            <PlaylistAddIcon />
        </IconButton>
      </ButtonGroup>
    </div>  
  )
}
