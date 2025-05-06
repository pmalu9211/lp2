const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'music';

let db, collection;

async function start() {
  await client.connect();
  db = client.db(dbName);
  collection = db.collection('song_details');
  console.log('Connected to MongoDB');
}

start();

app.get('/', async (req, res) => {
  const songs = await collection.find().toArray();
  let html = '<h2>Music Database</h2><table border="1"><tr><th>Song</th><th>Film</th><th>Director</th><th>Singer</th><th>Actor</th><th>Actress</th></tr>';
  songs.forEach(s => {
    html += `<tr><td>${s.SongName}</td><td>${s.Film}</td><td>${s.Music_director}</td><td>${s.Singer}</td><td>${s.Actor || '-'}</td><td>${s.Actress || '-'}</td></tr>`;
  });
  html += '</table>';
  res.send(html);
});

// b) Insert 5 songs
app.get('/insert', async (req, res) => {
  await collection.insertMany([
    { SongName: 'Tum Hi Ho', Film: 'Aashiqui 2', Music_director: 'Mithoon', Singer: 'Arijit Singh' },
    { SongName: 'Kal Ho Naa Ho', Film: 'Kal Ho Naa Ho', Music_director: 'Shankar-Ehsaan-Loy', Singer: 'Sonu Nigam' },
    { SongName: 'Tera Ban Jaunga', Film: 'Kabir Singh', Music_director: 'Akhil Sachdeva', Singer: 'Tulsi Kumar' },
    { SongName: 'Channa Mereya', Film: 'Ae Dil Hai Mushkil', Music_director: 'Pritam', Singer: 'Arijit Singh' },
    { SongName: 'Kun Faya Kun', Film: 'Rockstar', Music_director: 'A R Rahman', Singer: 'Mohit Chauhan' }
  ]);
  res.send('5 songs inserted');
});

// d) Total count
app.get('/count', async (req, res) => {
  const count = await collection.countDocuments();
  res.send('Total songs: ' + count);
});

// e) Songs by director
app.get('/by-director/:name', async (req, res) => {
  const songs = await collection.find({ Music_director: req.params.name }).toArray();
  res.json(songs);
});

// f) Songs by director and singer
app.get('/by-director-singer/:dir/:singer', async (req, res) => {
  const songs = await collection.find({ Music_director: req.params.dir, Singer: req.params.singer }).toArray();
  res.json(songs);
});

// g) Delete a song
app.delete('/delete/:name', async (req, res) => {
  const result = await collection.deleteOne({ SongName: req.params.name });
  res.send(`Deleted: ${result.deletedCount}`);
});

// h) Add new song
app.post('/add', async (req, res) => {
  await collection.insertOne(req.body);
  res.send('Song added');
});

// i) Songs by singer from film
app.get('/by-singer-film/:singer/:film', async (req, res) => {
  const songs = await collection.find({ Singer: req.params.singer, Film: req.params.film }).toArray();
  res.json(songs);
});

// j) Update songs with actor/actress
app.put('/add-actors', async (req, res) => {
  await collection.updateMany({}, {
    $set: { Actor: 'Unknown', Actress: 'Unknown' }
  });
  res.send('Actors added');
});

app.listen(PORT, () => {
  console.log('Server running at http://localhost:' + PORT);
});
