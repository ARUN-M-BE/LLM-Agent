
import React from 'react';
import { useLLM } from './LLMProvider';

const LLMSelector = () => {
    const { selectedLLM, setSelectedLLM } = useLLM();

    return (
        <div className="p-4">
            <label htmlFor="llm-select" className="mr-2 font-bold">Select LLM:</label>
            <select
                id="llm-select"
                className="p-2 border rounded"
                value={selectedLLM}
                onChange={(e) => setSelectedLLM(e.target.value)}
            >
                <option value="OpenAI">OpenAI</option>
                <option value="Gemini">Gemini</option>
                <option value="Other">Other</option>
            </select>
        </div>
    );
};

export default LLMSelector;
