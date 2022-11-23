import React from "react";
import Dropdown from 'react-dropdown';

export const Container = (props) => {
  const {
    setFrom,
    setInput,
    options,
    from,
    setTo,
    to
  } = props
  return (
    <div className="container">
        <div className="left">
          <h3>Сума</h3>
          <input type="text" 
             placeholder="Enter the amount" 
             onChange={(e) => setInput(e.target.value)} />
        </div>
        <div className="middle">
          <h3>Від</h3>
          <Dropdown options={options} 
                    onChange={(e) => { setFrom(e.value) }}
          value={from} placeholder="From" />
        </div>
        <div className="right">
          <h3>До</h3>
          <Dropdown options={options} 
                    onChange={(e) => {setTo(e.value)}} 
          value={to} placeholder="To" />
        </div>
      </div>
  )
}