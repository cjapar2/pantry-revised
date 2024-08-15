import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { List } from '../List';

const ListsContext = createContext();

function ListsProvider({children}) {
    const [lists, setLists] = useState([]);
    const [activeListIndex, setActiveList] = useState(0); // Default to first tab of lists

    // Check on every reload if a list exists, if not, create a default list
    useEffect(() => {
        const storedLists = JSON.parse(localStorage.getItem('lists')) || [];
        // Add a default list if none exist
        console.log('storedLists', storedLists);   
        if (storedLists.length === 0) {
            console.log('no lists detected');
            const defaultList = {
                id: uuidv4(),
                name: 'Default List',
                units: ['', 'Gallon', 'Bag'],
                items: []
            };
            setLists([defaultList]);
            localStorage.setItem('lists', JSON.stringify([defaultList]));
            setActiveList(0); // If it exists, set active tab to first list's UUID
        } else {
            console.log('yes lists detected');
            setLists(storedLists);
            console.log('storedLists-:', storedLists)
            setActiveList(0); // If it exists, set active tab to first list's UUID
        }
    }, []);

    useEffect(() => {
        // Ensure activeTab is within bounds
        if (lists.length > 0 && activeListIndex >= lists.length) {
            setActiveList(0);
        }
    }, []);

    useEffect(() =>{
        const storedLists = JSON.parse(localStorage.getItem('lists')) || [];
        setLists(storedLists);
    }, []);

    

    function addList(name, units, items) {
        const newList = {
            id: uuidv4(),
            name,
            units,
            items,
        };
        const updatedLists = [...lists, newList];
        setLists(updatedLists);
        localStorage.setItem('lists', JSON.stringify(updatedLists));
        console.log('Adding new list');
    }

    function deleteList(id) {
        const updatedLists = lists.filter(list => list.id !== id);
        setLists(updatedLists);
        localStorage.setItem('lists', JSON.stringify(updatedLists));
    }

    function updateList(id, updatedList) {
        // 
        const updatedLists = lists.map(list => (list.id === id ? updatedList : list));
        console.log(updatedLists);
        // Set the updated to lists to the new list of lists
        setLists(updatedLists);
        // Store the new list of lists to localStorage
        localStorage.setItem('lists', JSON.stringify(updatedLists));
    }

    function switchList(index) {
        setActiveList(index);
    }

    return (
        <ListsContext.Provider value={{ lists, activeListIndex, addList, deleteList, updateList, switchList }}>
            {children}
        </ListsContext.Provider>
    )

}
export { ListsProvider, ListsContext }