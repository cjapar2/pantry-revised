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
        const { name } = req.body;
        const newList =  await pool.query(
            "INSERT INTO lists (name) VALUES($1)",
            [name]
        );

        res.json(newList);
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(5000, () => {
    console.log('Server has started on port 5000.');
});