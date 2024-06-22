const express = require('express');
const session = require('express-session');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(
  session({
    saveUninitialized: true,
    resave: true,
    secret: 'ai_cherish',
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.post('/api/login', (req, res) => {
  const user = req.body;
  req.session.user = user;
  res.json({
    success: true,
    data: user,
  });
});

app.get('/api/logout', (req, res) => {
  req.session.user = null;
  res.json({
    success: true,
  });
});

app.get('/api/validate', (req, res) => {
  const user = req.session.user;
  if (user) {
    res.json({
      success: true,
      data: user,
    });
  } else {
    res.json({
      success: false,
      data: '用户未登录',
    });
  }
});

app.listen(3333, () => console.log(3333));
