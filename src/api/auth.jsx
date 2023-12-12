import axios from 'axios'

export const login = async (data) => {
    const response = await axios.post(
      `https://filesapi-6ytl.onrender.com/login`,
      data
    )
  
    return response.data
  }