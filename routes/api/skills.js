const express = require('express');

const router = express.Router();

//controller, application logic that sends data based on request
router.get('/', async function(req, res) {
    //request data from user/network 
    //decide response- json data that is in an array
    res.json([
        {id: 1, name: 'HTML'},
        {id: 2, name: 'CSS'}
    ]);
});
//curl- client url
module.exports = router;