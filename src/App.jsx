import React, { Component } from 'react';
import EnterToDo from './enter-todo';
import EditToDo from './edit-todo';
import DisplayToDo from './display-todo';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editToDoInput: '',
      editToDoPriority: '',
      toDoInput: '',
      toDoPriority: '',
      toDos: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.addToDo = this.addToDo.bind(this);
    this.sortByPriority = this.sortByPriority.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  addToDo() {
    var newToDo = {
      description: this.state.toDoInput,
      priority: this.state.toDoPriority === '' ? '1' : this.state.toDoPriority,
      key: Date.now(),
      editing: false,
      completed: false
    };
    if (this.state.toDoInput !== '') this.state.toDos.push(newToDo);
    this.setState({
      toDos: this.state.toDos,
      toDoInput: '',
      toDoPriority: ''
    });
  }

  sortByPriority() {
    this.setState({ toDos: this.state.toDos.sort(function (a, b) { return b.priority - a.priority }) });
  }

  completeToDo(item) {
    item.completed ? item.completed = false : item.completed = true;
    this.setState({ toDos: this.state.toDos });
  }

  editToDo(item) {
    item.editing ? item.editing = false : item.editing = true;
    if (this.state.editToDoInput === '') {
      this.setState({
        toDos: this.state.toDos,
        editToDoInput: item.description,
        editToDoPriority: item.priority
      })
    } else {
      item.description = this.state.editToDoInput;
      item.priority = this.state.editToDoPriority;
      this.setState({
        toDos: this.state.toDos,
        editToDoInput: '',
        editToDoPriority: ''
      })
    }
  }

  deleteToDo(key) {
    this.setState({ toDos: this.state.toDos.filter(item => item.key !== key) });
  }

  render() {
    return (
      <div className='container'>
        <h1 style={{ color: 'white' }}>Very Simple ToDo App</h1>
        <h4 className='lead' style={{ color: 'white' }}>Track all of the things</h4>
        <hr />
        <div className='row'>
          <div className='col-sm-4'>
            <EnterToDo
              add={this.addToDo}
              handle={this.handleChange}
              input={this.state.toDoInput}
              priority={this.state.toDoPriority}
            />
          </div>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading clearfix'>
                View ToDos
                {this.state.toDos.length > 1 &&
                  <button
                    type='button'
                    className='sort-todos btn btn-info btn-xs pull-right'
                    name='sortToDos'
                    onClick={this.sortByPriority}>
                    Sort By Priority
                </button>
                }
              </div>
              <ul className='list-group'>
                {this.state.toDos.length === 0 &&
                  <li className='list-group-item list-group-item-info'>
                    <strong>Welcome to Very Simple ToDo App!</strong>
                    <p>Get started now by adding a new todo on the left.</p>
                  </li>
                }
                {this.state.toDos.map((todo) =>
                  <li key={todo.key}
                    className={todo.priority === '3' ? 'list-group-item list-group-item-danger' : todo.priority === '2' ? 'list-group-item list-group-item-warning' : 'list-group-item list-group-item-success'}
                    value={todo.priority}>
                    {todo.editing ?
                      <EditToDo
                        edit={() => this.editToDo(todo)}
                        editInput={this.state.editToDoInput}
                        editPriority={this.state.editToDoPriority}
                        handle={this.handleChange}
                      />
                      :
                      <DisplayToDo
                        complete={() => this.completeToDo(todo)}
                        completed={todo.completed}
                        delete={() => this.deleteToDo(todo.key)}
                        description={todo.description}
                        edit={() => this.editToDo(todo)}
                        handle={this.handleChange}
                        priority={this.state.toDoPriority}
                      />
                    }
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default App;