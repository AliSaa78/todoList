const express = require('express');
const path = require('path');
const login = require('./routes/loginRoute');
const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(login);

app.listen(3000);