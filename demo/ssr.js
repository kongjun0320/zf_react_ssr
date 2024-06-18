const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send(`
        <html>
            <body>
                <div id="root">hello</div>
            </body>
        </html>    
    `);
});

app.listen(8000);
