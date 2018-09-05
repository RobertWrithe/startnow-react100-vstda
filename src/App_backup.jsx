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
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  addToDo(event) {
    event.preventDefault();
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

  completeToDo(item) {
    event.preventDefault();
    item.completed ? item.completed = false : item.completed = true;
    this.setState({ toDos: this.state.toDos });
  }

  editToDo(item) {
    event.preventDefault();
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
    event.preventDefault();
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
            <div className='panel panel-default'>
              <div className='panel-heading'>Add New ToDo</div>
              <div className='panel-body'>
                <form className='form'>
                  <div className='form-group'>
                    <label>I want to..</label>
                    <textarea
                      name='toDoInput'
                      id='toDoInput'
                      className='create-todo-text form-control'
                      rows='5'
                      value={this.state.toDoInput}
                      onChange={this.handleChange} />
                  </div>
                  <div className='form-group'>
                    <label>How much of a priority is this?</label>
                    <select
                      name='toDoPriority'
                      id='toDoPriority'
                      className='create-todo-priority form-control'
                      value={this.state.toDoPriority}
                      onChange={this.handleChange}>
                      <option value='' hidden>Select a Priority</option>
                      <option value='3'>High</option>
                      <option value='2'>Medium</option>
                      <option value='1'>Low</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className='panel-footer'>
                <button
                  type='submit'
                  className='create-todo btn btn-success btn-lg btn-block'
                  name='addToDo'
                  onClick={this.addToDo}>Add</button>
              </div>
            </div>
          </div>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>View ToDos</div>
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
                      <div>
                        <form className='form'>
                          <div className='form-group'>
                            <label>Description</label>
                            <textarea
                              name='editToDoInput'
                              id='editToDoInput'
                              className='update-todo-text form-control'
                              rows='5'
                              value={this.state.editToDoInput}
                              onChange={this.handleChange} />
                          </div>
                          <div className='form-group'>
                            <label>Priority</label>
                            <select
                              name='editToDoPriority'
                              id='editToDoPriority'
                              className='update-todo-priority form-control'
                              value={this.state.editToDoPriority}
                              onChange={this.handleChange}>
                              <option value='3'>High</option>
                              <option value='2'>Medium</option>
                              <option value='1'>Low</option>
                            </select>
                          </div>
                        </form>
                        <button
                          type='submit'
                          className='update-todo btn btn-success btn-lg'
                          name='updateToDo'
                          onClick={() => this.editToDo(todo)}>Save</button>
                      </div>
                      :
                      <div>
                        <input
                          type='checkbox'
                          className='form-check-input'
                          value={this.state.toDoPriority}
                          onChange={this.handleChange}
                          onClick={() => this.completeToDo(todo)}
                        />
                        <label style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                          {todo.description.length > 47 ? todo.description.slice(0, 47) + '...' : todo.description}
                        </label>
                        <a
                          type='button'
                          className='delete-todo text-danger'
                          onClick={() => this.deleteToDo(todo.key)}
                        ><i className='fas fa-trash-alt pull-right'></i></a>
                        <a
                          type='button'
                          className='edit-todo text-info'
                          onClick={() => this.editToDo(todo)}
                        ><i className='fas fa-edit pull-right'></i></a>
                      </div>
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