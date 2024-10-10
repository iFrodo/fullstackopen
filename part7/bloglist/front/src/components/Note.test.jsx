import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

import { expect } from 'vitest'

test('renders content', () => {
  const blog = {
    title: 'dghdfhdfhfdhdfghdfh',
    url: 'test',
    likes: 123,
    important: true,
    user: {
      login: 'newLogin',
      password: '1234'
    }
  }
  const user = {
    login: 'newLogin',
    password: 1234
  }
  const { container } = render(<Blog blog={blog} user={user} />)
  const div = container.querySelector('.blog-title')
  expect(div).toHaveTextContent(
    'dghdfhdfhfdhdfghdfh'
  )
  
})

test('отображает заголовок блога', () => {
  const blog = {
    title: 'Мой блог',
    user: {
      login: 'newLogin',
      password: 1234
    }
    // другие свойства блога
  };
  const user = {
    login: 'newLogin',
    password: 1234
  }


  const { getByText } = render(<Blog blog={blog} user={user} />);
  const titleElement = getByText(blog.title);
  expect(titleElement).toBeInTheDocument();
});


test('clicking the button calls event handler once', async () => {
  const user = {
    login: 'newLogin',
    password: 1234
  }
  const blog = {
    title: 'dghdfhdfhfdhdfghdfh',
    url: 'test',
    likes: 123,
    important: true,
    user: {
      login: 'newLogin',
      password: '1234'
    }
  }


  const mockHandler = vi.fn()

  render(
    <Blog blog={blog} user={user} toggleImportance={mockHandler} />
  )

  const {container} = render(<Blog blog={blog} user={user} />);
  const like = userEvent.setup()
  const button = container.querySelector('.like-btn')
  await like.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})