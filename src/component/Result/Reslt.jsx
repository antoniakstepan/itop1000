import React from "react";

export const Result = (props) => {
  const {
    convert,
    input,
    from,
    output,
    to
  } = props
  return (
    <div className="result">
        <button onClick={()=>{convert()}}>Convert</button>
        <h2>Конвертована Сума:</h2>
        <p>{input+" "+from+" = "+output.toFixed(2) + " " + to}</p>
  
      </div>
  )
}