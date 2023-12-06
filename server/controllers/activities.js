const express = require('express');
const { getAll, get, search, create, update, remove, seed } = require('../models/activities');
const router = express.Router();

router.get('/', (req, res, next) => {

    getAll()
        .then((activities) => {
            res.send(activities);
        })
        .catch(next)

})

    .get('/search', (req, res, next) => {
        search(req.query.q)
            .then((results) => {
                res.send(results);
            }).catch(next);

    })

    .get('/:id', (req, res, next) => {
        get(+req.params.id)
            .then((activity) => {
                if (activity) {
                    res.send(activity);
                } else {
                    res.status(404).send({ error: 'Activity not found' });
                }
            }).catch(next);

    })

    .post('/', (req, res, next) => {
        create(req.body)
            .then((activity) => {
                res.send(activity);
            }).catch(next);

    })

    .patch('/:id', (req, res, next) => {
        req.body.id = +req.params.id;
        update(req.body)
            .then((activity) => {
                res.send(activity);
            }).catch(next);

    })

    .delete('/:id', (req, res, next) => {
        remove(+req.params.id)
            .then(() => {
                res.send({ message: 'Activity removed' });
            }).catch(next);

    })

    .post('/seed', (req, res, next) => {
        seed()
            .then(() => {
                res.send({ message: 'Activities seeded' });
            }).catch(next);

    })

module.exports = router;