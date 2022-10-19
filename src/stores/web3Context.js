import React, { useState } from 'react';

export const Web3Context = React.createContext();

export const Web3ContextProvider = ({children}) => {
  const [decimal, setDecimal] = useState(0);
  return (
    <Web3Context.Provider value={{decimal, setDecimal}}>
      {children}
    </Web3Context.Provider>
  )
}
