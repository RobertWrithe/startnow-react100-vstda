import React from 'react';

export default props => (
            <div>
                <input
                    type='checkbox'
                    className='form-check-input'
                    value={props.priority}
                    onClick={props.complete}
                />
                <label style={{ textDecoration: props.completed ? 'line-through' : 'none' }}>
                    {props.description.length > 47 ? props.description.slice(0, 47) + '...' : props.description}
                </label>
                <a
                    type='button'
                    className='delete-todo text-danger'
                    onClick={props.delete}
                    ><i className='fas fa-trash-alt pull-right'></i></a>
                <a
                    type='button'
                    className='edit-todo text-info'
                    onClick={props.edit}
                ><i className='fas fa-edit pull-right' style={{ marginRight: '10px' }}></i></a>
            </div>
        );