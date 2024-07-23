import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ItemsContext = createContext();

function ItemsProvider({ children }) {
    const [items, setItems] = useState([]);
    const [sortOrder, setSortOrder] = useState({ key: 'name', direction: 'ascending'});

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('items')) || [];
        setItems(storedItems);
    }, []);

    function addItem(name, amount = 1, dateAdded = new Date().toISOString(), comments) {
        const newItem = {
            id: uuidv4(),
            name,
            amount: 0,
            dateAdded,
            comments,
        };
        const updatedItems = [...items, newItem];
        setItems(updatedItems);
        localStorage.setItem('items', JSON.stringify(updatedItems));
    };

    function updateItem(id, updatedItem) {
        const updatedItems = items.map(item => (item.id === id ? { ...item, ...updatedItem } : item));
        setItems(updatedItems);
        localStorage.setItem('items', JSON.stringify(updatedItems));
    };

    function deleteItem(id) {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
        localStorage.setItem('items', JSON.stringify(updatedItems));
    };

    function sortItems(key, direction = 'ascending') {
        setSortOrder({key, direction});
        const sortedItems = [...items].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        setItems(sortedItems);
    }

    return (
        <ItemsContext.Provider value={{ items, addItem, updateItem, deleteItem, sortItems, sortOrder }}>
            {children}
        </ItemsContext.Provider>
    );
};

export { ItemsProvider, ItemsContext };