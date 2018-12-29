import React from 'react'
import './ColumnList.css'
import If from './If'

const ColumnList = ({ title, tasks, updateTask, addTask }) => {
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
            <ul>
                {currentTasks.map(task => (
                    <li key={task.id}>
                        <input type="checkbox" 
                            onChange={e => updateTask(e.target, task)} 
                            checked={title === 'Done'}
                        />
                        <span>{task.description}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ColumnList