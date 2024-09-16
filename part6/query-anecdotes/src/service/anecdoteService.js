import axios from "axios"
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = () => {
    const result = axios.get(baseUrl).then(res => res.data)
    return result
}
const create = (content) => {
    const result = axios.post(baseUrl, content).then(res => res.data)
    return result
}
const vote = (content) => {
    console.log(content)
    const result = axios.put(`${baseUrl}/${content.id}`, { ...content, votes: content.votes + 1 })
    return result
}

export default { getAll, create, vote }