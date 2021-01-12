import React from 'react';

const ListItem = (props) => {

    const {label, important, done, onToggleImportant, onDoneTask, onDeleteTask} = props;

    let clazz = 'todo_item';

    if (important) {
        clazz += ' important';
    }
    if (done) {
        clazz += ' done';
    }

    return (
        <div className={clazz}>
            <span className="task_label">{label}</span>
            <div className="buttons">
                <button
                    className='action_btn'
                    onClick={onToggleImportant}>
                        <i className="fas fa-star"></i>
                </button>
                <button
                    className="action_btn"
                    onClick={onDoneTask}>
                    <i className="fas fa-check-square"></i>
                </button>
                <button
                    className="action_btn"
                    onClick={onDeleteTask}>
                    <i className="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
    );
};

export default ListItem;