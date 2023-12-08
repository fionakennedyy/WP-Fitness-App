const express = require('express');
const { getAll, get, search, create, update, remove} = require('../models/comments');
const router = express.Router();

router.get('/', (req, res, next) => {

    getAll()
        .then((comments) => {
            res.send(comments);
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
            .then((comment) => {
                if (comment) {
                    res.send(comment);
                } else {
                    res.status(404).send({ error: 'Comment not found' });
                }
            }).catch(next);

    })

    .get('/:postID', (req, res, next) => {
        get(+req.params.postID)
            .then((comment) => {
                if (comment) {
                    res.send(comment);
                } else {
                    res.status(404).send({ error: 'No comments on this post found' });
                }
            }).catch(next);

    })

    .post('/', (req, res, next) => {
        create(req.body)
            .then((comment) => {
                res.send(comment);
            }).catch(next);

    })

    .patch('/:id', (req, res, next) => {
        req.body.id = +req.params.id;
        update(req.body)
            .then((comment) => {
                res.send(comment);
            }).catch(next);

    })

    .delete('/:id', (req, res, next) => {
        remove(+req.params.id)
            .then(() => {
                res.send({ message: 'Comment removed' });
            }).catch(next);

    })

module.exports = router;