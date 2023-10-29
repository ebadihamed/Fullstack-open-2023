const listHelper = require('../utils/list_helper').dummy
const likeCounter = require('../utils/list_helper').totalLikes
const favoriteBlog = require('../utils/list_helper').favoriteBlog
const blogs = require('../utils/list_helper').blogs
const listWithOneBlog = require('../utils/list_helper').listWithOneBlog
const mostBlogs = require('../utils/list_helper').mostBlogs
const mostLikes = require('../utils/list_helper').mostLikes

describe('Dummy Test', () => {
  test('dummy returns one', () => {
    const blogs = []
    const result = listHelper(blogs)
    expect(result).toBe(1)
  })
})


describe('likesCount', () => {
  test('of empty list is zero', () => {
    const result = likeCounter([])
    expect(result).toBe(0)
  })

  test('when list has only on blog equals the likes of that', () => {
    const result = likeCounter(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = likeCounter(blogs)
    expect(result).toBe(36)
  })
})


describe('favoriteBlog', () => { 
  test('when list has only one blog ', () => {
    const vastaus = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
    const result = favoriteBlog(listWithOneBlog)
    expect(result).toEqual(vastaus)
  })

  test('of a bigger list', () => {
    const vastaus = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }
    const result = favoriteBlog(blogs)
    expect(result).toEqual(vastaus)
  })
})

describe('mostBlogs', () => {
  test('when list has only one blog', () => {
    vastaus = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    }
    const result = mostBlogs(listWithOneBlog)
    expect(result).toEqual(vastaus)
})

  test('when list has many blogs', () => {
    vastaus = {
      author: "Robert C. Martin",
      blogs: 3
    }
    const result = mostBlogs(blogs)
    expect(result).toEqual(vastaus)
  })
})

describe('mostLikes', () => {
  test('when list has only one blog', () => {
    vastaus = {
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
    const result = mostLikes(listWithOneBlog)
    expect(result).toEqual(vastaus)
})

  test('when list has many blogs', () => {
    vastaus = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    const result = mostLikes(blogs)
    expect(result).toEqual(vastaus)
  })
})