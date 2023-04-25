import React, { useContext, useState } from 'react'
import { TasksContext, TasksContextDispatch } from './TasksContext'

export default function AddTask() {
    const [text, setText] = useState('')
    const dispatch = useContext(TasksContextDispatch)
    

    return (
        <>
            <input type="text"
                placeholder='Add'
                value={text}
                onChange={e => {

                    setText(e.target.value)
                }}
            />

            <button onClick={() => {
                setText('');
                dispatch({
                    type: 'added',
                    id: nextId++,
                    text: text
                })
            }}>Add</button>
        </>
    )
}

let nextId = 3;


