import { useState } from "react"

const Blog = ({ blog, deleteHandler, deleteBtnText, moreBtnText,hideBtnText }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      {blog.title}
      <div style={showWhenVisible}>
        <p> Url: {blog.url}</p>
        <p> Likes: {blog.likes}</p>
        <p> Author: {blog.author}</p>

      </div>
      <button onClick={() => { deleteHandler(blog) }}>{deleteBtnText}</button>

      <button style={hideWhenVisible} onClick={() => { toggleVisibility() }}>{moreBtnText}</button>
      <button style={showWhenVisible} onClick={() => { toggleVisibility() }}>{hideBtnText}</button>
    </div>
  )

}

export default Blog