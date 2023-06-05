import React from 'react'

export const Circle = ({state, onClick, numberSelected}) => {
  return (
    <div number={numberSelected}  onClick={onClick} className={`circle ${state}`}></div>
  )
}
