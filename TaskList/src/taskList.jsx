import React, { useState } from 'react'

export default function TaskList({ tasks, onChange, onDelete }) {

    return (
        <ul>
            {tasks.map(task => <Task key={task.id} task={task} onChange={onChange} onDelete={onDelete} />)}
        </ul>
    )
}


function Task({ task, onChange, onDelete }) {
    const [isEditing, setIsEditing] = useState(false)
    let contentArea = '';
    if (isEditing) {
        contentArea =
            <>
                <input type="checkbox" />
                <input type="text"
                    value={task.text}
                    onChange={e => {

                        onChange({
                            ...task,
                            text: e.target.value
                        })
                    }}
                />
                <button
                    onClick={() => setIsEditing(false)}
                >Save</button>

            </>

    } else {
        contentArea =
            <>
                <input type="checkbox" />
                {task.text}
                <button
                    onClick={() => setIsEditing(true)}
                >Edit</button>

            </>

    }


    return (
        <li key={task.id}>
            {contentArea}
            <button onClick={() => onDelete(task.id)}>Delete</button>
        </li>
    )
}