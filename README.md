``` mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: GET https://studies.cs.helsinki.fi/exampleapp/notes
    Browser->>User: HTML document CSS file JS script 

    User->>Browser: Enters text into the field
    Browser->>User: Displays the entered text

    User->>Browser: Clicks the "Save" button
    Browser->>Server: POST-request for на /exampleapp/notes with data
    Server->>Browser: Returns a response (for example, "Note saved")

    Note right of Browser: The browser refreshes the page
    Browser->>User: Displays a refreshed page with a new note


```
