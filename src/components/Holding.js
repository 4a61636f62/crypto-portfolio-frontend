import React from 'react'

// eslint-disable-next-line react/prop-types
const Holding = ({ coinID, amount, price, currSymbol }) => {
  return (
    <tr data-cy={`holding-${coinID}`}>
      <td>{coinID}</td>
      <td>{currSymbol}{price}</td>
      <td>{amount}</td>
      <td>{currSymbol}{amount * price}</td>
    </tr>
  )
}

export default Holding
