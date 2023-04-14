import React, { useReducer, useState } from 'react'
import TaskList from './TaskList'


let nextId = 1;
const initialTasks = [
    { id: 0, text: 'nihaoma', done: false }
]

function tasksReducer(tasks, action) {
    console.log(action)
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
        case 'edited': {
            return tasks.map(task => {return task.id === action.task.id ? action.task : task}
            )
        }
    }
}

export default function App() {

    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks)
    const [text, setText] = useState('')
    console.log(tasks)


    function handleAddTask(text) {

        dispatch({
            type: 'added',
            id: nextId++,
            text: text
        }
        )
    }


    function handleChangeText(task) {

        dispatch(
            {
                type: 'edited',
                task: task
            }
        )
    }

    function handleDeleteText(taskId) {
        setTasks(
            tasks.filter(task => task.id !== taskId)
        )
    }

    console.log(text)
    return (
        <div>
            <h1>TaskList</h1>
            <input type="text"
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <button onClick={() => { setText(''), handleAddTask(text) }}>add</button>
            <TaskList tasks={tasks} onChange={handleChangeText} onDelete={handleDeleteText} />
        </div>
    )
}
