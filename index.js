const express = require('express');
const app = express();
const pool = require('./db');

const PORT = process.env.PORT || 5000;

app.use(express.json()); // => req.body

app.all('*', function(req, res, next) {
  var origin = req.get('origin'); 
  res.header('Access-Control-Allow-Origin', origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// ROUTES //

// get all articles
app.get('/articles', async (req, res) => {
  try {
    const allArticles = await pool.query('SELECT * FROM articles');
    res.json(allArticles.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get an article
app.get('/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const article = await pool.query(
      'SELECT * FROM articles WHERE article_id = $1',
      [id],
    );
    res.json(article.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// create an article
app.post('/articles', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newArticle = await pool.query(
      'INSERT INTO articles (title, description) VALUES ($1, $2) RETURNING *',
      [title, description],
    );
    res.json(newArticle.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update an article
app.put('/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedArticle = await pool.query(
      'UPDATE articles SET title = $1, description = $2 WHERE article_id = $3 RETURNING *',
      [title, description, id],
    );
    res.json(updatedArticle.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// delete an article
app.delete('/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedArticle = await pool.query(
      'DELETE FROM articles WHERE article_id = $1 RETURNING *',
      [id],
    );
    res.json(deletedArticle.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
