import React from 'react'

const SelectButton = ({children, selected, onClick}) => {
  return (
    <span onClick={onClick} className='selectbutton' style={{backgroundColor: selected ?  "gold" : "", color: selected ? "black" : ""}}>{children}</span>
  )
}

export default SelectButton