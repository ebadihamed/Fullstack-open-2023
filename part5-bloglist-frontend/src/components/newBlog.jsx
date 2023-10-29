import {useState} from 'react'

const BlogForm = ({createNew}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addNew = (event) => {
        event.preventDefault()
        createNew({
            title: title,
            author: author,
            url: url
          })
        setTitle('')
        setAuthor('')
        setUrl('')
    }
    return (
    <div>
        <h2>Create a new blog</h2>
        <form onSubmit={addNew}>
        <div>
            Title
            <input name='title' value={title}
            onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
            Author
            <input name='author' value={author}
            onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
            Url
        <input name='url' value={url}
        onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button type='submit'>Submit</button>
        </form>
    </div>
  )}

export default BlogForm