const path = require('path');
const express = require('express');

const app = express();

const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';
const port = 8080;

const options = {
    index: false,
    dotfiles: 'deny',
    etag: true,
};

const assetsOptions = Object.assign({}, options, {
    maxAge: '4w',
});

const staticOptions = Object.assign({}, options, {
    maxAge: '1d',
});

app
    .use('/static', express.static(path.join(__dirname, 'dist'), staticOptions))
    .use('/static', express.static(path.join(__dirname, 'assets'), assetsOptions))
    .use('/assets', express.static(path.join(__dirname, 'assets'), assetsOptions))
;


app.get("/*.worker.js", (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'pdf.worker.js'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, host, (err) => {
    if (err) {
        console.error(err);
        return;
    }

    console.info(`Listening at http://${host}:${port}`);
});