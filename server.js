const express = require('express');
const http = require('http')
const path = require('path');

const app = express();

const allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
  ];

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
        res.sendFile(path.resolve('public/${req.url}'));
    } else {
        res.sendFile(path.resolve('dist/index.html'));
    }
});

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('WesleyPay is running on port ' + port));