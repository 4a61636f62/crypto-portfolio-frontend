import React, { useLayoutEffect } from 'react'
import LoginForm from './components/LoginForm'
import HoldingForm from './components/HoldingForm'
import Holding from './components/Holding'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, logout } from './reducers/userReducer'

function App () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const portfolio = useSelector(state => state.portfolio)

  useLayoutEffect(() => {
    dispatch(loadUser())
  }, [])

  const totalHoldings = () => {
    const totals = portfolio.holdings.map(h => Number(h.coin.prices.usd) * h.amount)
    return totals.reduce((total, curr) => total + curr).toFixed(2)
  }

  return user
    ? (
      <div>
        <p>logged in as {user.username}</p>
        <button onClick={() => dispatch(logout())}>logout</button>
        <HoldingForm />
        {portfolio && portfolio.holdings.length > 0
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
              {portfolio.holdings.map(h =>
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
        <LoginForm />
      </div>
      )
}

export default App
