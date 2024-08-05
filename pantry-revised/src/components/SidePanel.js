import { ButtonGroup } from '@mui/material';
import React, { useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { IconButton } from '@mui/material';
import '../styles/SidePanel.css'
import { render } from '@testing-library/react';

export function SidePanel() {
    const [panelOpen, setPanelOpen] = useState(false);
    const [activeFeature, setActiveFeature] = useState(null);

    function togglePanel(feature) {
        setActiveFeature(feature);
        // If panel isn't open or the feature selected is currently the same feature, then close the panel
        setPanelOpen(!panelOpen || activeFeature !== feature);
        // renderContent();
    };

    function closePanel() {
        setPanelOpen(false);
    };

    function renderContent() {
        switch (activeFeature) {
            case 'filters':
                console.log('selected filters');
                return <div className='filtersContent'></div>
            case 'changelog':
                console.log('selected changelog');
                return <div className='changelogContent'></div>
        }
    }

    return (
        <div className={`sidePanelContainer ${panelOpen ? 'open' : ''}`}>
            <div className='buttonGroup'>
                <ButtonGroup orientation='vertical'>
                    <IconButton onClick={() => togglePanel('filters')}>
                        <FilterAltIcon className='filter-button' />
                    </IconButton>
                    <IconButton onClick={() => togglePanel('changelog')}>
                        <HistoryOutlinedIcon className='changelog-button' />
                    </IconButton>
                </ButtonGroup>
            </div>
            <div className='contentContainer'>
                <IconButton onClick={closePanel} size='large' className='close-button'>
                    <KeyboardDoubleArrowLeftIcon fontSize='inherit'  />
                </IconButton>
                {renderContent()}
            </div>
        </div>
    )
}