const Blog = require('../models/blog')

const initialNotes = [
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
  const note = new Blog({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

const blogsInDb = async () => {
  const notes = await Blog.find({})
  return notes.map(note => note.toJSON())
}

module.exports = {
  initialNotes, nonExistingId, blogsInDb
}