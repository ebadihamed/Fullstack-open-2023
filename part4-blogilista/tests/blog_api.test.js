const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/list_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    let n = new Blog(helper.newBlog[0])
    await n.save()
    n = new Blog(helper.newBlog[1])
    await n.save()
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(helper.newBlog.length)
})

test('the id field is returned correctly', async () =>{
    const response = await api.get('/api/blogs')
    const field = response.body[0]['id']
    expect(field).toBeDefined()
})

test('new blog is added correctly', async () => {
    const n = {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
      }

    const req = await api.post('/api/blogs').send(n).expect(201).expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)
    expect(response.body).toHaveLength(helper.newBlog.length+1)
    expect(contents).toContainEqual("TDD harms architecture")
})

test('field of like is missing in post request', async () => {
    const n = {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        __v: 0
      }

    const request = await api.post('/api/blogs').send(n).expect(201).expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const contents = response.body.filter(r => r.title === "TDD harms architecture")
    console.log(contents)
    expect(contents[0].likes).toBe(0)
})

test('title or url is missing', async () => {
    const n = {
        _id: "5a422ba71b54a676234d17fb",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        __v: 0
      }

    const request = await api.post('/api/blogs').send(n).expect(400)
})

describe('deleting', () => {
    test('deleting an object from the blogs', async () => {
        const response = await helper.blogsInDb()
        const ToDelete = response[0]
        await api.delete(`/api/blogs/${ToDelete.id}`).expect(204)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(
            helper.newBlog.length - 1
          )
    })
})

describe('updating', () => {
    test('updating an object in the blogs', async () => {
        const response = await helper.blogsInDb()
        response[0].title = 'new title'
        const toUpdate = response[0]
        await api.put(`/api/blogs/${toUpdate.id}`).send(toUpdate).expect(200)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd[0].title).toContain('new title')
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})

