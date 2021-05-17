import React from 'react'

// eslint-disable-next-line react/prop-types
const Holding = ({ coinID, amount, price, currSymbol }) => {
  return (
    <tr data-cy={`holding-${coinID}`}>
      <td data-cy='id'>{coinID}</td>
      <td data-cy='curr_sym'>{currSymbol}{price}</td>
      <td data-cy='amount'>{amount}</td>
      <td data-cy='value'>{currSymbol}{amount * price}</td>
    </tr>
  )
}

export default Holding
