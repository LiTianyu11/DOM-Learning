import React, { useContext, useState } from 'react'
import { TasksContext, TasksContextDispatch } from './TasksContext'



export default function TaskList() {
  const tasks = useContext(TasksContext)
  return (
    <ul>
      {tasks.map(task => <li key={task.id}> <Task task={task} /></li>)}
    </ul>
  )
}


function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false)
  let Content = null;
  const dispatch = useContext(TasksContextDispatch)

  if (isEditing) {
    Content = <>
      <input type="text"
        value={task.text}
        onChange={e => {
          dispatch({
            type: 'changed',
            task: { ...task, text: e.target.value }
          })
        }}
      />
      <button onClick={() => setIsEditing(false)}>Save</button>
    </>
  } else {
    Content = <>
      {task.text}
      <button onClick={() => setIsEditing(true)} >Edit</button >
    </>
  }

  return (
    <>
      <input type="checkbox" />
      {Content}
      <button
        onClick={() => dispatch({
          type: 'deleted',
          id: task.id
        })}
      >Delete</button>
    </>
  )
}