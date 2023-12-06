const express = require('express');
const { getAll, get, search, create, update, remove } = require('../models/users');
const router = express.Router();

/*
  Route handler for HTTP GET requests
  get() specifies that handler should be invoked when a GET request is made to root path
  the arrow function serves as the handler
  req: HTTP request
  res: object rep the HTTP response sent to client
  next: function, passes control to next middleware/route handler
*/
router.get('/', (req, res, next) => {

    res.send(getAll()); // sends response to client

})

.get('/search' , (req, res, next) => {

    const results = search(req.query.q);
    res.send(results);

})

.get('/:id', (req, res, next) => {

  const user = get(+req.params.id);
  if(user) {
    res.send( user );
  }else {
    res.status(404).send({error: 'User not found'});
  }

})

.post('/', (req, res, next) => {
  // body exists bc we use the json parser
  const user = create(req.body);
  res.send(user);
})

.patch('/:id', (req, res, next) => {
  const user = update(req.body);
  res.send(user);
})

.delete('/:id', (req, res, next) => {
  remove(+req.params.id); // '+' converts ID to a number
  res.send({message: 'User removed'});
})

module.exports = router;