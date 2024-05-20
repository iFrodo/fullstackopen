const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Note = require('../models/note')

beforeEach(async () => {
  await Note.deleteMany({})


  let noteObject = new Note(helper.initialNotes[0])
  await noteObject.save()


  noteObject = new Note(helper.initialNotes[1])
  await noteObject.save()
})

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/notes')


  assert.strictEqual(response.body.length, helper.initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(r => r.content)

  assert(contents.includes('Browser can execute only JavaScript'))
})

test('a valid note can be added ', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const notesAtEnd = await helper.notesInDb()
  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)


  const contents = notesAtEnd.map(n => n.content)
  assert(contents.includes('async/await simplifies making async calls'))
})

test('note without content is not added', async () => {
  const newNote = {
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)


  const notesAtEnd = await helper.notesInDb()


  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
})
test('a specific note can be viewed', async () => {
  const notesAtStart = await helper.notesInDb()

  const noteToView = notesAtStart[0]

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.deepStrictEqual(resultNote.body, noteToView)
})

test('a note can be deleted', async () => {
  const notesAtStart = await helper.notesInDb();
  const noteToDelete = notesAtStart[0];

  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204);

  const notesAtEnd = await helper.notesInDb();

  // Проверяем, что заметка с таким id больше не существует
  const deletedNote = notesAtEnd.find(note => note.id === noteToDelete.id);
  assert.strictEqual(deletedNote, undefined, 'Note should be deleted');

  // Проверяем, что длина массива уменьшилась на 1
  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1);
});


test('id must not be _id', async () => {
  const response = await api.get('/api/notes');
  const contents = response.body.map(r => r);

  // Проверяем, что в каждой записи есть поле "id"
  contents.forEach(note => {
    assert.ok(note.hasOwnProperty('id'), 'Note should have an "id" field');
    assert.notStrictEqual(note.id, undefined, 'Note id should not be undefined');
  });
});


after(async () => {
  await mongoose.connection.close()
})