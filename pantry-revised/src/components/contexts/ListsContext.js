import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ListsContext = createContext();

function ListsProvider( { children }) {
    const [lists, setLists] = useState([]);
}

useEffect(() =>{
    const storedLists = JSON.parse(localStorage.getItem('lists')) || [];
    setLists(storedLists);
})

function addList(name, color, units, tags, items) {
    const newList = {
        id: uuidv4(),
        name,
        color,
        units,
        tags,
        items,
    };
    const updatedLists = [...lists, newList];
    setLists(updatedLists);
    localStorage.setItem('lists', JSON.stringify(updatedLists));
    console.log('Adding new list');
}