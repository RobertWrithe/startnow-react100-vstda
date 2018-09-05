import React from 'react';

export default props => (
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
                                value={props.input}
                                onChange={props.handle} />
                        </div>
                        <div className='form-group'>
                            <label>How much of a priority is this?</label>
                            <select
                                name='toDoPriority'
                                id='toDoPriority'
                                className='create-todo-priority form-control'
                                value={props.priority}
                                onChange={props.handle}>
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
                        onChange={props.handle}
                        onClick={props.add}>Add</button>
                </div>
            </div>
        );