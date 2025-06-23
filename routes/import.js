const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.send(`
    <h2>Import Excel or CSV</h2>
    <form action="/api/v1/import" method="post" enctype="multipart/form-data">
      <input type="file" name="file" accept=".xlsx, .xls, .csv" required />
      <button type="submit">Upload</button>
    </form>
  `);
});

module.exports = router;
