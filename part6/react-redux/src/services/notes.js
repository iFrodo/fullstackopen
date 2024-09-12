import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}
const getOne = async (id) => {
    const response = await axios.get(baseUrl, id)
    return response.data
}

const createNew = async (content) => {
    const obj = { content, important: false }
    const response = await axios.post(baseUrl, obj)
    return response.data
}

const changeImportance = async (note) => {
    const id = note.id;
    const updatedNote = { ...note, important: !note.important };
  
    try {
      const response = await axios.put(`${baseUrl}/${id}`, updatedNote);
      console.log('Updated note:', response.data);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };
export default { getAll, createNew,changeImportance  }