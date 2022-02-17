import axios from 'axios'
const addUser = async (userData) => {
  const response = await axios({
    method: 'post',
    url: '/user_create',
    data: userData, // you are sending body instead
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()
  return data
}
const listUsers = async () => {
  const response = await axios({
    method: 'get',
    url: '/user_lists',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (response.status === 200) return response.data
  return []
}
export { addUser, listUsers }
