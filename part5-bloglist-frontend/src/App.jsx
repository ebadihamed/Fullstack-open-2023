import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'
import BlogForm from './components/newBlog'
import Togglable from './components/Togglable'
import PropTypes from 'prop-types'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      {
        blogs.sort((a,b) => b.likes - a.likes)
      setBlogs( blogs )}
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async(event) => {
    event.preventDefault()
   try {
    const user = await loginService.login({username, password})
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
    setMessage('Logged in')
    setStatus(true)
    setTimeout(() => {
      setMessage('')
      setStatus(null)
    }, 5000)
  }catch (exception) {
    setMessage('wrong credentials')
    setStatus(false)
    setTimeout(() => {
      setMessage('')
      setStatus(null)
    }, 5000)
  }}

  const handleSubmit = async(newObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const response = await blogService.create(newObject)
      setBlogs(blogs)
      setMessage('New Blog added to the list')
      setStatus(true)
      setTimeout(() => {
        setMessage('')
        setStatus(null)
      }, 5000)
    }catch (exception){
      console.log(exception)
      setMessage('Error, something went wrong, boo')
      setStatus(false)
      setTimeout(() => {
        setMessage('')
        setStatus(null)
      }, 5000)
    }
  }

  const handleUpdate = async(id, newObject) => {
    try{
      const response = await blogService.update(id, newObject)
      const updatedBlogIndex = blogs.findIndex((blog) => blog.id === id)
      const updatedBlogs = [...blogs]
      updatedBlogs[updatedBlogIndex] = { ...updatedBlogs[updatedBlogIndex], ...newObject }
      setBlogs(updatedBlogs)
      setMessage('Blog has been updated')
      setStatus(true)
      setTimeout(() => {
        setMessage('')
        setStatus(null)
      }, 5000)
    }catch (exception){
      console.log(exception)
      setMessage('Error, something went wrong, boo')
      setStatus(false)
      setTimeout(() => {
        setMessage('')
        setStatus(null)
      }, 5000)
    }
  }

  const handlerm = async(id) => {
    if (window.confirm('Are you sure?')){
      try{
        const response = await blogService.rm(id)
        const updatedBlogs = blogs.filter((blog) => blog.id !== id)
        setBlogs(updatedBlogs)
        setMessage('Blog has been deleted')
        setStatus(false)
        setTimeout(() => {
          setMessage('')
          setStatus(null)
        }, 5000)
      }catch(exception){
        console.log(exception)
        setMessage('Error, something went wrong, boo')
        setStatus(false)
        setTimeout(() => {
          setMessage('')
          setStatus(null)
        }, 5000)
      }
    }
  }

  const resetLogin = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='logInButton' type="submit">login</button>
    </form> 
  )

  if (user == null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} value={status}/>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} value={status}/>
      <p>{user.username} is logged in</p>
      <form onSubmit={resetLogin} >
        <button type='submit'>Logout</button>
      </form>
      <div>
        <Togglable buttonlabel='new note' ref={blogFormRef}>
          <BlogForm createNew={handleSubmit}/>
        </Togglable>
      {blogs.map(r => <Blog key={r.id} blog={r} user={user} handleUpdate={handleUpdate} handlerm={handlerm}/>)}
      </div>
      
    </div>
  )
}

export default App
