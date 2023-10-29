import React from 'react'
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './newBlog'
import { mockComponent } from 'react-dom/test-utils'

const blog = {
    title: 'First blog ever made',
    author: 'Hamed',
    url: 'www.amazon.com',
    likes: 0,
    user: 'hamed'
}

const user = {
    name: 'hamed'
}

test('renders title and author',() => {
    const {container} = render(<Blog blog={blog} user={user}/>)
    const div = container.querySelector('.whenHidden')
    expect(div).toHaveTextContent('First blog ever made Hamed')
})

test('When button is clicked, it shows all the info', async () => {
    const {container} = render(<Blog blog={blog} user={user}/>)
    const userE = userEvent.setup()
    const button = screen.getByText('view')
    await userE.click(button)
    const div = container.querySelector('.showAll')
    expect(div).toHaveTextContent('www.amazon.com')
    expect(div).toHaveTextContent(0)
    expect(div).toHaveTextContent('hamed')
})

test('Like button is called two times when pressed two times', async () => {
    mockHandler = jest.fn()
    render(<Blog blog={blog} user={user} handleUpdate={mockHandler}/>)
    const userE = userEvent.setup()
    const button = screen.getByText('like')
    await userE.click(button)
    await userE.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
})

test('Propsina lähetetyt tiedot ovat oikeita', async () => {
    const userE = userEvent.setup()
    mockHandler = jest.fn()
    render(<BlogForm createNew={mockHandler} />)
    const input = screen.getAllByRole('textbox')
    const button = screen.getByText('Submit')

    await userE.type(input[0], 'second blog')
    await userE.type(input[1], 'hamed')
    await userE.type(input[2], 'www.google.com')
    await userE.click(button)

    expect(mockHandler.mock.calls[0][0].title).toBe('second blog')
    expect(mockHandler.mock.calls[0][0].author).toBe('hamed')
    expect(mockHandler.mock.calls[0][0].url).toBe('www.google.com')
})
