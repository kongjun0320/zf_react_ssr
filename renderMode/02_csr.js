const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div id="root"></div>
    </body>
    <script>
        document.getElementById('root').innerHTML = 'csr';
    </script>
</html>
        `);
});

app.listen(3002, () => console.log('3002'));
