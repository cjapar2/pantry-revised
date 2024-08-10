import { ButtonGroup } from '@mui/material';
import React, { useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { IconButton } from '@mui/material';
import '../../styles/sidePanelStyles/SidePanel.css'
import { Filters } from './Filters';
import { Changelog } from './Changelog';
import { NewItemForm } from './NewItemForm';


export function SidePanel() {
    const [panelOpen, setPanelOpen] = useState(false);
    const [activeFeature, setActiveFeature] = useState(null);

    function togglePanel(feature) {
        setActiveFeature(feature);
        // If user clicks same feature while pane lis open, close panel
        if (feature === activeFeature) {
            closePanel();
        }
        // If user clicks a different feature or panel is closed,
        // open the panel with the selected feature
        else {
            setPanelOpen(true);
        }
    };

    function closePanel() {
        // Stop rendering feature page and close panel
        setActiveFeature(null);
        setPanelOpen(false);
    };

    function renderContent() {
        // Switch case to render sidePanel pages depending
        // on what feature user chooses
        switch (activeFeature) {
            case 'addItemForm':
                return <NewItemForm />
            case 'filters':
                console.log('selected filters');
                return <Filters />
            case 'changelog':
                console.log('selected changelog');
                return <Changelog />
            default:
                return <div></div>
        }
    }

    return (
        <div className={`sidePanelContainer ${panelOpen ? 'open' : ''}`}>
            <div className='buttonGroup'>
                <ButtonGroup orientation='vertical'>
                    <IconButton onClick={() => togglePanel('addItemForm')}>
                        <AddBoxOutlinedIcon className='add-button' />
                    </IconButton>
                    
                    <IconButton onClick={() => togglePanel('filters')}>
                        <FilterAltIcon className='filter-button' />
                    </IconButton>
                    <IconButton onClick={() => togglePanel('changelog')}>
                        <HistoryOutlinedIcon className='changelog-button' />
                    </IconButton>
                </ButtonGroup>
            </div>
            <div className='contentContainer'>
                {renderContent()}
                <IconButton onClick={closePanel} size='large' className='close-button'>
                    <KeyboardDoubleArrowLeftIcon fontSize='inherit'  />
                </IconButton>
            </div>
        </div>
    )
}