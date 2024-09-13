import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
    const result = axios.get(baseUrl).then(res => res.data)
    return result
}

const create = (note) => {
    const result = axios.post(baseUrl, note).then(res => res.data)
    return result
}

const toggleImportance = (note) => {
    const result = axios.put(`${baseUrl}/${note.id}`, note).then(res => res.data)
    return result
}
export default { getAll, create, toggleImportance }