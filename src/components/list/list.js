import React from 'react';
import ListItem from '../list-item';

const List = (props) => {
    const {tasks, onToggleImportant, onDoneTask, onDeleteTask, dragStartHandler, dragEndHandler, dragOverHandler, dropHandler} = props;

    const elements  = tasks.map((task) => {
        const {id, ...tasksElems} = task;

        return (
            <li 
                key={id}
                onDragStart={ (e) => dragStartHandler(e, task) } //Когда начали тянуть карточку
                onDragLeave={ (e) => dragEndHandler(e) } //Вышли за пределы другой карточки
                onDragEnd={ (e) => dragEndHandler(e) } //Отпустили перемещение
                onDragOver={ (e) => dragOverHandler(e) } //Находимся над другой карточкой
                onDrop={ (e) => dropHandler(e, task) } //Отпустили карточку
                draggable={true}
                >
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