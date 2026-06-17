const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.argv[2] || 3000;
const dataPath = path.join(__dirname, 'data.json');

const server = http.createServer((req, res) => {
  // Обробка DELETE /items/:id
  if (req.method === 'DELETE' && req.url.startsWith('/items/')) {
    const id = parseInt(req.url.split('/')[2]);

    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Error reading data');
      }

      let items = JSON.parse(data);
      const initialLength = items.length;
      
      // Відфільтровуємо масив, залишаючи все, крім елемента з цим ID
      const newItems = items.filter(i => i.id !== id);

      // Перевіряємо, чи був видалений хоча б один елемент
      if (newItems.length < initialLength) {
        fs.writeFile(dataPath, JSON.stringify(newItems, null, 2), (err) => {
          if (err) {
            res.writeHead(500);
            return res.end('Error saving data');
          }
          res.writeHead(200);
          res.end(); // Статус 200 при успішному видаленні
        });
      } else {
        // Якщо елемент не знайдено — 404
        res.writeHead(404);
        res.end('Item not found');
      }
    });
    return;
  }

  res.writeHead(404);
  res.end();
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});