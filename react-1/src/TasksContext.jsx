import React, {useReducer, createContext } from 'react'

export const TasksContext = createContext(null)
export const TasksContextDispatch = createContext(null)

export default function TasksProvier({ children }) {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks)
    return (
        <TasksContext.Provider value={tasks}>
            <TasksContextDispatch.Provider value={dispatch}>
                {children}
            </TasksContextDispatch.Provider>
        </TasksContext.Provider>
    )
}

const initialTasks = [
    { id: 0, text: 'Philosopher’s Path', done: true },
    { id: 1, text: 'Visit the temple', done: false },
    { id: 2, text: 'Drink matcha', done: false }
];

function tasksReducer(tasks, action) {
    console.log(action)
    switch (action.type) {
        case 'added': {
            return [...tasks,
            {
                id: action.id,
                text: action.text,
                done: false
            }
            ]
        }
        case 'changed': {
            return tasks.map(task => {
                if (task.id === action.task.id) {
                    return action.task
                } else return task
            })
        }

        case 'deleted': {

            return tasks.filter(task => task.id !== action.id)
        }
    }
}
