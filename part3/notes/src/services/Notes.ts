import axios, { AxiosResponse } from 'axios';

export interface IPerson {

  content: string;
  important: boolean;
}

const baseUrl = 'http://localhost:3001/api/notes';

const getAll = (): Promise<IPerson[]> => {
  const request = axios.get<IPerson[]>(baseUrl);
  return request.then((response: AxiosResponse<IPerson[]>) => response.data);
};

const create = (newObject: IPerson): Promise<IPerson> => {
  const request = axios.post<IPerson>(baseUrl, newObject);
  return request.then((response: AxiosResponse<IPerson>) => response.data);
};

const update = (id: number, newObject: IPerson): Promise<IPerson> => {
  const request = axios.put<IPerson>(`${baseUrl}/${id}`, newObject);
  return request.then((response: AxiosResponse<IPerson>) => response.data);
};
const remove= (id: number): Promise<IPerson> => {
  const request = axios.delete<IPerson>(`${baseUrl}/${id}`);
  return request.then((response: AxiosResponse<IPerson>) => response.data);
};


export default {
  getAll,
  create,
  update,
  remove
};
