import { useReducer, useState } from "react";
import TaskList from "./taskList";
import tasksReducer from "./tasksReducer";


let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false },
];


export default function App() {


  const [text, setText] = useState('')
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks)

  function handleAddTask(text) {
    dispatch(
      {
        type: 'added',
        id: nextId++,
        text: text
      }
    )
  }

  function handleChangeTask(task) {
    dispatch(
      {
        type: 'changed',
        task: task
      }
    )


  }

  function handleDeleteTask(task) {
    dispatch(
      {
        type: 'deleted',
        task: task
      }
    )
  }

  return (
    <>
      <h1>TaskList</h1>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => { setText(''), handleAddTask(text) }}>Add</button>
      <TaskList tasks={tasks} onChange={handleChangeTask} onDelete={handleDeleteTask} />
    </>
  )

}