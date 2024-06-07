sequenceDiagram
    participant browser
    participant server

    browser->server: POST /new-note
    server->browser: res.json(notes)