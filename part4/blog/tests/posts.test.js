const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})


    let noteObject = new Blog(helper.initialNotes[0])
    await noteObject.save()


    noteObject = new Blog(helper.initialNotes[1])
    await noteObject.save()
})

test('notes are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})


test('id must not be _id', async () => {
    const response = await api.get('/api/blogs');
    const contents = response.body.map(r => r);

    // Проверяем, что в каждой записи есть поле "id"
    contents.forEach(note => {
        assert.ok(note.hasOwnProperty('id'), 'Note should have an "id" field');
        assert.notStrictEqual(note.id, undefined, 'Note id should not be undefined');
    });
});

test('new blog posting', async () => {
    const initialBlogs = await helper.blogsInDb(); // Получаем начальное количество записей

    const newBlog = {
        title: 'My New Blog Post',
        author: 'John Doe',
        url: 'https://example.com/my-new-blog',
        likes: 10,
    };

    await api
        .post('/api/blogs')
        .send(newBlog) // Отправляем данные новой записи
        .expect(201);

    const updatedBlogs = await helper.blogsInDb(); // Получаем обновленное количество записей

    // Проверяем, что количество записей увеличилось на 1
    assert.strictEqual(updatedBlogs.length, initialBlogs.length + 1);
});


test('checking for likes', async () => {
    const response = await api.get('/api/blogs');
    const contents = response.body.map(r => r);

    contents.forEach(note => {
        if (!note.hasOwnProperty('likes')) {
            note.likes = 0;
        }
        console.log(note);
    });
});
// Напишите тесты, связанные с созданием новых блогов через конечную точку /api/blogs ,
//  которые проверяют, что если свойства title или url отсутствуют в данных запроса,
//   серверная часть отвечает на запрос с кодом состояния 400 Bad Request .

test('создание нового блога', async () => {
    const initialBlogs = await helper.blogsInDb();

    const newBlog = {
        author: 'John Doe', // Убедитесь, что свойства title и url отсутствуют
        likes: 10,
    };

    await api
        .post('/api/blogs')
        .send(newBlog) // Отправляем данные новой записи
        .expect(400); // Проверяем, что сервер отвечает кодом состояния 400 Bad Request

    const updatedBlogs = await helper.blogsInDb(); // Получаем обновленное количество записей

    // Проверяем, что количество записей не изменилось
    assert.strictEqual(updatedBlogs.length, initialBlogs.length);
});

after(async () => {
    await mongoose.connection.close()
})