const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Heasdasd',
    author: 'sdfgsdfg',
    url: 'sfdgsdfgsdfg',
    likes: 123
  },
  {
    title: 'String',
    author: 'String',
    url: 'String',
    likes: 32
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}