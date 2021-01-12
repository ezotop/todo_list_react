import React, {useState} from 'react';

const FormAdd = ({onAddTask}) => {

    const [text, setText] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if (text !== '') {
            onAddTask(text);
            setText('');
        }
    };

    const onChangeValue = (e) => {
        setText(e.target.value)
    };

    return (
        <form
        onSubmit={onSubmit}>
            <input
                onChange={onChangeValue}
                type="text"
                name="todo_input"
                placeholder="What do you want to do?"
                value={text}
                />
            <button
                className="active_btn"
                type="submit">Add task</button>
        </form>
    );
};

export default FormAdd;