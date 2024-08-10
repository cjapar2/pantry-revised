import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { List } from '../List';

const ListsContext = createContext();

function ListsProvider({children}) {
    const [lists, setLists] = useState([]);
    const [activeList, setActiveList] = useState(0); // Default to first tab of lists

    useEffect(() => {
        const storedLists = JSON.parse(localStorage.getItem('lists')) || [];
        if (storedLists.length === 0) {
            // Add a default list if none exist
            const defaultList = {
                id: Date.now(),
                name: 'Default List',
                items: []
            };
            setLists([defaultList]);
            localStorage.setItem('lists', JSON.stringify([defaultList]));
        } else {
            setLists(storedLists);
        }
    }, []);

    useEffect(() => {
        // Ensure activeTab is within bounds
        if (lists.length > 0 && activeList >= lists.length) {
            setActiveList(0);
        }
    }, [lists]);


    console.log('activeList:', activeList, lists);

    useEffect(() =>{
        const storedLists = JSON.parse(localStorage.getItem('lists')) || [];
        setLists(storedLists);
    }, []);

    function addList(name, items) {
        const newList = {
            id: uuidv4(),
            name,
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
        const updatedLists = lists.map(list => (list.id === id ? {...lists, ...updatedList } : list));
        setLists(updatedLists);
        localStorage.setItem('lists', JSON.stringify(updatedLists));
    }

    function switchList(index) {
        setActiveList(index);
    }

    return (
        <ListsContext.Provider value={{ lists, activeList, addList, deleteList, updateList, switchList }}>
            {children}
        </ListsContext.Provider>
    )

}
export { ListsProvider, ListsContext }