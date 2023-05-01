const express = require('express');
const app = express()
const port = process.env.PORT || 5000;
const categories = require('./data/categories.json')
const news = require('./data/news.json')
const cors = require('cors')
app.use(cors())
app.get('/', (req, res) => {
    res.send('dragon is running')
})
app.get('/categories', (req, res) => {
    res.send(categories)
})
// to send all news to the site
app.get('/news', (req, res) => {
    res.send(news);
})
// to send a single news based on id matching (:id)
app.get('/news/:id', (req, res) => {
    const id = req.params.id
    const selectedNews = news.find(n => n._id === id)
    res.send(selectedNews)
})

// dynamic url based on category
app.get('/categories/:id', (req, res) => {
    const id = parseInt(req.params.id);
    // id 0 means all news,so we have to do this
    if (id === 0) {
        res.send(news)
    }
    else {
        const categoryNews = news.filter(n => parseInt(n.category_id) === id)
        res.send(categoryNews)
    }
})
app.listen(port, () => {
    console.log(`dragon is listening on port ${port}`);
})