``` mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Enters address into the URI field

    Browser->>Server: GET-request for https://studies.cs.helsinki.fi/exampleapp/notes
    Server->>Browser: HTML document CSS file JS script 

    User->>Browser: Enters text into the field
    Browser->>User: Displays the entered text

    User->>Browser: Clicks the "Save" button
    Browser->>Server: POST-request for на /exampleapp/notes with data
    Server->>Browser: Returns a response (for example, "Note saved")

    Note right of Browser: The browser refreshes the page
    Browser->>Server: GET-request for https://studies.cs.helsinki.fi/exampleapp/notes
    Server->>Browser: Returns a response with HTML
    Browser->>User: Displays a refreshed page with a new note


```
