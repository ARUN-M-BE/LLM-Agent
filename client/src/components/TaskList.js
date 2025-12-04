
import React, { useState, useEffect } from 'react';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTasks();
    }, []);

    const handleDelete = async (taskId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete task');
            }

            setTasks(tasks.filter((task) => task._id !== taskId));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Task List</h2>
            {tasks.length === 0 ? (
                <p>No tasks found.</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task._id} className="p-4 mb-2 border rounded shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-bold">{task.originalText}</p>
                                    <p className="text-sm text-gray-500">{task.action}</p>
                                </div>
                                <button
                                    className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                                    onClick={() => handleDelete(task._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
