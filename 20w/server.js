const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
let collection;

async function connectDB() {
    await client.connect();
    const db = client.db('company');
    collection = db.collection('employees');
    console.log('Connected to MongoDB');
}
connectDB();

// Create: Add new employee
app.post('/employees', async (req, res) => {
    const result = await collection.insertOne(req.body);
    res.send(result);
});

// Read: Get all employees
app.get('/employees', async (req, res) => {
    const employees = await collection.find().toArray();
    res.json(employees);
});

// Update: Modify employee details
app.put('/employees/:id', async (req, res) => {
    const id = req.params.id;
    const update = { $set: req.body };
    const result = await collection.updateOne({ _id: new ObjectId(id) }, update);
    res.send(result);
});

// Delete: Remove an employee
app.delete('/employees/:id', async (req, res) => {
    const id = req.params.id;
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    res.send(result);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
