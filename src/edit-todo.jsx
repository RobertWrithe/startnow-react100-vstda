import React from 'react';

export default props => (
            <div>
                <form className='form'>
                    <div className='form-group'>
                        <label>Description</label>
                        <textarea
                            name='editToDoInput'
                            id='editToDoInput'
                            className='update-todo-text form-control'
                            rows='5'
                            value={props.editInput}
                            onChange={props.handle} />
                    </div>
                    <div className='form-group'>
                        <label>Priority</label>
                        <select
                            name='editToDoPriority'
                            id='editToDoPriority'
                            className='update-todo-priority form-control'
                            value={props.editPriority}
                            onChange={props.handle}>
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
                    onClick={props.edit}>Save</button>
            </div>
        );