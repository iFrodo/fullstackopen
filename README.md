```mermaid
graph TD;
A-->B;
A-->C;
B-->D;
C-->D;
  ```
```mermaid
graph TD;
sequenceDiagram
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: Браузер начинает выполнение JavaScript-кода, который получает JSON с сервера

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: Браузер выполняет обратный вызов (callback) функции, которая отображает заметки
  
  ```
