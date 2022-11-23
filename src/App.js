import React, { useState, useEffect, useMemo } from 'react';
import 'react-dropdown/style.css';
import './App.css';
import { Header } from './component/Header/Header';
import useAxios from './common/useAxios';
import { Container } from './component/Container/Container';
import { Result } from './component/Result/Reslt';

function App() {
  const [info, setInfo] = useState([]);
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("uah");
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);
  
  const url = useMemo(() => {return `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`}, [from])

  const {response, loading, error} = useAxios({method: 'get', url})

  useEffect(() => {
    if (response !== null) {
      setInfo(response[from]);
    }
}, [response, from]);
  

  useEffect(() => {
    setOptions(Object.keys(info));
    convert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info])
    
  function convert() {
    var rate = info[to];
    setOutput(input * rate);
  }
  
  if (loading || error || !info) return;

  return (
    <div className="App">
      <Header />
      <Container
        setFrom={setFrom}
        setInput={setInput}
        options={options}
        from={from}
        setTo={setTo}
        to={to}
      />
      <Result 
        convert={convert}
        input={input}
        from={from}
        output={output}
        to={to}
      />
    </div>
  );
}

export default App;
