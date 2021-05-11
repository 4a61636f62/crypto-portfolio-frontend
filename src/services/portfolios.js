const axios = require('axios')
const baseUrl = '/api/portfolios'

let portfolioId
let authToken

const setPortfolioId = (id) => {
  portfolioId = id
}

const setAuthToken = (token) => {
  authToken = token
}

const get = async () => {
  const config = {
    headers: { Authorization: `bearer ${authToken}` }
  }

  try {
    const response = await axios.get(`${baseUrl}/${portfolioId}`, config)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

const put = async (coinId, amount) => {
  const config = {
    headers: { Authorization: `bearer ${authToken}` }
  }

  try {
    const response = await axios.put(`${baseUrl}/${portfolioId}/holdings`, { coinId, amount }, config)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

export default {
  setPortfolioId,
  setAuthToken,
  get,
  put
}
