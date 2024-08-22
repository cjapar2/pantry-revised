const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./src/db');

// middleware
app.use(cors());
app.use(express.json());

// get all lists
app.get('/lists', async(req, res) => {
    try {
        const allLists = await pool.query("SELECT * FROM lists");
        res.json(allLists.rows);
    } catch {
        console.error(err.message);
    }
});

// create a list
app.post('/lists', async(req, res) => {
    try {
        console.log(req.body);
        const { name, amount, unit, date, comments, imageSrc, listId } = req.body;
        const newList =  await pool.query(
            "INSERT INTO lists (name) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [name, amount, unit, date, comments, imageSrc, listId]
        );

        res.json(newList.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// update a list
app.put('/lists/:list_id', async(req, res) => {
    try {
        const { list_id } = req.params;
        const { name } = req.body;
        const updateList = await pool.query(
            "UPDATE lists SET name = $1 WHERE list_id = $2",
            [name, list_id]
        );
        res.json('List updated');

    } catch (err) {
        console.error(err.message);
    }
});

// ----------ITEMS----------

// get all items
app.get('/items', async(req, res) => {
    try {
        const allItems = await pool.query("SELECT * FROM items");
        res.json(allItems.rows);
    } catch {
        console.error(err.message);
    }
});

// create an item for a specific list
app.post('/items/:list_id', async(req, res) => {
    try {
        req.body['list_id'] = req.params.list_id; // Set list_id to the parameter to select the specified list
        const columns = ['name', 'amount', 'unit', 'date', 'comments', 'imageSrc', 'list_id'];
        const values = columns.map((column, index) => '$' + (index+1)); // $1,$2,$3,$4
        const insertText = `INSERT INTO items(` + columns.toString() + `) VALUES(` + values.toString() + `) RETURNING *;`;
        const queryText = {
            text: insertText,
            values: columns.map((column) => req.body[column]),
        }
        const newItem = await pool.query(queryText);

        res.json(newItem.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// update an item
app.put('/items/:item_id', async(req, res) => {
    try {
        const { item_id } = req.params;
        const columns = ['name', 'amount', 'unit', 'date', 'comments', 'imageSrc'];
        const setValues = columns.map((column, index) => column + ` = $` + (index+1));
        const updateText = `UPDATE items SET ${setValues} WHERE item_id = $${columns.length + 1} RETURNING *;`;

        const values = columns.map(column => req.body[column]);
        values.push(item_id);
        const queryText = {
            text: updateText,
            values: values
        };

        console.log('queryText', queryText);

        const updateItem = await pool.query(queryText);
        res.json('Item updated');

    } catch (err) {
        console.error(err.message);
    }
});

// delete an item
app.delete('/items/:item_id', async(req, res) => {
    try {
        const { item_id } = req.params;
        const deleteItem = await pool.query(
            "DELETE FROM items WHERE item_id = $1",
            [item_id]
        );
        res.json('Item deleted!');
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(5000, () => {
    console.log('Server has started on port 5000.');
});