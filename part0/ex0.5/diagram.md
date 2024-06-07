participant browser
particiapnt server
participant database

browser-> server: GET /exampleapp/spa
server -> database: DB.find(notes)
database -> server: notes
server -> browser: res.json(notes)
