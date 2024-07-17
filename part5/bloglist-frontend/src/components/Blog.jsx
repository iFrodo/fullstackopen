import { useState } from "react"
import blogService from "../services/blogService"

const Blog = ({ blog, deleteHandler, deleteBtnText, moreBtnText, hideBtnText, likeBtnText}) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const likeBtnHandler = () => {
    blog.likes += 1
    blogService.change(blog)
    console.log(blog)


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

      <button style={hideWhenVisible} onClick={() => { toggleVisibility() }}>{moreBtnText}</button>
      <button style={showWhenVisible} onClick={() => { toggleVisibility() }}>{hideBtnText}</button>
      <button onClick={() => { deleteHandler(blog) }}>{deleteBtnText}</button>

      <div style={showWhenVisible}>
        <p> Url: {blog.url}</p>
        <p> Likes: {blog.likes}  <button style={showWhenVisible} onClick={() => { likeBtnHandler() }}>{likeBtnText}</button></p>
        <p> Author: {blog.author}</p>

      </div>



    </div>
  )

}

export default Blog