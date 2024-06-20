const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/users', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 1,
        name: 'jack',
      },
      {
        id: 2,
        name: 'tom',
      },
      {
        id: 3,
        name: 'mike',
      },
    ],
  });
});

app.listen(3333, () => console.log(3333));
