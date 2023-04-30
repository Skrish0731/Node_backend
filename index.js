const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {

    console.log(req.url);

    if (req.url === '/') {
        // Serve the main website file
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        });
    } else if (req.url === '/api') {
        // Serve the Vue.js application file
        fs.readFile(path.join(__dirname, 'public','db.json'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(content);
        });
    } else {
        // Serve static files for the main website
        const filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
        const extname = path.extname(filePath);
        const contentType = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.wav': 'audio/wav',
            '.mp4': 'video/mp4',
            '.woff': 'application/font-woff',
            '.ttf': 'application/font-ttf',
            '.eot': 'application/vnd.ms-fontobject',
            '.otf': 'application/font-otf',
            '.wasm': 'application/wasm'
        }[extname] || 'text/plain';

        fs.readFile(filePath, function (error, content) {
            if (error) {
                if (error.code == 'ENOENT') {
                    // Handle 404 error
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end('<h1>404 Not Found</h1><p>The requested URL ' + req.url + ' was not found on this server.</p>');
                }
                else {
                    // Handle other errors
                    res.writeHead(500);
                    res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                    res.end();
                }
            }
            else {
                // Serve the requested file
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }

});

const PORT = process.env.PORT || 4304;
server.listen(PORT,()=> console.log(`Great our server is working ${PORT}`)) 

