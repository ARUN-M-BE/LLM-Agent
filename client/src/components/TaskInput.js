
import React, { useState } from 'react';
import { useLLM } from './LLMProvider';

const TaskInput = () => {
    const { selectedLLM } = useLLM();
    const [taskText, setTaskText] = useState('');
    const [action, setAction] = useState('comment');

    const handleSubmit = async () => {
        if (!taskText.trim()) return;

        const task = {
            userId: 'user123', // Hardcoded for now
            apiConfig: {
                provider: selectedLLM,
                model: 'default-model', // Model selection can be added later
            },
            inputType: 'text',
            originalText: taskText,
            action: action,
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/process-task`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });

            if (!response.ok) {
                throw new Error('Failed to process task');
            }

            setTaskText('');
            // Optionally, trigger a refresh of the task list
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-4">
            <textarea
                className="w-full p-2 border rounded"
                rows="4"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Enter your task..."
            ></textarea>
            <div className="flex items-center justify-between mt-2">
                <select
                    className="p-2 border rounded"
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                >
                    <option value="comment">Comment</option>
                    <option value="record">Record</option>
                    <option value="skip">Skip</option>
                </select>
                <button
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                    onClick={handleSubmit}
                >
                    Submit Task
                </button>
            </div>
        </div>
    );
};

export default TaskInput;
