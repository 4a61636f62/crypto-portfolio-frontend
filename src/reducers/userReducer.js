import loginService from '../services/login'
import portfolioService from '../services/portfolios'

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const LOAD = 'LOAD'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        username: action.data.username,
        token: action.data.token,
        portfolio: action.data.portfolio.id
      }
    case LOGOUT:
      return null
    case LOAD:
      return {
        username: action.data.username,
        token: action.data.token,
        portfolio: action.data.portfolio.id
      }
    default:
      return state
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(username, password)
      window.localStorage.setItem('user', JSON.stringify({ ...user, portfolio: user.portfolio.id }))
      portfolioService.setPortfolioId(user.portfolio.id)
      portfolioService.setAuthToken(user.token)
      dispatch({
        type: LOGIN,
        data: user
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    window.localStorage.clear()
    dispatch({
      type: LOGOUT
    })
  }
}

export const loadUser = () => {
  return async (dispatch) => {
    const userJSON = window.localStorage.getItem('user')
    if (userJSON) {
      try {
        const user = JSON.parse(userJSON)
        portfolioService.setPortfolioId(user.portfolio)
        portfolioService.setAuthToken(user.token)
        const portfolio = await portfolioService.get()
        user.portfolio = portfolio
        dispatch({
          type: LOAD,
          data: user
        })
      } catch (error) {
        console.log(error)
        window.localStorage.clear()
        dispatch({
          type: LOGOUT
        })
      }
    }
  }
}

export default userReducer
