import { useState } from "react";

export default function TaskList({ tasks, onChange, onDelete }) {
   

    return (
        <ul>
            {tasks.map((task => <li key={task.id}><Task task={task} onChange={onChange} onDelete={onDelete} /></li>))}
        </ul>
    )

}


function Task({ task, onChange, onDelete }) {
    console.log(task)
    const [isEditing, setIsEditing] = useState(false)
    let taskContent = '';
    if (isEditing) {
        taskContent = (
            <>
                <input type="text" value={task.text} onChange={e => onChange({ ...task, text: e.target.value })} />
                <button onClick={() => setIsEditing(false)}>Save</button>

            </>
        )
    } else {
        taskContent = (
            <>
                {task.text}
                < button onClick={() => setIsEditing(true)}> Edit</button >
            </>

        )
    }
    return (
        <>
            <input type="checkbox" onChange={e => onChange({ ...task, done: e.target.checked })} />
            {taskContent}
            < button onClick={() => onDelete(task)}>Delete</button>
        </>
    )

}