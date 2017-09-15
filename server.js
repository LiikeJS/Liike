const express = require('express');

const app = express();

app.use(express.static('.'));

app.listen(8080, () => {
  console.log('Open your browser: http://localhost:8080');
});
