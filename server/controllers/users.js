/*
    Controller:
    Manages flow of data between the model and the view.
    Handles user input, processes requests, updates model, and triggers changes in view.
*/

const express = require('express');
const { getAll, get, search, create, update, remove, login, register } = require('../models/users');
const { requireUser } = require('../middleware/authorization');
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
    .get('/search', (req, res, next) => {

        const results = search(req.query.q);
        res.send(results);
    })
    .get('/:id', (req, res, next) => {

        const user = get(+req.params.id);
        res.send(user);

    })
    .post('/', (req, res, next) => {

        const user = create(req.body);
        res.send(user);

    })
    .post('/register', async (req, res, next) => {
        try {
            const user = await register(req.body.firstName, req.body.lastName, req.body.email, req.body.birthdate, req.body.gender);
            res.send(user);
        } catch (error) {
            next(error);
        }
    })
    .post('/login', async (req, res, next) => {
        try {
            const user = await login(req.body.email, req.body.password);
            res.send(user);
        } catch (error) {
            next(error);
        }
    })
    .patch('/:id', (req, res, next) => {

        if (req.user.id !== +req.params.id && !req.user.admin) {
            return next({
                status: 403,
                message: 'You can only edit your own account. (Unless you are an Admin)'
            });
        }
        req.body.id = +req.params.id;
        const user = update(req.body);
        res.send(user);

    })
    .delete('/:id', requireUser(true), (req, res, next) => {

        remove(+req.params.id); // '+' converts ID to a number
        res.send({ message: 'User removed' });
    });

module.exports = router;