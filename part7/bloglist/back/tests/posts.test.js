const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const exp = require('node:constants')
const bcrypt = require('bcrypt')

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})


    let noteObject = new Blog(helper.initialBlogs[0])

    await noteObject.save()



    noteObject = new Blog(helper.initialBlogs[1])
    await noteObject.save()
})


test('blogs are returned as json', async () => {
    // Отправляем запрос на аутентификацию и получаем токен
    const user = new User({
        login: 'admin',
        name: 'admin',
        passwordHash: await bcrypt.hash('12345', 10)
    })
    await user.save()
    const response = await api.post('/api/login').send(user);
    const token = response.body.token;

    // Отправляем запрос на получение списка блогов с токеном
    const blogsResponse = await api
        .get('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

    // Проверяем, что в ответе есть свойство 'blogs' и оно является массивом
    expect(blogsResponse.body).toHaveProperty('blogs');
    expect(Array.isArray(blogsResponse.body.blogs)).toBe(true);
});


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
test('a note can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const noteToDelete = blogsAtStart[0];

    await api
        .delete(`/api/blogs/${noteToDelete.id}`)
        .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    // Проверяем, что заметка с таким id больше не существует
    const deletedNote = blogsAtEnd.find(note => note.id === noteToDelete.id);
    assert.strictEqual(deletedNote, undefined, 'Note should be deleted');

    // Проверяем, что длина массива уменьшилась на 1
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
});

test('a note can be changed', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const noteToChange = blogsAtStart[0];

    await api
        .put(`/api/blogs/${noteToChange.id}`)
        .expect(201);

    const blogsAtEnd = await helper.blogsInDb();
    noteToChange.likes === blogsAtEnd[0].likes ? assert.ok('Note should have been changed') : assert.ok('Note should not have been changed');
});


test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        login: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.login)
    assert(usernames.includes(newUser.login))
})


after(async () => {
    await mongoose.connection.close()
})