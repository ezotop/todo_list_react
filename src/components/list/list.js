import React from 'react';
import ListItem from '../list-item';

const List = (props) => {
    const {tasks, onToggleImportant, onDoneTask, onDeleteTask, dragStartHandler, dragEndHandler, dragOverHandler, dropHandler} = props;
    // const sortCards = (a, b) => {
    //     if (a.order > b.order) {
    //         return 1
    //     } else {
    //         return -1
    //     }
    // };

    const elements  = tasks.map((task) => {
        const {id, ...tasksElems} = task;

        return (
            <li 
                key={id}
                draggable={true}
                onDragStart={(e) => dragStartHandler(e, task)}
                onDragLeave={(e) => dragEndHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDrag={(e) => dropHandler(e, task)}>
                <ListItem
                    {...tasksElems}
                    onToggleImportant={ () => onToggleImportant(id) }
                    onDoneTask={ () => onDoneTask(id) }
                    onDeleteTask={ () => onDeleteTask(id) }/>
            </li>
        )
    });
        
    
    return (
        <ul className="todo_list">
            {elements}
        </ul>
    );
    
};
export default List;

// const elements  = tasks.map((task) => {
//     const {id, ...tasksElems} = task;

//     return (
//         <li key={id}>
//             <ListItem
//                 {...tasksElems}
//                 onToggleImportant={ () => onToggleImportant(id) }
//                 onDoneTask={ () => onDoneTask(id) }
//                 onDeleteTask={ () => onDeleteTask(id) }/>
//         </li>
//     )
// });