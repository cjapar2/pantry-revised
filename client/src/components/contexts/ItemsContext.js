import React, { createContext, useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ListsContext } from './ListsContext';

const ItemsContext = createContext();

function ItemsProvider({ children }) {

    // Use ListsContext to apply listId to each item in order to sort them
    const { lists, activeListIndex, updateList } = useContext(ListsContext);

    // List of all items
    const [items, setItems] = useState([]);
    const [sortOrder, setSortOrder] = useState({ key: 'name', direction: 'ascending'});

    // Check on every reload if items in localStoaage exist
    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('items')) || [];
        setItems(storedItems);
        console.log(storedItems);
    }, []);

    function addItem(name, amount = 1, unit, date, comments, imageSrc) {
        const newItem = {
            id: uuidv4(),
            name,
            amount,
            unit,
            date,
            comments,
            imageSrc,
            listId: lists[activeListIndex].id,
        };
        // Get list being updated
        const listToUpdate = lists[activeListIndex];
        // Copy of items list with new item
        const updatedItems = [...items, newItem];
        // Copy of list object but with new item
        const updatedList = {...listToUpdate, items: updatedItems};
        // ListsContext function updateList() to store the new updated list to localStorage
        console.log('updatedList in addItem:', listToUpdate)
        updateList(listToUpdate.id, updatedList);
        // Set the items state to the new updated items list
        setItems(updatedItems);
        // Store the new items list to localStorage
        localStorage.setItem('items', JSON.stringify(updatedItems));
        console.log('Adding Item');
        console.log('Resulting upadtedItems', updatedItems);
    };

    function updateItem(id, updatedItem) {
        const updatedItems = items.map(item => (item.id === id ? { ...item, ...updatedItem } : item));
        setItems(updatedItems);
        localStorage.setItem('items', JSON.stringify(updatedItems));
    };

    function deleteItem(id) {
        const listId = activeListIndex;
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
        localStorage.setItem('items', JSON.stringify(updatedItems));
        console.log('Deleting item ', id);
        console.log('Resulting items size:', updatedItems.length);
    };

    function sortItems(key, direction = 'ascending') {
        setSortOrder({ key, direction });
        const listId = activeListIndex;
        const sortedItems = [...(items[listId] || [])].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        setItems({
            ...items,
            [listId]: sortedItems
        });
    }

    return (
        <ItemsContext.Provider value={{ items, addItem, updateItem, deleteItem, sortItems, sortOrder }}>
            {children}
        </ItemsContext.Provider>
    );
};

export { ItemsProvider, ItemsContext };