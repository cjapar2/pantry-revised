const express = require('express');
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

const app = express();
app.use(express.json());

// Initialize Sequelize with the database URL from the .env file
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
});

// Define Models
const List = sequelize.define('list', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: uuidv4(),
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

const Item = sequelize.define('item', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: uuidv4(),
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    amount: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
    },
    unit: Sequelize.STRING,
    date: Sequelize.DATE,
    comments: Sequelize.TEXT,
    imageSrc: Sequelize.TEXT,
    listId: {
        type: Sequelize.UUID,
        references: {
            model: List,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
});

List.hasMany(Item, { foreignKey: 'listId' });
Item.belongsTo(List, { foreignKey: 'listId' });

// Sync the models with the database
sequelize.sync();

// Define Routes
app.post('/lists', async (req, res) => {
    const { name } = req.body;
    const list = await List.create({ name });
    res.json(list);
});

app.post('/items', async (req, res) => {
    const { name, amount, unit, date, comments, imageSrc, listId } = req.body;
    const item = await Item.create({ name, amount, unit, date, comments, imageSrc, listId });
    res.json(item);
});

app.get('/lists', async (req, res) => {
    const lists = await List.findAll({ include: [Item] });
    res.json(lists);
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});