import {useState, useEffect} from 'react'

const Blog = ({ blog, user, handleUpdate, handlerm}) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 3,
    marginBottom: 5
  }
  
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  
  const updateBlog = (event) => {
    event.preventDefault()
    const newLikes = blog.likes + 1
    console.log(newLikes)
    handleUpdate(blog.id,{
      title: blog.title,
      author: blog.author,
      user: blog.user.id,
      url: blog.url,
      likes: newLikes
    })
  }

  const rmBlog = (event) => {
    event.preventDefault()
    handlerm(blog.id)
  }
  const showDeleteButton = user.name === blog.user.name
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible} className='whenHidden'>
        <div style={blogStyle}> 
          <li>{blog.title} {blog.author}</li>
          <button onClick={toggleVisibility} id='showView'>view</button>
        </div>
      </div>
      <div style={showWhenVisible} className='showAll'>
        <div style={blogStyle}>
          <p> {blog.title} {blog.author} </p>
          <p> {blog.url} </p>
          <div>
          <p id='nLikes'> {blog.likes} </p>
          <button onClick={updateBlog} id='pressToLike'>like</button>
          </div>
          <p> {user.name} </p>
          <button onClick={toggleVisibility}>cancel</button>
          <div>
            {showDeleteButton && (<button id='rmButton' onClick={rmBlog}>remove</button>)}
          </div>
        </div>
      </div>
  </div>
)}


export default Blog