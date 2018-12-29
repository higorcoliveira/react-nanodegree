import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ColumnList from './ColumnList'

class App extends Component {
  // DEPRECATED
  // componentWillMount = () => {
  //   const tasks = JSON.parse(window.localStorage.getItem('toDoListTasks') || '[]')
  //   this.setState({ tasks })
  // }
  constructor() {
    super();
    const tasks = JSON.parse(window.localStorage.getItem('toDoListTasks') || '[]')
    this.state = { tasks }
  }

  updateLocalStorage = tasks => {
    const stringfied = JSON.stringify(tasks)
    window.localStorage.setItem('toDoListTasks', stringfied)
  }

  updateAndSave = tasks => {
    this.updateLocalStorage(tasks)
    this.setState({ tasks })
  }

  addTask = (e) => {
    e.preventDefault();
    let { tasks } = this.state
    const value = e.target.querySelector('input').value
    const newTask = {
      id: tasks.length + 1,
      description: value,
      status: 'To Do'
    }
    tasks = tasks.concat(newTask)
    this.updateAndSave(tasks)    
  }

  updateTask = (target, task) => {
    let { tasks } = this.state
    tasks = tasks.filter(t => t.id !== task.id).concat({
      ...task, 
      status: target.checked ? 'Done' : 'To Do'
    })
    this.updateAndSave(tasks)
  }

  render() {
    const { tasks = [] } = this.state
    const columns = [
      { title: 'To Do', tasks },
      { title: 'Done', tasks },
    ]
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React To-Do List</h2>
        </header>
        <div className="App-container">
          <div className="app-lists">
            {columns.map(column => (
              <ColumnList
                key={column.title}
                title={column.title}
                tasks={column.tasks}
                addTask={this.addTask}
                updateTask={this.updateTask}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
