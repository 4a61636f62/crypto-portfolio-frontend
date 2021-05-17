import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addHolding } from '../reducers/portfolioReducer'

// eslint-disable-next-line react/prop-types
const HoldingForm = () => {
  const [coinId, setCoinID] = useState('')
  const [amount, setAmount] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(addHolding(coinId, amount))
    setCoinID('')
    setAmount('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        CoinId
        <input
          data-cy='coinId-input'
          value={coinId}
          onChange={({ target }) => setCoinID(target.value)}
        />
      </div>
      <div>
        Amount
        <input
          data-cy='amount-input'
          value={amount}
          onChange={({ target }) => setAmount(target.value)}
        />
      </div>
      <button data-cy='add-holding-button' type='submit'>Add</button>
    </form>
  )
}

export default HoldingForm
