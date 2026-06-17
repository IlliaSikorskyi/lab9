const http = require('http');
const fs = require('fs');
const path = require('path');

// Отримуємо порт з аргументів (за замовчуванням 3000)
const port = process.argv[2] || 3000;
const dataPath = path.join(__dirname, 'data.json');

const server = http.createServer((req, res) => {
  // Перевіряємо метод PUT та маршрут, що починається з /items/
  if (req.method === 'PUT' && req.url.startsWith('/items/')) {
    // Витягуємо ID з URL (наприклад, з /items/2 отримуємо 2)
    const id = parseInt(req.url.split('/')[2]);
    let body = '';

    // Збираємо тіло запиту
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500);
          return res.end('Error reading data');
        }

        let items = JSON.parse(data);
        const itemIndex = items.findIndex(i => i.id === id);

        // Перевіряємо, чи існує елемент з таким ID
        if (itemIndex !== -1) {
          try {
            const updates = JSON.parse(body);
            // Оновлюємо тільки передані поля
            items[itemIndex] = { ...items[itemIndex], ...updates };

            // Записуємо оновлений масив назад у файл
            fs.writeFile(dataPath, JSON.stringify(items, null, 2), (err) => {
              if (err) {
                res.writeHead(500);
                return res.end('Error writing data');
              }
              // Повертаємо 200 OK та оновлений об'єкт
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(items[itemIndex]));
            });
          } catch (e) {
            res.writeHead(400);
            res.end('Invalid JSON');
          }
        } else {
          // Якщо елемент не знайдено — повертаємо 404
          res.writeHead(404);
          res.end('Item not found');
        }
      });
    });
    return;
  }

  // Обробка всіх інших запитів
  res.writeHead(404);
  res.end('Not Found');
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});