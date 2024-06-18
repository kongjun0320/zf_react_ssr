const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send(`
        <html>
            <body>
                <div id="root"></div>
                <script>
                    document.getElementById('root').innerHTML = 'csr content'
                </script>
            </body>
        </html>    
    `);
});

app.listen(9000);
