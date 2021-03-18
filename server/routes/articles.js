const express = require('express')
const mongoose = require('mongoose')
const Article = require('../models/article')
const router = new express.Router()

// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://database/daily-trends';

// Connect to mongodb
mongoose.connect(dbHost);

/* GET all articles. */
router.get('/articles', (req, res) => {
    Article.find({}, (err, articles) => {
        if (err) res.status(500).send(error)

        res.status(200).json(articles);
    });
});

/* GET one article. */
router.get('/articles/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        if (err) res.status(500).send(error)

        res.status(200).json(article);
    });
});

/* Create an article. */
router.post('/articles', (req, res) => {
    let article = new Article({
        _id: req.body.id,
        title: req.body.title,
        body: req.body.body,
        image: req.body.image,
        source: req.body.source,
        publisher: req.body.publisher
    });

    article.save(error => {
        if (error) res.status(500).send(error);

        res.status(201).json({
            message: 'Article created successfully'
        });
    });
});

/* Update an article. */
router.put("/articles/:id", (req, res) => {

    let article = new Article({
        _id: req.body.id,
        title: req.body.title,
        body: req.body.body,
        image: req.body.image,
        source: req.body.source,
        publisher: req.body.publisher
    });

    Article.updateOne({ _id: req.params.id}, article).then(
        result => {
        if(result){
            res.status(200).json({ message: "Update successful!" });
        }
        
        else {
            res.status(500).json({ message: "Error Upating Post" });
        }
    });
});

/* Delete an article. */
router.delete("/articles/:id", (req, res) => {
    Article.deleteOne({ _id: req.params.id}).then(
        result => {
        if (result.n > 0) {
            res.status(200).json({ message: "Deletion successful!" });
        } else {
            return res.status(204).json({ message: "No Content" });
        }
        }
    );
});

module.exports = router