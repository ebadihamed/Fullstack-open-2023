const config = require('../utils/config')
const blogRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
    response.json(blogs)
})

const getTokenFrom = request => {
    const authorization = request.get('Authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    }
    return null
}

blogRouter.post('/', async(request, response) => {
    const blog = request.body
    const decodedToken = jwt.verify(getTokenFrom(request), config.SECRET)
    if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (blog.likes === undefined){
        blog.likes = 0
    }
    if (blog.title === undefined || blog.url === undefined){
        response.status(400).end()
    }
    const newNote = new Blog({
        title: blog.title,
        author: blog.author,
        user: user._id,
        url: blog.url,
        likes: blog.likes
    })
    const added = await newNote.save()
    user.blogs = user.blogs.concat(added._id)
    await user.save()
    response.status(201).json(request.body)
})

blogRouter.delete('/:id', async(request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id', async(request, response) => {
    const newOne = request.body
    await Blog.findByIdAndUpdate(request.params.id, newOne, {new: true})
    response.status(200).json(newOne)
}) 
module.exports = blogRouter