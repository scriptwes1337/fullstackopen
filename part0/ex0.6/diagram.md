participant browser
participant server
participant database

browser -> server: POST /exampleapp/spa/new-note
server -> database: DB.create(note) return note to server
server -> browser: res(note)
browser: rerun display of notes with .map