import React, { useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import HoldingForm from './components/HoldingForm'
import Holding from './components/Holding'
import loginService from './services/login'
import portfolioService from './services/portfolios'

function App () {
  const [user, setUser] = useState(null)
  const [holdings, setHoldings] = useState(null)

  useEffect(async () => {
    const userJSON = window.localStorage.getItem('user')
    if (userJSON) {
      try {
        const user = JSON.parse(userJSON)
        setUser(user)
        portfolioService.setPortfolioId(user.portfolio)
        portfolioService.setAuthToken(user.token)
        const portfolio = await portfolioService.get(user.portfolio)
        setHoldings(portfolio.holdings)
      } catch {
        setUser(null)
        logout()
      }
    }
  }, [])

  const login = async (username, password) => {
    try {
      const user = await loginService.login(username, password)
      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      portfolioService.setPortfolioId(user.portfolio)
      portfolioService.setAuthToken(user.token)
      const portfolio = await portfolioService.get()
      setHoldings(portfolio.holdings)
      return true
    } catch (error) {
      console.log(error.message)
      return false
    }
  }

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addHolding = async (coinId, amount) => {
    try {
      const portfolio = await portfolioService.put(coinId, amount)
      setHoldings(portfolio.holdings)
    } catch (error) {
      console.log(error.message)
    }
  }

  const totalHoldings = () => {
    const totals = holdings.map(h => Number(h.coin.prices.usd) * h.amount)
    return totals.reduce((total, curr) => total + curr).toFixed(2)
  }

  return user
    ? (
      <div>
        <p>logged in as {user.username}</p>
        <HoldingForm addHolding={addHolding}/>
        {holdings && holdings.length > 0
          ? <table>
            <thead>
              <tr>
                <th>Coin</th>
                <th>Price ($)</th>
                <th>Amount</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map(h =>
                <Holding
                  key={h.coin.id}
                  coinID={h.coin.id}
                  amount={h.amount}
                  price={h.coin.prices.usd}
                  currSymbol='$'
                />
              )}
            </tbody>
            <tfoot>
              <tr>
                <th>Total</th>
                <th />
                <th/>
                <th>${totalHoldings()}</th>
              </tr>
            </tfoot>
          </table>

          : null
        }
      </div>
      )
    : (
      <div>
        <LoginForm login={login} />
      </div>
      )
}

export default App
