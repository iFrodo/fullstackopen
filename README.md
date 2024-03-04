``` mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Enters address into the URI field

    Browser->>Server: GET-request for https://studies.cs.helsinki.fi/exampleapp/notes
    Server->>Browser: response  with content-type:text/html charset=utf-8 HTML document 

    Browser->>Server: GET-request for CSS-file
    Server->>Browser: response with content-type:text/css charset=utf-8 CSS file

    Browser->>Server: GET-request for JS-file
    Server->>Browser: response with content-type:application/javascript charset=utf-8 JS file

    User->>Browser: Enters text into the field
    Browser->>User: Displays the entered text

    User->>Browser: Clicks the "Save" button
    Browser->>Server: POST-request for  /exampleapp/new-note with data
    Server->>Browser: Returns a 302 response (for example, "Note saved")

    Note right of Browser: The browser refreshes the page
    Browser->>Server: GET-request for https://studies.cs.helsinki.fi/exampleapp/notes
    Server->>Browser: response  with content-type:text/html charset=utf-8 HTML document 

    Browser->>Server: GET-request for CSS-file
    Server->>Browser: response with content-type:text/css charset=utf-8 CSS file

    Browser->>Server: GET-request for JS-file
    Server->>Browser: response with content-type:application/javascript charset=utf-8 JS file

    Browser->>User: Displays a refreshed page with a new note
```
``` mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Enters address into the URI field

    Browser->>Server: GET-request for https://studies.cs.helsinki.fi/exampleapp/notes
    Server->>Browser: response  with content-type:text/html charset=utf-8 HTML document 

    Browser->>Server: GET-request for CSS-file
    Server->>Browser: response with content-type:text/css charset=utf-8 CSS file

    Browser->>Server: GET-request for JS-file
    Server->>Browser: response with content-type:application/javascript charset=utf-8 JS file

    User->>Browser: Enters text into the field
    Browser->>User: Displays the entered text

    User->>Browser: Clicks the "Save" button
    Browser->>Server: POST-request for  /exampleapp/new-note with data
    Server->>Browser: Returns a 302 response (for example, "Note saved")

    Note right of Browser: The browser refreshes the page
    Browser->>Server: GET-request for https://studies.cs.helsinki.fi/exampleapp/notes
    Server->>Browser: response  with content-type:text/html charset=utf-8 HTML document 

    Browser->>Server: GET-request for CSS-file
    Server->>Browser: response with content-type:text/css charset=utf-8 CSS file

    Browser->>Server: GET-request for JS-file
    Server->>Browser: response with content-type:application/javascript charset=utf-8 JS file

    Browser->>User: Displays a refreshed page with a new note


```
