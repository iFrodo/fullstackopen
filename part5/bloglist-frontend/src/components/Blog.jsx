import { useState } from 'react'
import { PropTypes } from 'prop-types'
import blogService from '../services/blogService'

const Blog = ({ blog, deleteHandler, deleteBtnText, moreBtnText, hideBtnText, likeBtnText, user }) => {
  Blog.propTypes = {
    blog: PropTypes.string.isRequired
  }
 
  const [blogs, setBlogs] = useState([]);
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const likeBtnHandler = () => {
    blog.likes += 1;
    blogService.change(blog).then(updatedBlog => {
      // Обновляем состояние блогов
      setBlogs(prevBlogs => prevBlogs.map(b => (b.id === updatedBlog.id ? updatedBlog : b)));
    });
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return (

    <div style={blogStyle} className='blog-title'>
      {blog.title}

      <button style={hideWhenVisible} onClick={() => { toggleVisibility() }}>{moreBtnText}</button>
      <button style={showWhenVisible} onClick={() => { toggleVisibility() }}>{hideBtnText}</button>

      <div style={showWhenVisible}>
        <p> Url: {blog.url}</p>
        <p> Likes: {blog.likes}  <button style={showWhenVisible} className='like-btn' onClick={() => { likeBtnHandler() }}>{likeBtnText}</button></p>
        <p> Author: {blog.author}</p>
        {/* Показывать кнопку удаления только юзеру создавшему запись */}
        {blog.user.login === user.login ? (
          <button onClick={() => {
            if (window.confirm('Вы уверены, что хотите удалить этот блог?')) {
              deleteHandler(blog);  
            }
          }}>{deleteBtnText}</button>
        ) : ''}

      </div>
    </div>
  )

}

export default Blog