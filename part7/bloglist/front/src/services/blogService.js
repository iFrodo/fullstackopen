import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = (newBlog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const request = axios.post(baseUrl, newBlog, config)
  return request.then(response => response.data)
}
const remove = (blogId) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const request = axios.delete(`${baseUrl}/${blogId}`, config)
  return request.then(response => response.data)

}

const change = (blog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const request = axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return request.then(response => response.data)

}

export default { getAll, create, remove, change, setToken }