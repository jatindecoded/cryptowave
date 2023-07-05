import React, { createContext, useContext } from 'react'
import { useState, useEffect } from "react";

const Crypto = createContext();


const CryptoContext = ({children}) => {
    const [currency, setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹")

    useEffect(() => {
      if (currency === "INR"){
        setSymbol("₹");
      }
      else if (currency === "USD"){
        setSymbol("$");
      }
      else if (currency === "EUR"){
        setSymbol("€");
      }
      else if (currency === "JPY"){
        setSymbol("¥");
      }
      else if (currency === "GBP"){
        setSymbol("£");
      }
      // console.log(symbol)
    }, [currency])
    
  return (
    <Crypto.Provider value = {{currency, setCurrency, symbol}}>{children}</Crypto.Provider>
  )
}

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);

}