const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./src/db');

// middleware
app.use(cors());
app.use(express.json());


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

// get all lists
app.get('/lists', async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM lists");
        res.json(allTodos.rows);
    } catch {
        console.error(err.message);
    }
});

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

app.listen(5000, () => {
    console.log('Server has started on port 5000.');
});

// create an item
app.post('/items/:list_id', async(req, res) => {
    try {
        console.log(req.body);
        const { name } = req.body;
        const newList =  await pool.query(
            "INSERT INTO lists (name) VALUES($1) RETURNING *",
            [name]
        );

        res.json(newList.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})