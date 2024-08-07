import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

const ItemsContext = createContext();

function ItemsProvider({ children }) {
    const [items, setItems] = useState([]);
    const [sortOrder, setSortOrder] = useState({ key: 'name', direction: 'ascending'});

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('items')) || [];
        setItems(storedItems);
    }, []);

    const d = new Date();

    function addItem(name, amount = 1, date, comments, imageSrc = 'https://placedog.net/100/100?random') {
        const newItem = {
            id: uuidv4(),
            name,
            amount,
            date,
            comments,
            imageSrc,
        };
        const updatedItems = [...items, newItem];
        setItems(updatedItems);
        localStorage.setItem('items', JSON.stringify(updatedItems));
        console.log('Adding Item');
        console.log('ResultingItems size:', updatedItems.length);
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
        console.log('Deleting item ', id);
        console.log('Resulting items size:', updatedItems.length);
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