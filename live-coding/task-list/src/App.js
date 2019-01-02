import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ColumnList from './ColumnList'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

class App extends Component {
  // DEPRECATED
  // componentWillMount = () => {
  //   const tasks = JSON.parse(window.localStorage.getItem('toDoListTasks') || '[]')
  //   this.setState({ tasks })
  // }
  constructor() {
    super();
    // agora os dados estão vindo do servidor via graphql
    // const tasks = JSON.parse(window.localStorage.getItem('toDoListTasks') || '[]')
    this.state = { tasks: [] }
  }

  componentWillReceiveProps({ getAllTasks }) {
    const { allTasks } = getAllTasks
    this.setState({
      tasks: allTasks
    })
  }

  addTask = (e) => {
    e.preventDefault();
    const value = e.target.querySelector('input').value
    this.props.createTask({
      variables: {
        status: 'To Do',
        title: value
      }
    }).then(res => {
      this.props.getAllTasks.refetch() // traz novamente os dados do servidor após inserção
    })    
  }

  updateTask = (target, task) => {
    const id = task.id
    const status = target.checked ? 'Done' : 'To Do'
    this.props.updateTask({
      variables: { id, status }
    }).then(res => {
      this.props.getAllTasks.refetch()
    })
  }

  deleteTask = (e, id) => {
    e.preventDefault();
    this.props.deleteTask({
      variables: { id }
    }).then(res => {
      this.props.getAllTasks.refetch()
    })    
  }

  render() {
    const { tasks = [] } = this.state
    const columns = [
      { title: 'To Do', tasks },
      { title: 'Done', tasks },
    ]
    const { loading } = this.props.getAllTasks
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React To-Do List</h2>
        </header>
        <div className="App-container">
          <div className="app-lists">
            {!loading && columns.map(column => (
              <ColumnList
                key={column.title}
                title={column.title}
                tasks={column.tasks}
                addTask={this.addTask}
                updateTask={this.updateTask}
                deleteTask={this.deleteTask}
              />
            ))}
            {loading && <div>Loading...</div>}
          </div>
        </div>
      </div>
    );
  }
}

// métodos que vão no servidor graphql
const GetAllTasks = gql`
  query getAllTasks {
    allTasks {
      id
      status
      title
    }
  }
`

const CreateTask = gql`
  mutation createTask ($status: String, $title: String!) {
    createTask(status: $status, title: $title) {
      id
      status
      title
    }
  }
`

const UpdateTask = gql`
  mutation updateTask ($id: ID!, $status: String) {
    updateTask(id: $id, status: $status) {
      id
      status
      title
    }
  }
`

const DeleteTask = gql`
  mutation deleteTask ($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`
// high order component
export default compose(
  graphql(GetAllTasks, { name: 'getAllTasks'}), 
  graphql(CreateTask,  { name: 'createTask'}), 
  graphql(UpdateTask,  { name: 'updateTask'}),
  graphql(DeleteTask,  { name: 'deleteTask'}))(App)
