
import React, { createContext, useState, useContext } from 'react';

const LLMContext = createContext();

export const useLLM = () => {
  return useContext(LLMContext);
};

export const LLMProvider = ({ children }) => {
  const [selectedLLM, setSelectedLLM] = useState('OpenAI');

  const value = {
    selectedLLM,
    setSelectedLLM,
  };

  return <LLMContext.Provider value={value}>{children}</LLMContext.Provider>;
};
