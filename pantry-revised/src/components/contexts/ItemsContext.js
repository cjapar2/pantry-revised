import React, { createContext, useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ListsContext } from './ListsContext';

const ItemsContext = createContext();

function ItemsProvider({ children }) {

    const { lists, activeList } = useContext(ListsContext);
    console.log('activeList:', activeList);

    const [items, setItems] = useState([]);
    const [sortOrder, setSortOrder] = useState({ key: 'name', direction: 'ascending'});

    // useEffect(() => {
    //     const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    //     setItems(storedItems);
    //     console.log(storedItems);
    // }, []);

    function addItem(name, amount = 1, unit, date, comments, imageSrc) {
        const newItem = {
            id: uuidv4(),
            name,
            amount,
            unit,
            date,
            comments,
            imageSrc,
            listId: lists[activeList].id,
        };
        const updatedItems = [...items, newItem];
        console.log('items b4 setItems', items);
        setItems(updatedItems);
        console.log('items after setItems', items);
        // console.log('updatedItems:', updatedItems);
        localStorage.setItem('items', JSON.stringify(updatedItems));
        // console.log('Adding Item', localStorage.getItem('items'), items);
        // console.log('Resulting upadtedItems', updatedItems);
    };

    function updateItem(id, updatedItem) {
        const listId = activeList;
        const updatedItems = {
            ...items,
            [listId]: items[listId].map(item => (item.id === id ? { ...item, ...updatedItem } : item))
        };
        setItems(updatedItems);
        localStorage.setItem('items', JSON.stringify(updatedItems));
    };

    function deleteItem(id) {
        const listId = activeList;
        const updatedItems = {
            ...items,
            [listId]: items[listId].filter(item => item.id !== id)
        };
        setItems(updatedItems);
        localStorage.setItem('items', JSON.stringify(updatedItems));
        console.log('Deleting item ', id);
        console.log('Resulting items size:', updatedItems.length);
    };

    function sortItems(key, direction = 'ascending') {
        setSortOrder({ key, direction });
        const listId = activeList;
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
        <ItemsContext.Provider value={{ items: items[activeList] || [], addItem, updateItem, deleteItem, sortItems, sortOrder }}>
            {children}
        </ItemsContext.Provider>
    );
};

export { ItemsProvider, ItemsContext };