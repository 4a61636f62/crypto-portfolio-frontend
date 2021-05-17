import portfolioService from '../services/portfolios'

const LOGIN = 'LOGIN'
const LOAD = 'LOAD'
const UPDATE = 'UPDATE'

const portfolioReducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN:
      return action.data.portfolio
    case LOAD:
      return action.data.portfolio
    case UPDATE:
      return action.data
    default:
      return state
  }
}

export const addHolding = (coinId, amount) => {
  return async (dispatch) => {
    try {
      const portfolio = await portfolioService.put(coinId, amount)
      dispatch({
        type: UPDATE,
        data: portfolio
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export default portfolioReducer
