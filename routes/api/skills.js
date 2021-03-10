const express = require('express');

const router = express.Router();

//models are javascript databases
const models = require('../../models');

//controller, application logic that sends data based on request
router.get('/', async function(req, res) {
    //request data from user/network 
    //decide response- json data that is in an array
    const rows = await models.Skill.findAll();
    res.json(rows);
});

router.post('/', async function(req, res) {
    //build is not async (not to database, build new Skill row in memory)
    //the body is the extracted data from the request
    const row = models.Skill.build(req.body);
    //try to save this new row
    try {
      await row.save();
      //if successful, return 201 status (CREATED), and the JSON data of the row
      res.status(201).json(section);
    } catch (error) {
        //if the database returned an error, print it to the console
      console.log(error);
      //send back the UNPROCESSABLE ENTITY error code and the error message itself
      res.status(422).json(error);
    }
  });

  router.get('/:id', async function(req, res) {
    const row = await models.Skill.findByPk(req.params.id);
    if (row) {
      res.json(row);
    } else {
      res.status(HttpStatus.NOT_FOUND).end();
    }
  });
  
  router.patch('/:id', async function(req, res) {
    const row = await models.Skill.findByPk(req.params.id);
    if (row) {
      try {
        await row.update(req.body);
        res.status(HttpStatus.OK).end();  
      } catch (error) {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(error);
      }
    } else {
      res.status(HttpStatus.NOT_FOUND).end();
    }
  })
  
  router.delete('/:id', async function(req, res) {
    const row = await models.Skill.findByPk(req.params.id);
    if (row) {
      await row.destroy();
      res.status(HttpStatus.OK).end();
    } else {
      res.status(HttpStatus.NOT_FOUND).end();
    }
  });



/*async- the code runs not in order of the code that is written 
takes time, so run it in the background but load everything else in the mean time (ex: find all)

await- inside an async function, finish retrieving before rendering*/


//curl- client url
module.exports = router;