const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'student';
let db, collection;

async function start() {
    await client.connect();
    db = client.db(dbName);
    collection = db.collection('studentmarks');
    console.log("Connected to MongoDB");
}
start();

// d) Show all students and count
app.get('/', async (req, res) => {
    const students = await collection.find().toArray();
    const count = await collection.countDocuments();
    let html = `<h2>Total Students: ${count}</h2><table border="1"><tr><th>Name</th><th>Roll No</th><th>WAD</th><th>CC</th><th>DSBDA</th><th>CNS</th><th>AI</th></tr>`;
    students.forEach(s => {
        html += `<tr><td>${s.Name}</td><td>${s.Roll_No}</td><td>${s.WAD_Marks}</td><td>${s.CC_Marks}</td><td>${s.DSBDA_Marks}</td><td>${s.CNS_Marks}</td><td>${s.AI_Marks}</td></tr>`;
    });
    html += '</table>';
    res.send(html);
});

// c) Insert sample students
app.get('/insert', async (req, res) => {
    await collection.insertMany([
        { Name: "Amit", Roll_No: 1, WAD_Marks: 25, CC_Marks: 27, DSBDA_Marks: 28, CNS_Marks: 22, AI_Marks: 30 },
        { Name: "Sneha", Roll_No: 2, WAD_Marks: 18, CC_Marks: 20, DSBDA_Marks: 21, CNS_Marks: 25, AI_Marks: 23 },
        { Name: "Raj", Roll_No: 3, WAD_Marks: 30, CC_Marks: 32, DSBDA_Marks: 35, CNS_Marks: 31, AI_Marks: 29 },
        { Name: "Priya", Roll_No: 4, WAD_Marks: 22, CC_Marks: 24, DSBDA_Marks: 20, CNS_Marks: 19, AI_Marks: 17 },
        { Name: "Kiran", Roll_No: 5, WAD_Marks: 38, CC_Marks: 36, DSBDA_Marks: 39, CNS_Marks: 40, AI_Marks: 37 }
    ]);
    res.send("Inserted sample students");
});

// e) Students with >20 in DSBDA
app.get('/dsbda-above-20', async (req, res) => {
    const result = await collection.find({ DSBDA_Marks: { $gt: 20 } }).project({ Name: 1, _id: 0 }).toArray();
    res.json(result);
});

// f) Update marks +10 for specified student
app.put('/boost/:name', async (req, res) => {
    const name = req.params.name;
    await collection.updateOne({ Name: name }, {
        $inc: {
            WAD_Marks: 10,
            CC_Marks: 10,
            DSBDA_Marks: 10,
            CNS_Marks: 10,
            AI_Marks: 10
        }
    });
    res.send(`${name}'s marks boosted by +10`);
});

// g) Students scoring >25 in all subjects
app.get('/all-above-25', async (req, res) => {
    const result = await collection.find({
        WAD_Marks: { $gt: 25 },
        CC_Marks: { $gt: 25 },
        DSBDA_Marks: { $gt: 25 },
        CNS_Marks: { $gt: 25 },
        AI_Marks: { $gt: 25 }
    }).project({ Name: 1, _id: 0 }).toArray();
    res.json(result);
});

// h) Students scoring <40 in WAD and CC (Math & Sci)
app.get('/low-math-sci', async (req, res) => {
    const result = await collection.find({
        WAD_Marks: { $lt: 40 },
        CC_Marks: { $lt: 40 }
    }).project({ Name: 1, _id: 0 }).toArray();
    res.json(result);
});

// i) Delete a student
app.delete('/delete/:name', async (req, res) => {
    const name = req.params.name;
    const result = await collection.deleteOne({ Name: name });
    res.send(`Deleted ${result.deletedCount} record(s)`);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
