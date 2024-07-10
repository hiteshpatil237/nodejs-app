import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import db from "./mongoC.js";

const port = 4000;
const app = express();

// Enable CORS for all origins
app.use(cors());

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));
 
// Parses the text as json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

app.post('/addUser', async (req, res) => {
    let collection = await db.collection("users");
    let newDocument = req.body;
    newDocument.date = new Date();
    let result = await collection.insertOne(newDocument);
    console.log("rreq" + req.body);
    res.status(204).send(result);
});

app.get('/getUsers', async (req, res) => {
    let collection = await db.collection("users");
    let results = await collection.find({}).toArray();
    res.status(200).send(results);
});

app.listen(port, function () {
    console.log("Server is listening at port:" + port);
});
