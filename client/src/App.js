
import React from 'react';
import './App.css';
import { LLMProvider } from './components/LLMProvider';
import LLMSelector from './components/LLMSelector';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import VoiceInput from './components/VoiceInput';

function App() {
  return (
    <LLMProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4">LLM Task Manager</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <LLMSelector />
            <TaskInput />
            <VoiceInput />
          </div>
          <div>
            <TaskList />
          </div>
        </div>
      </div>
    </LLMProvider>
  );
}

export default App;
