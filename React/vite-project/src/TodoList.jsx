import { useMemo } from 'react';
import List from "./List";
import { filterTodos } from "./utils";

export default function TodoList({ theme, todos, tab }) {


    const visibleTodos = useMemo(
        () => filterTodos(todos, tab),
        [todos, tab]
    );

    return (
        <div className={theme}>
            <h1>demo</h1>
            <List items={visibleTodos} />
        </div>
    )

}