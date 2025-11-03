const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const AuthRouter = require('./router/AuthRouter.js');
const ProductRouter = require('./router/productrouter.js');
require('dotenv').config();
require('./models/db.js');

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

app.get('/', (req, res) => {
  res.send('Backend deployed successfully on Vercel!');
});

// Important: do NOT use app.listen() on Vercel
module.exports = app;
