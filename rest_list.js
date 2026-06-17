const http = require('http');
const fs = require('fs');
const path = require('path');

// Отримуємо порт з аргументів командного рядка
const port = process.argv[2] || 3000;
const dataPath = path.join(__dirname, 'data.json');

const server = http.createServer((req, res) => {
  // Перевіряємо метод та шлях
  if (req.method === 'GET' && req.url === '/items') {
    
    // Читаємо файл data.json
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Server Error');
      }

      // Встановлюємо заголовки та повертаємо дані
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });

  } else {
    // Обробка невідомих маршрутів або методів
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});