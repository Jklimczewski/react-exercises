const express = require("express");
const dbo = require("../db/conn");

const router = express.Router();

router.get('/exercises', async (req, response) => {
  let db_connect = dbo.getDb();
  const cursor = await db_connect.collection("exercises").find({});
  cursor.toArray(function(err, result) {
      if (err) throw err;
      response.json(result);
  });
})

router.post('/exercises', (req, response) => {
  let db_connect = dbo.getDb();
  const {id, exercise, weight, date} = req.body;
  const myquery = {id: id, exercise: exercise, weight: weight, date: date};
  db_connect.collection("exercises").insertOne(myquery, function(err, res) {
    if (err) throw err;
    response.status(201).send("Adding...");
  })
})

router.delete('/exercises/:id/delete', (req, response) => {
  let db_connect = dbo.getDb();
  const id = parseInt(req.params.id);
  const myquery = { id: id };
  db_connect.collection("exercises").deleteOne(myquery, function(err, res){
    if (err) throw err;
    else response.json(res);
  })
})

router.put('/exercises/:id/update', (req, response) => {
  let db_connect = dbo.getDb();
  const id = parseInt(req.params.id);
  const myquery = {id: id}
  const newValues = {
    $set: {
        id: req.body.id,
        exercise: req.body.exercise,
        weight: req.body.weight,
        date: req.body.date
    }
};
  db_connect.collection("exercises").updateOne(myquery, newValues, function(err, res) {
    if (err) throw err;
    response.status(201).send("Updating...");
  })
})

router.delete('/exercises/:id/notes', (req, response) => {
  let db_connect = dbo.getDb();
  const id = parseInt(req.params.id);
  const myquery = {exId: id}
  db_connect.collection("notes").deleteMany(myquery, function(err, res) {
    if (err) throw err;
    else response.json(res);
  })
})

router.get('/notes', async (req, response) => {
  let db_connect = dbo.getDb();
  const cursor = await db_connect.collection("notes").find({});
  cursor.toArray(function(err, result) {
      if (err) throw err;
      response.json(result);
  });
})

router.post('/notes', (req, response) => {
  let db_connect = dbo.getDb();
  const {id, exId, body, data} = req.body;
  const myquery = {id: id, exId: exId, body: body, data: data};
  db_connect.collection("notes").insertOne(myquery, function(err, res) {
    if (err) throw err;
    response.status(201).send("Adding...");
  })
})

router.delete('/notes/:id/delete', (req, response) => {
  let db_connect = dbo.getDb();
  const id = parseInt(req.params.id);
  const myquery = { id: id };
  db_connect.collection("notes").deleteOne(myquery, function(err, res){
    if (err) throw err;
    else response.json(res);
  })
})

router.put('/notes/:id/update', (req, response) => {
  let db_connect = dbo.getDb();
  const id = parseInt(req.params.id);
  const myquery = {id: id}
  const newValues = {
    $set: {
        id: req.body.id,
        exId: req.body.exId,
        body: req.body.body,
        data: req.body.data,
    }
  };
  db_connect.collection("notes").updateOne(myquery, newValues, function(err, res) {
    if (err) throw err;
    response.status(201).send("Updating...");
  })
})

module.exports = router;