const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/index.html');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
