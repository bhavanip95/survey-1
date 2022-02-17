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
  const json = await response.json()
  console.log(json)
  return json
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
