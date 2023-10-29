import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const config = {
    headers: {Authorization: token},
  }

  const response = axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const response = axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const rm = (id) => {
  const response = axios.delete(`${baseUrl}/${id}`)
  return response.data
}
export default { getAll, create, setToken, update, rm}