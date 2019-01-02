import React from 'react'
import './ColumnList.css'
import If from './If'

const ColumnList = ({ title, tasks, updateTask, addTask, deleteTask }) => {
    const currentTasks = tasks.filter(task => task.status === title)
    return (
        <div className="column-list">
            <h3>{title}</h3>
            <If test={title==='To Do'}>
                <form onSubmit={e => addTask(e)}>
                    <input type="text" />
                    <button type="submit">Create Task</button>
                </form>
            </If>
            <ul className="list-items">
                {currentTasks.map(task => (
                    <li key={task.id}>
                        <input type="checkbox" 
                            onChange={e => updateTask(e.target, task)} 
                            checked={title === 'Done'}
                        />
                        <span>{task.title}</span>
                        <button onClick={(e) => deleteTask(e, task.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ColumnList