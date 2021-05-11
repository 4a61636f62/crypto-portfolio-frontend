import React, { useState } from 'react'

// eslint-disable-next-line react/prop-types
const HoldingForm = ({ addHolding }) => {
  const [coinId, setCoinID] = useState('')
  const [amount, setAmount] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    addHolding(coinId, amount)
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
