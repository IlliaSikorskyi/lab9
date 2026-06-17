const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.argv[2] || 3000;
const dataPath = path.join(__dirname, 'data.json');

const server = http.createServer((req, res) => {
  // Обробка POST /items
  if (req.method === 'POST' && req.url === '/items') {
    let body = '';

    // Збираємо дані, які приходять у запиті
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // Коли всі дані отримані
    req.on('end', () => {
      try {
        const newItem = JSON.parse(body);

        // Читаємо існуючий файл
        fs.readFile(dataPath, 'utf8', (err, data) => {
          const items = err ? [] : JSON.parse(data);
          
          // Додаємо новий елемент
          items.push(newItem);

          // Записуємо оновлений масив назад у файл
          fs.writeFile(dataPath, JSON.stringify(items, null, 2), (err) => {
            if (err) {
              res.writeHead(500);
              return res.end('Error saving data');
            }
            // Повертаємо 201 Created та створений об'єкт
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newItem));
          });
        });
      } catch (e) {
        res.writeHead(400); // Помилка, якщо JSON некоректний
        res.end('Invalid JSON');
      }
    });
    return;
  }

  // Обробка 404 для інших випадків
  res.writeHead(404);
  res.end();
});

server.listen(port);