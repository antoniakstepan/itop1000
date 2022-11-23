import React, { useEffect, useState } from "react";
import useAxios from '../../common/useAxios'

export const Header = () => {
  const [exchangeData, setExchangeData] = useState(false)
  const {response, loading, error} = useAxios({method: 'get', url: 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'})

  useEffect(() => {
    if (response !== null) {
      setExchangeData(response && response.filter(item => item.cc === "USD" || item.cc === 'EUR'))
    }
  }, [response]);

  if (!exchangeData || loading || error) return;

  return (
    <div className="heading">
      <p>Currency converter</p>

      <div className='heading__exchange'>
        {exchangeData.map(item => (
            <div key={item.txt} className='heading__item'>
              <div className='heading__txt'>{item.txt} -</div>
              <div className='heading__rate'>{item.rate}</div>
            </div>
        ))}
      </div>
  </div>
  )
}