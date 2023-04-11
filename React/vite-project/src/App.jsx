import { useState } from "react"
import TodoList from "./TodoList";
import { createTodos } from "./utils";

const todos = createTodos()

export default function App() {
    const [dark, setDark] = useState(false)
    const [tab, setTab] = useState('all')

    return (
        <div>
            <button onClick={() => setTab('all')}>All</button>
            <button onClick={() => setTab('active')}>Active</button>
            <button onClick={() => setTab('completed')}>Completed</button>
            <input type="checkbox" checked={dark} onChange={e => setDark(e.target.checked)} />Dark mode
            <hr />
            <TodoList  theme={dark ? 'dark' : 'light'} todos={todos} tab={tab} />
        </div>
    )
}