const express = require('express');
const ensureAuthenticated = require('../middleware/Auth');

const router = express.Router();

router.get('/', ensureAuthenticated, (req, res) => {
    
    res.status(200).json([
        { name: "mobile", price: 10000 },
        { name: "tv", price: 25000 }
    ]);
});

module.exports = router;
