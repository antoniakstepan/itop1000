import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './App.css';

function App() {
  const [info, setInfo] = useState([]);
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("uah");
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);
  const [exchangeData, setExchangeData] = useState(false)
  
  useEffect(() => {
    const fetch = async () => {
      const responce = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
      const exchangeData = await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      setExchangeData(exchangeData && exchangeData?.data && exchangeData.data.filter(item => item.cc === "USD" || item.cc === 'EUR'))


      setInfo(responce.data[from]);
    }
   
    fetch()
  
  }, [from]);
  

  useEffect(() => {
    setOptions(Object.keys(info));
    convert();
  }, [info])
    
  function convert() {
    var rate = info[to];
    setOutput(input * rate);
  }
  
  function flip() {
    var temp = from;
    setFrom(to);
    setTo(temp);
  }

  console.log(exchangeData, 'exchangeData')
  if (!exchangeData) return;
  return (
    <div className="App">
      <div className="heading">
        <p>Currency converter</p>

        <div className='heading__exchange'>
          {exchangeData.map(item => (
              <div className='heading__item'>
                <div className='heading__txt'>{item.txt} -</div>
                <div className='heading__rate'>{item.rate}</div>
              </div>
          ))}
        </div>
      </div>
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
        <div onClick={flip}>
          {"<Switch>"}
        </div>
        <div className="right">
          <h3>До</h3>
          <Dropdown options={options} 
                    onChange={(e) => {setTo(e.value)}} 
          value={to} placeholder="To" />
        </div>
      </div>
      <div className="result">
        <button onClick={()=>{convert()}}>Convert</button>
        <h2>Конвертована Сума:</h2>
        <p>{input+" "+from+" = "+output.toFixed(2) + " " + to}</p>
  
      </div>
    </div>
  );
}

export default App;
