import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createOne = async (content)=>{
    const obj = {content,votes:0}
    const  response = await axios.post(baseUrl,obj)
    return response.data
}

const vote = async(content) =>{
    const updatedAnectode = {...content,votes:content.votes + 1}
    const response = await axios.put(`${baseUrl}/${content.id}`,updatedAnectode)
    return response.data
}

export default {getAll,createOne,vote}