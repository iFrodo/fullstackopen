import axios, { AxiosResponse } from 'axios';

export interface IPerson {

  content: string;
  important: boolean;
}
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const baseUrl = 'http://localhost:3001/api/notes';

const getAll = (): Promise<IPerson[]> => {
  const request = axios.get<IPerson[]>(baseUrl);
  return request.then((response: AxiosResponse<IPerson[]>) => response.data);
};

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id: number, newObject: IPerson): Promise<IPerson> => {
  const request = axios.put<IPerson>(`${baseUrl}/${id}`, newObject);
  return request.then((response: AxiosResponse<IPerson>) => response.data);
};
const remove = (id: number): Promise<IPerson> => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete<IPerson>(`${baseUrl}/${id}`,config);
  return request.then((response: AxiosResponse<IPerson>) => response.data);
};


export default { getAll, create, update, remove, setToken }