Цей проєкт демонструє базові принципи роботи REST API (GET, POST, PUT, DELETE) за допомогою вбудованого модуля http у Node.js, без використання зовнішніх фреймворків.

Структура проєкту
data.json: Файл-сховище, де зберігаються дані у форматі масиву JSON.

rest_list.js: Реалізація GET запитів (отримання всього списку та окремого ресурсу за ID).

rest_create.js: Реалізація POST запиту (створення нового ресурсу).

rest_update.js: Реалізація PUT запиту (оновлення існуючого ресурсу за ID).

rest_delete.js: Реалізація DELETE запиту (видалення ресурсу за ID).

Як запустити
Переконайтеся, що у вас встановлено Node.js.

Запустіть обраний сервер через термінал:

Bash
node <назва_файлу>.js 3000
Для перевірки використовуйте curl у терміналі.

Приклади запитів (curl)
Отримання списку:
curl -i http://localhost:3000/items

Створення ресурсу:
curl -i -X POST http://localhost:3000/items -H "Content-Type: application/json" --data-binary "{\"id\":3,\"name\":\"Gamma\"}"

Оновлення ресурсу:
curl -i -X PUT http://localhost:3000/items/2 -H "Content-Type: application/json" --data-binary "{\"name\":\"Updated Beta\"}"

Видалення ресурсу:
curl -i -X DELETE http://localhost:3000/items/2
