const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Pokemon = require('./models/pokemon');

const app = express();
mongoose.connect("mongodb+srv://Will:yZK2KqTYxMvNMFiC@cluster0.ayi8bgf.mongodb.net/node-Angular?retryWrites=true&w=majority")
  .then(() => {
    console.log('connected to DB');
  })
  .catch(() => {
    console.log('DB connection failed');
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS')
  next();
});

app.post('/api/pokemon', (req, res, next) => {
  const pokemon = new Pokemon({
    name: req.body.name,
    description:req.body.description
  });
  pokemon.save().then(createdPokemon => {
    res.status(201).json({
      message: "Post added successfully",
      pokemonId: createdPokemon._id
    });
  });
});

app.get('/api/pokemon', (req, res, next) => {
  Pokemon.find()
    .then(documents => {
      res.status(200).json({
        message: 'fetched da pokemans',
        pokemon: documents
      });
    });
});

app.delete("/api/pokemon/:id", (req, res, next) => {
  Pokemon.deleteOne({_id: req.params.id}).then(result => {
    console.log(result)
    res.status(200).json({message: "pokemon deleted"});
  });
});
module.exports = app;
