``` mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Открывает страницу
    Browser->>User: Отображает страницу

    User->>Browser: Вводит текст в поле
    Browser->>User: Отображает введенный текст

    User->>Browser: Нажимает кнопку "Сохранить"
    Browser->>Server: POST-запрос на /exampleapp/notes с данными
    Server->>Browser: Возвращает ответ (например, "Заметка сохранена")

    Note right of Browser: Браузер обновляет страницу
    Browser->>User: Отображает обновленную страницу с новой заметкой


```
