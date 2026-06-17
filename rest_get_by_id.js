const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.argv[2] || 3000;
const dataPath = path.join(__dirname, 'data.json');

const server = http.createServer((req, res) => {
  // 1. Обробка списку (як у 9.1)
  if (req.method === 'GET' && req.url === '/items') {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });
    return;
  }

  // 2. Обробка конкретного елемента /items/:id
  if (req.method === 'GET' && req.url.startsWith('/items/')) {
    const id = parseInt(req.url.split('/')[2]); // Отримуємо ID після /items/

    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end();
      }

      const items = JSON.parse(data);
      const item = items.find(i => i.id === id);

      if (item) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(item));
      } else {
        res.writeHead(404);
        res.end();
      }
    });
    return;
  }

  // 3. Якщо нічого не підійшло
  res.writeHead(404);
  res.end();
});

server.listen(port);