const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS')
  next();
});

app.post('/api/pokemon', (req, res, next) => {
  const pokemon = req.body;
  console.log(pokemon);
  res.status(201).json({
    message: 'Pokemon added'
  });
});

app.get('/api/pokemon', (req, res, next) => {
  const pokemon = [
    {
      id: '1234564',
    name: 'bulba',
    description: 'fuckin bulb'
    },
    {
      id: '5462456',
      name: 'ivyso',
      description: 'nother fuckin bulb'
    }
  ];
  res.status(200).json({
    message: 'fetched da pokemans',
    pokemon: pokemon
  });
});

module.exports = app;
